
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuard {

    constructor(private router: Router) { }

    canActivate(
    ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

        if (this.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

    public isLoggedIn(): boolean {
        let status = false;
        // Check if localStorage is defined and not null
        if (typeof localStorage !== 'undefined' && localStorage.getItem('auth-token')) {
            status = true;
        } else {
            status = false;
        }

        return status;
    }
}
