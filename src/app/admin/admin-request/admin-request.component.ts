import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { AllService } from '../../services/all.service';
import { ExcelExportService } from '../../services/excel-export.service';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrl: '../../../sass/main.scss'
})

export class AdminRequestComponent implements OnInit {
  public isBrowser: boolean = false;
  requests: any[] = [];
  requestId: any;
  request: any;
  requestsCount: number = 0;
  filteredRequests: any[] = [];
  sortBy: string = 'label'; // Default sort column
  sortOrder: string = 'asc'; // Default sort order
  filterValue: string = '';
  labelFilter: string = '';
  descriptionFilter: string = '';
  codeFilter: string = '';
  typeFilter: string = '';
  isFreeFilter: string = '';
  participantsNbFilter = '';
  institutionFilter = '';
  committeeLeaderFilter = '';
  isFreeRequests: any[] = [];
  notFreeRequests: any[] = [];
  // Sorting properties
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 10; // Adjust this value based on your preference
  totalItems: number = 0;
  totalPages: number = 0; // Add this line
  // selectedStatus: string = 'Nouveau';

  // Map to store the selected status for each request
  selectedStatusMap: { [key: number]: string } = {};

  constructor(
    private allservice: AllService,
    private excelExportService: ExcelExportService,
    @Inject(PLATFORM_ID) platformId: Object, private renderer2: Renderer2,
    private cdr: ChangeDetectorRef // Add this line
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Chart data for requests by free/not free
  requestByIsFreeData: ChartData<'doughnut'> = {
    labels: ['Gratuit', 'Payant'],
    datasets: [
      {
        label: 'Demandes', data: [0, 0],
        backgroundColor: ['#6A7CC1', '#db2c2e'], // Customize the colors here
      },
    ],
  };

  requestByIsFreeChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Demandes par Gratuité',
      },
    },
  };

  // Chart data for requests by institution
  requestByInstitutionData: ChartData<'doughnut'> = {
    labels: [], // Dynamic labels for types will be populated
    datasets: [
      {
        label: '',
        data: [0], // Dynamic data for each type will be populated
        backgroundColor: ['#245371', '#3f8fc2', '#193a4f'],// Choose a color for the bars
      },
    ],
  };

  requestByInstitutionChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Distribution des Demandes par Institution',
      },
    },
  };

  // Chart data for requests by type
  requestByTypeData: ChartData<'doughnut'> = {
    labels: [], // Dynamic labels for types will be populated
    datasets: [
      {
        label: 'Nombre de Demandes',
        data: [0], // Dynamic data for each type will be populated
        backgroundColor: ['#808080', '#245371', '#3f8fc2', '#4b7ca7', '#193a4f'],// Choose a color for the bars
      },
    ],
  };

  requestByTypeChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Distribution des Demandes par Type',
      },
    },
  };
  // Chart data for participants by type
  participantsByTypeData: ChartData<'bar'> = {
    labels: [], // Dynamic labels for types will be populated
    datasets: [
      {
        label: 'Nombre de Participants',
        data: [0], // Dynamic data for each type will be populated
        backgroundColor: ['#808080', '#245371', '#3f8fc2', '#4b7ca7', '#193a4f'],// Choose a color for the bars
      },
    ],
  };

  participantsByTypeChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Nombre de participants par Type',
      },
    },
  };


  ngOnInit(): void {
    this.allservice.getAllRequests().subscribe((data: any[]) => {
      this.requests = data;
      this.filteredRequests = this.requests.slice();
      this.requestsCount = this.filteredRequests.length;
      this.requests = data.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
      this.filteredRequests = this.requests.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()).slice();

      this.totalItems = this.filteredRequests.length;
      // Initialize filteredRequests

      // Calculate the number of requests for each category
      this.isFreeRequests = this.requests.filter(request => request.isFree);
      this.notFreeRequests = this.requests.filter(request => !request.isFree);

      // Initialize requestByIsFreeData here
      this.requestByIsFreeData = {
        labels: ['Gratuit', 'Payant'],
        datasets: [
          {
            label: 'Demandes', data: [this.isFreeRequests.length, this.notFreeRequests.length],
            backgroundColor: ['#6A7CC1', '#db2c2e'], // Customize the colors here
          },
        ],
      };
      // Get unique institution from the list
      const uniqueInstitution = Array.from(new Set(this.requests.map(request => request.institution?.trim() || 'Non Renseigné')));
      // Initialize requestByInstitutionData here
      this.requestByInstitutionData = {
        labels: uniqueInstitution,
        datasets: [
          {
            label: 'Nombre de Demandes',
            data: uniqueInstitution.map(institution =>
              this.requests.filter(request => (request.institution?.trim() || 'Non Renseigné') === institution).length
            ),
            backgroundColor: ['#6A7CC1', '#861718', '#245371', '#97a3d4', '#db2c2e', '#3f8fc2', '#3d4f94', '#5e1011', '#193a4f'],
          },
        ],
      };

      // Get unique types from the list
      const uniqueTypes = Array.from(new Set(this.requests.map(request => request.type?.label?.trim() || 'Non Renseigné')));
      // Initialize requestByTypeData here
      this.requestByTypeData = {
        labels: uniqueTypes,
        datasets: [
          {
            label: 'Nombre de Demandes',
            data: uniqueTypes.map(type =>
              this.requests.filter(request => (request.type?.label?.trim() || 'Non Renseigné') === type).length
            ),
            backgroundColor: ['#808080', '#245371', '#3f8fc2', '#4b7ca7', '#193a4f'],
          },
        ],
      };
      // Initialize participantsByTypeData here
      this.participantsByTypeData = {
        labels: uniqueTypes,
        datasets: [
          {
            label: 'Nombre de Participants',
            data: uniqueTypes.map(type =>
              this.requests
                .filter(request => (request.type?.label?.trim() || 'Non Renseigné') === type)
                .reduce((totalParticipants, request) => totalParticipants + (request.participantsNb || 0), 0)
            ),
            backgroundColor: ['#808080', '#245371', '#3f8fc2', '#4b7ca7', '#193a4f'],
          },
        ],
      };
      uniqueTypes.forEach(type => {
        console.log(this.requests
          .filter(request => (request.type?.label?.trim() || 'Non Renseigné') === type)
          .reduce((totalParticipants, request) => totalParticipants + (request.participantsNb || 0), 0));
      });
      // ... existing logic ...
      this.applyPagination();
      this.cdr.detectChanges();

      // Initialize the selectedStatusMap with the initial status of each request
      this.filteredRequests.forEach(request => {
        this.selectedStatusMap[request.id] = request.status;
      });

    });

  }

  filter(column: string, value: string) {
    this.filteredRequests = this.requests.filter(request => {
      const columnValue = column === 'type' ? request.type?.label : request[column];
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
      // Update totalItems based on the filteredRequests
      this.totalItems = this.filteredRequests.length;

      this.requestsCount = this.filteredRequests.length;
      // Apply pagination
      this.applyPagination();
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
    this.filteredRequests.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
      // Apply pagination
      this.applyPagination();
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

  exportToExcel() {
    // Flatten the data structure to include benefits as separate columns
    const flattenedData = this.filteredRequests.map(request => {
      // Create a copy of the original request object
      const flattenedRequest = { ...request };

      // Add boolean columns for each benefit
      if (request.benefits && request.benefits.length > 0) {
        request.benefits.forEach((benefit: any) => {
          flattenedRequest[benefit.label] = true; // Add a boolean column for each benefit
        });
      }

      return flattenedRequest;
    });

    // Prepare the data for export
    const exportData = flattenedData.map(request => {
      // Create a new object with only the necessary properties for export
      return {
        'Date Création': request.creationDate,
        'Date Modification': request.lastModifDate,
        'Addresse': request.address,
        'Téléphone': request.phone,
        'Email': request.email,
        'Site Web': request.webSite,
        'Réseaux Sociaux': request.socialNetworks ? request.socialNetworks.join(', ') : '',
        // Include additional properties as needed
        'Code': request.code,
        'Libellé': request.label,
        'Description': request.description,
        'Type Evénement': request.type?.label,
        'Gratuit': request.isFree ? 'Oui' : 'Non',
        'Participants': request.participantsNb,
        'Institution': request.institution,
        'Responsable': request.committeeLeader,
        // Include boolean columns for each benefit
        ...request.benefits.reduce((acc: any, benefit: any) => {
          acc[benefit.label] = true;
          return acc;
        }, {})
      };
    });

    // Export the data
    this.excelExportService.exportToExcel(exportData, 'exported_requests', 'requests');
  }

  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    console.log('startIndex: ' + startIndex);
    console.log('endIndex: ' + endIndex);
    console.log('this.filteredRequests before slicing: ', this.filteredRequests);
    this.filteredRequests = this.requests.slice(startIndex, endIndex);
    console.log('this.filteredRequests after slicing: ', this.filteredRequests);
    // Calculate total pages
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    console.log('Total Pages: ', this.totalPages);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyPagination();
    }
  }


  // Function to update the status of a specific request
  updateStatus(requestId: number): void {
    // Find the request with the given ID
    // const request = this.requests.find(req => req.id === requestId);
    this.requestId = requestId;
    this.allservice.getRequest(requestId).subscribe((data: any) => {
      this.request = data;
      this.request.status = this.selectedStatusMap[requestId];
      this.allservice.updateRequest(this.request).subscribe(
        data => {
          console.log(data)
        });
    });
    if (this.request) {
      // Update the status of the found request
      this.request.status = this.selectedStatusMap[requestId];
    }
  }

  getStatusLabelColor(status: string): string {
    switch (status) {
      case 'Nouveau':
        return '#FFF176';
      case 'En cours':
        return '#81C784';
      case 'Traité':
        return '#64B5F6';
      case 'Annulé':
        return '#B0BEC5';
      // Add more cases for other statuses
      default:
        return 'convenient-default-color';
    }
  }


  applyFilter(column: string) {
    if (this.filterValue === '' || this.filterValue === 'Tous') {
      // If filter value is empty, reset the filter
      this.filteredRequests = this.requests.slice();
    } else {
      // Apply the filter based on the selected status
      this.filteredRequests = this.requests.filter(request => request.status === this.filterValue);
    }

    // Update totalItems based on the filteredRequests
    this.totalItems = this.filteredRequests.length;

    this.requestsCount = this.filteredRequests.length;
    // Apply pagination
    // this.applyPagination();
  }

}
