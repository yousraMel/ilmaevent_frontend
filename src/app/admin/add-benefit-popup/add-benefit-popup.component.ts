import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-benefit-popup',
  templateUrl: './add-benefit-popup.component.html',
  styleUrls: ['./add-benefit-popup.component.scss']
})
export class AddBenefitPopupComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  benefitForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.benefitForm = this.fb.group({
      code: [''],
      label: [''],
      description: [''],
      rank: [''],
      active: [false],
    });
  }

  closeAddBenefitPopup() {
    this.close.emit();
  }

  onSubmit() {
    console.log('Ajouter')
    this.submit.emit(this.benefitForm.value);
  }
}
