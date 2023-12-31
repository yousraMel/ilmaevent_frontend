
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../../services/all.service';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-add-benefit',
  templateUrl: './add-benefit.component.html',
  styleUrls: ['./add-benefit.component.scss']
})
export class AddBenefitComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  @Input() benefitId: any;
  benefitForm!: FormGroup;
  benefit: any;
  editMode: any;


  constructor(
    private allService: AllService,
    private sharedService: SharedService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log("benefitid" + this.benefit)
    this.editMode = this.sharedService.editMode;

    if (this.benefitId && this.editMode) {
      this.allService.getBenefit(this.benefitId).subscribe((resp: any) => {
        this.benefit = resp;
        console.log("THIS BENEFIT" + this.benefit)
        this.initForm(this.benefit);
      });
    } else {
      this.initForm(null); // Pass null to initialize an empty form
    }
  }

  initForm(benefit: any) {
    const benefitCode = benefit?.code || '';
    const benefitLabel = benefit?.label || '';
    const benefitDescription = benefit?.description || '';
    const benefitRank = benefit?.rank || '';
    const benefitActive = benefit?.active || false;

    this.benefitForm = this.fb.group({
      'code': new FormControl(benefitCode, [Validators.required]),
      'label': new FormControl(benefitLabel, [Validators.required]),
      'description': new FormControl(benefitDescription),
      'rank': new FormControl(benefitRank, [Validators.required]),
      'active': new FormControl(benefitActive),
    });
  }

  closeAddBenefitPopup() {
    this.close.emit();
  }

  onSubmit() {
    if (this.editMode) {
      console.log('Modifier')
      this.benefit = this.benefitForm.value
      this.benefit.id = this.benefitId;
      this.allService.updateBenefit(this.benefit).subscribe(
        data => {
          console.log('Response:', data);
          this.benefit = data;
          this.benefitId = this.benefit.id;
        },
        error => {
          console.error('Error:', error);
        }
      );
      this.closeAddBenefitPopup();
    } else {
      console.log('Ajouter')
      this.submit.emit(this.benefitForm.value);
    }

  }
}
