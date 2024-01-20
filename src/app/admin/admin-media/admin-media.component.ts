import { Component } from '@angular/core';
import { AllService } from '../../services/all.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-admin-media',
  templateUrl: './admin-media.component.html',
  styleUrl: '../../../sass/main.scss'
})
export class AdminMediaComponent {
  media: any[] = [];
  mediaCount: number = 0;
  filteredMedia: any[] = [];
  isAddMediaPopupOpen: boolean = false;
  mediaEl: any;
  mediaId: any;
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
  errorMessage: string = '';

  constructor(
    private allService: AllService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.reloadMedia();
  }

  openAddMediaPopup() {
    this.isAddMediaPopupOpen = true;
  }

  closeAddMediaPopup() {
    setTimeout(() => {
      this.sharedService.editMode = false
      this.reloadMedia();
      this.isAddMediaPopupOpen = false;
    }, 700);
  }

  reloadMedia() {
    this.allService.getAllMedia().subscribe((data: any[]) => {
      this.media = data;
      this.filteredMedia = this.media.slice();
      this.mediaCount = this.filteredMedia.length;
    });
  }


  onMediaFormSubmit(media: any) {
    this.mediaEl = media;
    this.allService.addType(this.mediaEl).subscribe(
      data => {
        console.log('Response:', data);
        this.mediaEl = data;
        this.mediaId = this.mediaEl.id;
      },
      error => {
        console.error('Error:', error);
      }
    );
    this.closeAddMediaPopup();
  }

  // CALL POPUP TO DELETE AN ARTICLE 
  onCallDeleteMedia(mediaId: number, index: number) {
    this.isAlertCalled = true;
    this.mediaId = mediaId;
    this.index = index;
  }

  onCloseAlert() {
    setTimeout(() => {
      this.reloadMedia();
      this.isAlertCalled = false;
    }, 700);

  }

  onDeleteMedia() {
    this.allService.deleteMedia(this.mediaId).subscribe(response => {
      this.media.splice(this.index, 1);
      setTimeout(() => {
        this.reloadMedia();
        this.isAlertCalled = false;
      }, 700);
    },
      (error) => {
        console.error(error);
        this.errorMessage = error;
      });

  }

  onEditMedia(typeId: number) {
    this.mediaId = typeId;
    this.isAddMediaPopupOpen = true;
    this.sharedService.editMode = true;
  }

  filter(column: string, value: string) {
    this.filteredMedia = this.media.filter(mediaEl => {
      const columnValue = mediaEl[column];
      if (value === '') {
        return true; // No filtering if the value is empty
      }
      // Check the mediaEl of the column value
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
    this.mediaCount = this.filteredMedia.length;
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
    this.filteredMedia.sort((a, b) => {
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
