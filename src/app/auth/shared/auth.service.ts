
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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




}
