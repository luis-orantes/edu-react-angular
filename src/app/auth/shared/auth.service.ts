
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { RegisterForm } from 'src/app/auth/shared/register-form.model';
import { extractApiErr } from 'src/app/shared/helpers/fn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
  ) { }

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

  saveToken(token: string): void {
    alert('saving token!');
  }




}
