import { Component, OnInit } from '@angular/core';
import { AllService } from '../../../services/all.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-admin-benefit',
  templateUrl: './admin-benefit.component.html',
  styleUrl: '../../../sass/main.scss'
})
export class AdminBenefitComponent implements OnInit {
  benefits: any[] = [];
  isAddBenefitPopupOpen: boolean = false;
  benefit: any;
  benefitId: any;
  index: any;
  isAlertCalled = false;

  constructor(
    private allService: AllService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.reloadBenefits();
  }

  openAddBenefitPopup() {
    this.isAddBenefitPopupOpen = true;
  }

  closeAddBenefitPopup() {
    setTimeout(() => {
      this.reloadBenefits();
      this.isAddBenefitPopupOpen = false;
    }, 1000);
  }

  reloadBenefits() {
    this.allService.getAllBenefits().subscribe((data: any[]) => {
      this.benefits = data;
    });
  }


  onBenefitFormSubmit(benefit: any) {
    this.benefit = benefit;
    this.allService.addBenefit(this.benefit).subscribe(
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
    this.allService.deleteBenefit(this.benefitId).subscribe(response => {
      this.benefits.splice(this.index, 1);
    });
    this.isAlertCalled = false;
  }

  onEditBenefit(benefitId: number) {
    this.benefitId = benefitId;
    this.isAddBenefitPopupOpen = true;
    this.sharedService.editMode = true;
  }
}
