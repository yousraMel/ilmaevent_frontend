import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  user: any;
  constructor() { }

  signOut() {
    localStorage.clear();
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  // public getToken(): string {
  //   return localStorage.getItem(TOKEN_KEY)!;
  // }

  // In your service or component
getToken() {
  if (typeof localStorage !== 'undefined') {
    // It's safe to use localStorage here
    return localStorage.getItem(TOKEN_KEY);
  } else {
    // Handle the case where localStorage is not available
    return null;
  }
}
  public saveUser(user: any) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser() {
    if (this.user === null) {
      const userFromStorage = localStorage.getItem(USER_KEY);

      if (userFromStorage !== null) {
        this.user = JSON.parse(userFromStorage);
      }
    }

    return this.user;
  }
}