import { Injectable } from '@angular/core';
import { CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private url: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.url = state.url;
    return this.authService.isAuthenticated ?
      this.authTrueValidate() : this.authFalseValidate();
  }

  private authTrueValidate(): boolean {
    if(this.isAuthPage) {
      this.router.navigate(['/rentals']);
      return false;
    }
    return true;
  }

  private authFalseValidate(): boolean {
    if(this.isAuthPage)
      return true;
    this.router.navigate(['/login']);
    return false
  }

  private get isAuthPage(): boolean {
    return this.url.includes('login') || this.url.includes('register') ? true : false;
  }




}
