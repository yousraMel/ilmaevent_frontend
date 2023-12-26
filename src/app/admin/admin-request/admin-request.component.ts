import { Component, OnInit } from '@angular/core';
import { AllService } from '../../../services/all.service';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrl: './admin-request.component.scss'
})

export class AdminRequestComponent implements OnInit {
  requests: any[] = [];


  constructor(
    private allservice: AllService
  ) { }


  ngOnInit(): void {
    this.allservice.getAllRequests().subscribe((data: any[]) => {
      this.requests = data;
    });
  }



}
