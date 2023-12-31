import { Component, OnInit } from '@angular/core';
import { AllService } from '../../../services/all.service';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrl: './admin-request.component.scss'
})

export class AdminRequestComponent implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  sortBy: string = 'label'; // Default sort column
  sortOrder: string = 'asc'; // Default sort order
  filterValue: string = '';


  constructor(
    private allservice: AllService
  ) { }


  ngOnInit(): void {
    this.allservice.getAllRequests().subscribe((data: any[]) => {
      this.requests = data;
    });
    this.filteredRequests = this.requests.slice(); // Initialize filtered requests
  }

   // Sorting function
   sort(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === this.sortBy) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = selectedValue;
      this.sortOrder = 'asc';
    }

    this.filteredRequests = this.requests.slice().sort((a, b) => {
      const aValue = a[this.sortBy];
      const bValue = b[this.sortBy];
      return this.sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  }

  
    // Filtering function
  filter(value: string) {
    this.filteredRequests = this.requests.filter(request => {
      // Implement your filtering logic based on the columns
      return request.label.toLowerCase().includes(value.toLowerCase()) ||
             request.description.toLowerCase().includes(value.toLowerCase());
             // Add more conditions for other columns
             // ...
      });

  }



}
