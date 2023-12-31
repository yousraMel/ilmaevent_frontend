import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-benefit-popup',
  templateUrl: './add-benefit-popup.component.html',
  styleUrls: ['./add-benefit-popup.component.scss']
})
export class AddBenefitPopupComponent implements OnInit{
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  // @Input() benefitId;
  benefitForm!: FormGroup;
  benefit : any;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm(this.benefit);
  }

  initForm(benefit: any) {
    let benefitLabel = '';
    let benefitDescription = '';
    let benefitRank = 0;
    let benefitActive = true;

    this.benefitForm = this.fb.group({
      'label': new FormControl(benefitLabel, Validators.required),
      'description': new FormControl(benefitDescription, Validators.required),
      'rank': new FormControl(benefitRank, Validators.required),
      'active': new FormControl(benefitActive),
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
