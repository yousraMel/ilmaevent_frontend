import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, tap } from 'rxjs';
import { AllService } from '../../../services/all.service';
import { SharedService } from '../../../services/shared.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrl: '../../../../sass/main.scss'
})
export class AddMediaComponent {
  @Output() close = new EventEmitter<void>();
  @Input() mediaId: any;
  mediaForm!: FormGroup;
  mediaEl: any;
  editMode: any;
  imageSrc: any;
  fileLoaded: boolean = false;
  isFileExist = false;
  file!: File;
  images: any[] = [];
  files: File[] = [];
  errorFile: any;
  fileName!: string;
  base64Image: any;
  submitValid = false;
  selectedFileName: string = 'Choisir une image...';
  submitting = false;
  creationDate: Date = new Date();
  errorMessage: string = '';


  constructor(
    private allService: AllService,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.editMode = this.sharedService.editMode;

    if (this.mediaId && this.editMode) {
      
      this.allService.getMedia(this.mediaId).subscribe((resp: any) => {
        this.mediaEl = resp;
        this.selectedFileName = this.mediaEl.label ? this.mediaEl.label : 'Choisir une image...';
        this.initForm(this.mediaEl);
        if (this.mediaEl.label) {
          this.selectedFileName = this.mediaEl.label;
          this.isFileExist = true;
          this.fileLoaded = true
        }
      });
    } else {
      this.initForm(null); // Pass null to initialize an empty form
    }
  }

  initForm(mediaEl: any) {
    const mediaDescription = mediaEl?.description || '';
    const mediaRank = mediaEl?.rank || '';
    const mediaActive = mediaEl?.active || true;
    const mediaType = mediaEl?.type || '';


    this.mediaForm = this.fb.group({
      'type': new FormControl(mediaType, [Validators.required]),
      'description': new FormControl(mediaDescription, [Validators.maxLength(64)]),
      'rank': new FormControl(mediaRank),
      'active': new FormControl(mediaActive)
    });
  }

  closeAddMediaPopup() {
    this.close.emit();
  }

  onSubmit() {
    console.log('File Loaded:', this.fileLoaded);  // Add this line for debugging
    if (this.fileLoaded) {
      if (this.mediaForm.valid && !this.submitting) {
        this.mediaEl = this.mediaForm.value;
        this.upload().subscribe(
          () => {
            this.mediaEl.label = this.fileName;
            this.mediaEl.id = this.mediaId;
            const mediaObservable = this.editMode
              ? this.allService.updateMedia(this.mediaEl)
              : this.allService.addMedia(this.mediaEl);
            mediaObservable.subscribe(
              (data: any) => {
                console.log('Response:', data);
                this.mediaEl = data;
                this.mediaId = this.mediaEl.id;
                this.closeAddMediaPopup();
              },
              (error: any) => {
                console.error('Error:', error);
                this.errorMessage = error;

              }
            );
          }
        );
        this.mediaId = null;
        this.editMode = false;
      } else {
        this.sharedService.validateAllFormFields(this.mediaForm);
      }
    }
  }

  upload(): Observable<any> {
    console.log("isFileExist " + this.isFileExist);
    if (this.isFileExist) {
      // File already exists, no need to upload
      this.fileName = this.selectedFileName;
      this.submitValid = true;
      return of(null);  // Return an observable with null value
    } else {
      let body = new FormData();
      body.append("file", this.file);
      return this.allService.uploadimage(body).pipe(
        tap(data => {
          this.fileName = data;
          this.isFileExist = this.fileName === 'fileExistsAlready';
          this.submitValid = !this.isFileExist;
        }),
        catchError((error:any) => {
              console.error('Upload Error:', error);
          this.errorMessage = error;
          throw error; // Rethrow the error to propagate it
        })
      );
    }
  }

  // Check for changes in files inputs via a DOMString reprsenting the name of an event
  fileChange(event: any) {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFileName = fileInput.files[0].name;
    } else {
      this.selectedFileName = 'Choisir une image...';
    }
    this.fileLoaded = true;

    this.isFileExist = false;
    // Instantiate an object to read the file content
    const reader = new FileReader();
    // when the load event is fired and the file not empty
    if (event.target.files && event.target.files.length > 0) {
      // Fill file variable with the file content
      this.file = event.target.files[0];
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  displayFieldCss(field: string): any {
    return this.sharedService.displayFieldCss(field, this.mediaForm);
  }

  isFieldValid(field: string) {
    return this.sharedService.isFieldValid(field, this.mediaForm);
  }

  // Add a method to get the character count of the description
  get descriptionCharacterCount() {
    const description = this.mediaForm.get('description');
    return description ? description.value.length : 0;
  }

}