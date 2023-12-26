import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../../services/all.service';

@Component({
  selector: 'app-admin-benefit',
  templateUrl: './admin-benefit.component.html',
  styleUrls: ['./admin-benefit.component.scss']
})
export class AdminBenefitComponent implements OnInit {
  benefits: any[] = [];
  isAddBenefitPopupOpen: boolean = false;
  benefit: any;
  benefitId: any;
  index: any;
  isAlertCalled = false;

  constructor(
    private allservice: AllService,
  ) { }

  ngOnInit(): void {
    this.reloadBenefits();
  }

  openAddBenefitPopup() {
    this.isAddBenefitPopupOpen = true;
  }

  closeAddBenefitPopup() {
    this.isAddBenefitPopupOpen = false;
  }

  reloadBenefits() {
    this.allservice.getAllBenefits().subscribe((data: any[]) => {
      this.benefits = data;
    });
    
  }
  onBenefitFormSubmit(benefit: any) {
      this.benefit = benefit;
      console.log('New Benefit:', this.benefit);
      this.allservice.addBenefit(this.benefit).subscribe(
        data => {
          console.log('Response:', data);
          this.benefit = data;
          this.benefitId = this.benefit.id;
        },
        error => {
          console.error('Error:', error);
        }
      );
      setTimeout(() =>{ 
        this.reloadBenefits();
        this.isAddBenefitPopupOpen = false;
        }, 1000);
   
     
    // }
  }

  // CALL POPUP TO DELETE AN ARTICLE 
  onCallDeleteBenefit(benefitId: number, index: number) {
    this.isAlertCalled = true;
    this.benefitId = benefitId;
    this.index = index;
  }

  onCloseAlert() {
    this.isAlertCalled = false;
  }

  onDeleteBenefit() {
    this.allservice.deleteBenefit(this.benefitId).subscribe(response => {
      this.benefits.splice(this.index , 1);
    });
    this.isAlertCalled = false;
  }

  onEditBenefit(benefitId: number) {
    this.benefitId = benefitId;
    this.isAddBenefitPopupOpen = true;
  }
}
