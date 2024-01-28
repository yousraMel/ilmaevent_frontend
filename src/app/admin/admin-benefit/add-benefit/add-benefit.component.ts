
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../../services/all.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-add-benefit',
  templateUrl: './add-benefit.component.html',
  styleUrls: ['../../../../sass/main.scss']
})
export class AddBenefitComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() benefitId: any;
  benefitForm!: FormGroup;
  benefit: any;
  editMode: any;
  submitting = false;
  creationDate : Date = new Date();

  constructor(
    private allService: AllService,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.editMode = this.sharedService.editMode;
    this.initBenefitForm();
  }

  private initBenefitForm() {
    this.benefitForm = this.fb.group({
      label: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.maxLength(250)]),
      rank: new FormControl(''),
      active: new FormControl(true),
      icone: new FormControl('', [Validators.required]),
    });

    if (this.benefitId && this.editMode) {
      this.fetchBenefitData();
    }
  }

  private fetchBenefitData() {
    this.allService.getBenefit(this.benefitId).subscribe((resp: any) => {
      this.benefit = resp;
      this.creationDate = this.benefit.creationDate;
      this.populateFormWithBenefitData();
    });
  }

  private populateFormWithBenefitData() {
    this.benefitForm.patchValue({
      label: this.benefit.label,
      description: this.benefit.description,
      rank: this.benefit.rank,
      active: this.benefit.active,
      icone: this.benefit.icone,
    });
  }

  closeAddBenefitPopup() {
    this.close.emit();
  }

  onSubmit() {
    if (this.benefitForm.valid && !this.submitting) {
      this.submitting = true;
  
      if (this.editMode) {
        this.handleEditSubmission();
      } else {
        this.handleAddSubmission();
      }
    } else {
      this.sharedService.validateAllFormFields(this.benefitForm);
    }
  }
  
  private handleEditSubmission() {
  const updatedBenefit = { ...this.benefitForm.value, id: this.benefitId , creationDate : this.creationDate};
  
    this.allService.updateBenefit(updatedBenefit).subscribe(
      data => this.handleSubmissionSuccess(data),
      error => this.handleSubmissionError(error)
    );
  }
  
  private handleAddSubmission() {
    this.allService.addBenefit(this.benefitForm.value).subscribe(
      data => this.handleSubmissionSuccess(data),
      error => this.handleSubmissionError(error)
    );
  }
  
  private handleSubmissionSuccess(data: any) {
    console.log('Response:', data);
    this.benefit = data;
    this.benefitId = this.benefit.id;
    this.closeAddBenefitPopup();
    this.submitting = false;
  }
  
  private handleSubmissionError(error: any) {
    console.error('Error:', error);
    this.submitting = false;
  }

  displayFieldCss(field: string): any {
    return this.sharedService.displayFieldCss(field, this.benefitForm);
  }

  isFieldValid(field: string) {
    return this.sharedService.isFieldValid(field, this.benefitForm);
  }

  // Add a method to get the character count of the description
  get descriptionCharacterCount() {
    const description = this.benefitForm.get('description');
    return description ? description.value.length : 0;
  }
}