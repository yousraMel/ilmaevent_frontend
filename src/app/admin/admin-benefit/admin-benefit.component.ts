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
  filteredBenefits: any[] = [];
  isAddBenefitPopupOpen: boolean = false;
  benefit: any;
  benefitId: any;
  index: any;
  isAlertCalled = false;
  codeFilter: string = '';
  labelFilter: string = '';
  descriptionFilter: string = '';
  activeFilter: string = '';
  rankFilter = '';
      // Sorting properties
      sortColumn: string | null = null;
      sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private allService: AllService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.reloadBenefits();
    // this.filteredBenefits = this.benefits.slice();
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
      this.filteredBenefits = this.benefits.slice();
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

  filter(column: string, value: string) {
    this.filteredBenefits = this.benefits.filter(benefit => {
      const columnValue = benefit[column];
      if (value === '') {
        return true; // No filtering if the value is empty
      }
      // Check the type of the column value
      if (typeof columnValue === 'string') {
        // String comparison (case-insensitive)
        return columnValue.toLowerCase().includes(value.toLowerCase());
      } else if (typeof columnValue === 'number') {
        // Numeric comparison
        return columnValue === +value; // Convert value to number for strict equality
      } else if (typeof columnValue === 'boolean') {
        // Boolean comparison
        const booleanValue = value.toLowerCase() === 'oui';
        return columnValue === booleanValue;
      }

      // Default to no filtering for other types
      return true;
    });
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      // Toggle sort direction if it's the same column
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set new sort column and default direction
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Perform the actual sorting
    this.filteredBenefits.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }

      return 0; // Default to no sorting for other types
    });
  }

  getSortIcon(column: string) {
    // Return appropriate FontAwesome class based on sort direction and column
    return {
      'fa-sort': !this.sortColumn || this.sortColumn !== column,
      'fa-sort-asc': this.sortColumn === column && this.sortDirection === 'asc',
      'fa-sort-desc': this.sortColumn === column && this.sortDirection === 'desc',
    };
  }
}
