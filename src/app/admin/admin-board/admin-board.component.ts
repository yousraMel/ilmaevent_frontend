
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrl: '../../../sass/main.scss'
})
export class AdminBoardComponent implements OnInit {

  activeComponent: string = 'adminRequest'; // Set the default active component
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string | undefined;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      // this.roles = user.roles;
      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.username = user.username;
    }
  }

  toggleComponent(componentName: string) {
    this.activeComponent = this.activeComponent === componentName ? '' : componentName;
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
