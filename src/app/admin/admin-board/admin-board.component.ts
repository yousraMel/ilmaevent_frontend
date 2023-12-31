
import { Router } from '@angular/router';
import { Component, Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss']
})
export class AdminBoardComponent {

  activeComponent: string = 'adminRequest'; // Set the default active component


  toggleComponent(componentName: string) {
    this.activeComponent = this.activeComponent === componentName ? '' : componentName;
  }
  
}
