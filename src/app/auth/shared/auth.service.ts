
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from "moment";

import { RegisterForm } from 'src/app/auth/shared/register-form.model';
import { extractApiErr } from 'src/app/shared/helpers/fn';

const jwt = new JwtHelperService();

class TokenData {
  exp: number = 0;
  user: string = '';
  userId: string = ''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenData: TokenData;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.tokenData = new TokenData();
  }

  register(formData: RegisterForm): Observable<any> {
    return this.httpClient
      .post('api/v1/users/register', formData)
      .pipe(catchError((resErr: HttpErrorResponse) => 
        throwError(extractApiErr(resErr))));
  }

  login(formData: any) {
    return this.httpClient
      .post('api/v1/users/login', formData)
      .pipe(
        // to diference to the course, we receive the token inside an object
        map((tokenObj: {token: string}) => {
          let token = tokenObj.token;
          this.saveToken(token);
          return token;
        }),
        catchError((resErr: HttpErrorResponse) =>
          throwError(extractApiErr(resErr))));
  }

  logout() {
    localStorage.removeItem('bwm_auth_token');
    this.tokenData = new TokenData();
  }

  saveToken(token: string): string {
    const tokenDecoded = jwt.decodeToken(token);
    this.tokenData =  tokenDecoded;
    localStorage.setItem('bwm_auth_token', token);
    return token;
  }

  checkAuthentication(): boolean {
    const token = localStorage.getItem('bwm_auth_token');
    if(!token) { return false; }

    const tokenDecoded = jwt.decodeToken(token);
    if(!tokenDecoded) { return false; }

    this.tokenData = tokenDecoded;
    return true;
  }

  get user() {
    // console.log('tokenData ' + JSON.stringify(this.tokenData));
    return this.tokenData.user;
  }

  get isAuthenticated() {
    return moment().isBefore(this.expiration);
  }

  get expiration() {
    return moment.unix(this.tokenData.exp);
  }




}
