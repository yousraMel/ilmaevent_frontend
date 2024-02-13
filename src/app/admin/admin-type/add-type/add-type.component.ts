import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../../services/all.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['../../../../sass/main.scss']
})
export class AddTypeComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() typeId: any;
  typeForm!: FormGroup;
  type: any;
  editMode: any;
  submitting = false;
  creationDate: Date = new Date();

  constructor(
    private allService: AllService,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.editMode = this.sharedService.editMode;
    this.initTypeForm();
  }

  private initTypeForm() {
    this.typeForm = this.fb.group({
      label: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(400)]),
      rank: new FormControl(''),
      active: new FormControl(true)
    });

    if (this.typeId && this.editMode) {
      this.fetchTypeData();
    }
  }

  private fetchTypeData() {
    this.allService.getType(this.typeId).subscribe((resp: any) => {
      this.type = resp;
      this.creationDate = this.type.creationDate;
      this.populateFormWithTypeData();
    });
  }

  private populateFormWithTypeData() {
    this.typeForm.patchValue({
      label: this.type.label,
      description: this.type.description,
      rank: this.type.rank,
      active: this.type.active
    });
  }

  closeAddTypePopup() {
    this.close.emit();
  }

  onSubmit() {
    if (this.typeForm.valid && !this.submitting) {
      this.submitting = true;

      if (this.editMode) {
        this.handleEditSubmission();
      } else {
        this.handleAddSubmission();
      }
    } else {
      this.sharedService.validateAllFormFields(this.typeForm);
    }
  }

  private handleEditSubmission() {
    const updatedType = { ...this.typeForm.value, id: this.typeId, creationDate: this.creationDate };

    this.allService.updateType(updatedType).subscribe(
      data => this.handleSubmissionSuccess(data),
      error => this.handleSubmissionError(error)
    );
  }

  private handleAddSubmission() {
    this.allService.addType(this.typeForm.value).subscribe(
      data => this.handleSubmissionSuccess(data),
      error => this.handleSubmissionError(error)
    );
  }

  private handleSubmissionSuccess(data: any) {
    console.log('Response:', data);
    this.type = data;
    this.typeId = this.type.id;
    this.closeAddTypePopup();
    this.submitting = false;
  }

  private handleSubmissionError(error: any) {
    console.error('Error:', error);
    this.submitting = false;
  }

  displayFieldCss(field: string): any {
    return this.sharedService.displayFieldCss(field, this.typeForm);
  }

  isFieldValid(field: string) {
    return this.sharedService.isFieldValid(field, this.typeForm);
  }

  // Add a method to get the character count of the description
  get descriptionCharacterCount() {
    const description = this.typeForm.get('description');
    return description ? description.value.length : 0;
  }
}
