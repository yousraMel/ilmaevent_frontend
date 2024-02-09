import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-help',
  templateUrl: './admin-help.component.html',
  styleUrl: '../../../sass/main.scss'
})
export class AdminHelpComponent {
  isNew = false;
  isUpdate = false;
  isDelete = false;
  constructor() { }

  ngOnInit() {
  }

  // EXPAND SECTION AREA BY CLICK ON TOOGLE 
  onSection(section: any) {
    switch (section) {
      case "new":
        this.isNew = !this.isNew;
        break;
      case "update":
        this.isUpdate = !this.isUpdate;
        break;
      case "delete":
        this.isDelete = !this.isDelete;
        break;
      default:
        break;
    }
  }

}