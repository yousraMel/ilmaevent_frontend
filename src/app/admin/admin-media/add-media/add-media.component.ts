import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../../services/all.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrl: '../../../../sass/main.scss'
})
export class AddMediaComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  @Input() mediaId: any;
  mediaForm!: FormGroup;
  mediaEl: any;
  editMode: any;
  imageSrc: any;
  fileLoaded: Boolean | undefined;


  constructor(
    private allService: AllService,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log("mediaId" + this.mediaEl)
    this.editMode = this.sharedService.editMode;

    if (this.mediaId && this.editMode) {
      this.allService.getMedia(this.mediaId).subscribe((resp: any) => {
        this.mediaEl = resp;
        console.log("THIS MEDIA" + this.mediaEl)
        this.initForm(this.mediaEl);
      });
    } else {
      this.initForm(null); // Pass null to initialize an empty form
    }
  }

  initForm(mediaEl: any) {
    const mediaCode = mediaEl?.code || '';
    const mediaLabel = mediaEl?.label || '';
    const mediaDescription = mediaEl?.description || '';
    const mediaRank = mediaEl?.rank || '';
    const mediaActive = mediaEl?.active || true;

    this.mediaForm = this.fb.group({
      'code': new FormControl(mediaCode, [Validators.required]),
      'label': new FormControl(mediaLabel, [Validators.required]),
      'description': new FormControl(mediaDescription),
      'rank': new FormControl(mediaRank, [Validators.required]),
      'active': new FormControl(mediaActive),
    });
  }

  closeAddMediaPopup() {
    this.close.emit();
  }

  onSubmit() {
    if (this.editMode) {
      console.log('Modifier')
      this.mediaEl = this.mediaForm.value
      this.mediaEl.id = this.mediaId;
      this.allService.updateMedia(this.mediaEl).subscribe(
        data => {
          console.log('Response:', data);
          this.mediaEl = data;
          this.mediaId = this.mediaEl.id;
        },
        error => {
          console.error('Error:', error);
        }
      );
      this.closeAddMediaPopup();
    } else {
      console.log('Ajouter')
      this.submit.emit(this.mediaForm.value);
    }

  }

  // Check for changes in files inputs via a DOMString reprsenting the name of an event
  fileChange(event: any) {
    this.fileLoaded = true;

    // this.isFileExist = false;
    // // Instantiate an object to read the file content
    // const reader = new FileReader();
    // // when the load event is fired and the file not empty
    // if (event.target.files && event.target.files.length > 0) {
    //   // Fill file variable with the file content
    //   this.file = event.target.files[0];
    //   reader.onload = e => this.imageSrc = reader.result;
    //   reader.readAsDataURL(this.file);
  }
}