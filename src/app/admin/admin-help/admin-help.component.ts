import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-help',
  templateUrl: './admin-help.component.html',
  styleUrl: '../../../sass/main.scss'
})
export class AdminHelpComponent {
  isArticle = false;
  isSection = false;
  isMedia = false;
  isEdit = false;
  isPassword = false;
  isLanguage = false;
  constructor() { }

  ngOnInit() {
  }

  // EXPAND SECTION AREA BY CLICK ON TOOGLE 
  onSection(section: any) {
    switch (section) {
      case "article":
        this.isArticle = !this.isArticle;
        break;
      case "section":
        this.isSection = !this.isSection;
        break;
      case "media":
        this.isMedia = !this.isMedia;
        break;
      case "edit":
        this.isEdit = !this.isEdit;
        break;
      case "password":
        this.isPassword = !this.isPassword;
        break;
      case "language":
        this.isLanguage = !this.isLanguage;
        break;

      default:
        break;
    }
  }

}