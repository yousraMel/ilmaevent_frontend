import { Component, OnInit } from '@angular/core';
import { AllService } from '../../services/all.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-admin-type',
  templateUrl: './admin-type.component.html',
  styleUrls: ['../../../sass/main.scss']
})
export class AdminTypeComponent implements OnInit {
  types: any[] = [];
  typesCount: number = 0;
  filteredTypes: any[] = [];
  isAddTypePopupOpen = false;
  type: any;
  typeId: any;
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
    this.reloadTypes();
  }

  openAddTypePopup() {
    this.isAddTypePopupOpen = true;
  }

  closeAddTypePopup() {
    setTimeout(() => {
      this.sharedService.editMode = false;
      this.reloadTypes();
      this.isAddTypePopupOpen = false;
    }, this.WAIT_TIME_BEFORE_RELOAD);
  }

  reloadTypes() {
    this.allService.getAllTypes().subscribe((data: any[]) => {
      this.types = data;
      this.filteredTypes = [...this.types];
      this.filteredTypes.sort((a: any, b: any) => a.rank - b.rank);
      this.typesCount = this.filteredTypes.length;
    });
  }

  onCallDeleteType(typeId: number, index: number) {
    this.isAlertCalled = true;
    this.typeId = typeId;
    this.index = index;
  }

  onCloseAlert() {
    setTimeout(() => {
      this.reloadTypes();
      this.isAlertCalled = false;
    }, this.WAIT_TIME_BEFORE_RELOAD);
  }

  onDeleteType() {
    this.allService.deleteType(this.typeId).subscribe(
      () => {
        this.types.splice(this.index, 1);
        this.onCloseAlert();
      },
      (error) => {
        console.error(error);
        this.errorMessage = error;
      }
    );
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
    this.typesCount = this.filteredTypes.length;
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredTypes.sort((a, b) => {
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
