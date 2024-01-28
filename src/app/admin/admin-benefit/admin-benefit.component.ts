import { Component, OnInit } from '@angular/core';
import { AllService } from '../../services/all.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-admin-benefit',
  templateUrl: './admin-benefit.component.html',
  styleUrls: ['../../../sass/main.scss']
})
export class AdminBenefitComponent implements OnInit {
  benefits: any[] = [];
  benefitsCount: number = 0;
  filteredBenefits: any[] = [];
  isAddBenefitPopupOpen = false;
  benefit: any;
  benefitId: any;
  index: any;
  isAlertCalled = false;
  labelFilter = '';
  descriptionFilter = '';
  activeFilter = '';
  rankFilter = '';
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  errorMessage = '';

  // Constants
  WAIT_TIME_BEFORE_RELOAD = 700;

  constructor(
    private allService: AllService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.reloadBenefits();
  }

  openAddBenefitPopup() {
    this.isAddBenefitPopupOpen = true;
  }

  closeAddBenefitPopup() {
    setTimeout(() => {
      this.sharedService.editMode = false;
      this.reloadBenefits();
      this.isAddBenefitPopupOpen = false;
    }, this.WAIT_TIME_BEFORE_RELOAD);
  }

  reloadBenefits() {
    this.allService.getAllBenefits().subscribe((data: any[]) => {
      this.benefits = data;
      this.filteredBenefits = [...this.benefits];
      this.filteredBenefits.sort((a: any, b: any) => a.rank - b.rank);
      this.benefitsCount = this.filteredBenefits.length;
    });
  }

  onCallDeleteBenefit(benefitId: number, index: number) {
    this.isAlertCalled = true;
    this.benefitId = benefitId;
    this.index = index;
  }

  onCloseAlert() {
    setTimeout(() => {
      this.reloadBenefits();
      this.isAlertCalled = false;
    }, this.WAIT_TIME_BEFORE_RELOAD);
  }

  onDeleteBenefit() {
    this.allService.deleteBenefit(this.benefitId).subscribe(
      () => {
        this.benefits.splice(this.index, 1);
        this.onCloseAlert();
      },
      (error) => {
        console.error(error);
        this.errorMessage = error;
      }
    );
  }

  onEditBenefit(benefitId: number) {
    this.benefitId = benefitId;
    this.isAddBenefitPopupOpen = true;
    this.sharedService.editMode = true;
  }

  filter(column: string, value: string) {
    this.filteredBenefits = this.benefits.filter(benefit => {
      const columnValue = benefit[column];
      if (value === '') {
        return true;
      }
      if (typeof columnValue === 'string') {
        return columnValue.toLowerCase().includes(value.toLowerCase());
      } else if (typeof columnValue === 'number') {
        return columnValue === +value;
      } else if (typeof columnValue === 'boolean') {
        const booleanValue = value.toLowerCase() === 'oui';
        return columnValue === booleanValue;
      }
      return true;
    });
    this.benefitsCount = this.filteredBenefits.length;
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredBenefits.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      return 0;
    });
  }

  getSortIcon(column: string) {
    return {
      'fa-sort': !this.sortColumn || this.sortColumn !== column,
      'fa-sort-asc': this.sortColumn === column && this.sortDirection === 'asc',
      'fa-sort-desc': this.sortColumn === column && this.sortDirection === 'desc',
    };
  }
}