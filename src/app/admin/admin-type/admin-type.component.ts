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
  isAddTypePopupOpen: boolean = false;
  type: any;
  typeId: any;
  index: any;
  isAlertCalled = false;

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

}
