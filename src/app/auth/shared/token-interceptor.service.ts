import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    // auth: `Bearer ${this.authService.getToken()}`,
    const token = this.authService.getToken();
    if(token) {
      req = req.clone({
        setHeaders: {
          auth: `Bearer ${token}`,
        }
      });
    }

    return next.handle(req);
  }




}
