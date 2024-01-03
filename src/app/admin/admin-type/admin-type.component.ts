import { Component, OnInit } from '@angular/core';
import { AllService } from '../../services/all.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-admin-type',
  templateUrl: './admin-type.component.html',
  styleUrl: '../../../sass/main.scss'
})
export class AdminTypeComponent implements OnInit {
  types: any[] = [];
  filteredTypes: any[] = [];
  isAddTypePopupOpen: boolean = false;
  type: any;
  typeId: any;
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
    this.reloadTypes();
  }

  openAddTypePopup() {
    this.isAddTypePopupOpen = true;
  }

  closeAddTypePopup() {
    setTimeout(() => {
      this.reloadTypes();
      this.isAddTypePopupOpen = false;
    }, 1000);
  }

  reloadTypes() {
    this.allService.getAllTypes().subscribe((data: any[]) => {
      this.types = data;
      this.filteredTypes = this.types.slice();
    });
  }


  onTypeFormSubmit(type: any) {
    this.type = type;
    this.allService.addType(this.type).subscribe(
      data => {
        console.log('Response:', data);
        this.type = data;
        this.typeId = this.type.id;
      },
      error => {
        console.error('Error:', error);
      }
    );
    this.closeAddTypePopup();
  }

  // CALL POPUP TO DELETE AN ARTICLE 
  onCallDeleteType(typeId: number, index: number) {
    this.isAlertCalled = true;
    this.typeId = typeId;
    this.index = index;
  }

  onCloseAlert() {
    this.isAlertCalled = false;
  }

  onDeleteType() {
    this.allService.deleteType(this.typeId).subscribe(response => {
      this.types.splice(this.index, 1);
    });
    this.isAlertCalled = false;
  }

  onEditType(typeId: number) {
    this.typeId = typeId;
    this.isAddTypePopupOpen = true;
    this.sharedService.editMode = true;
  }

  filter(column: string, value: string) {
    this.filteredTypes = this.types.filter(type => {
      const columnValue = type[column];
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
    this.filteredTypes.sort((a, b) => {
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
