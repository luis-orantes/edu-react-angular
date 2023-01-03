
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RegisterForm } from 'src/app/auth/shared/register-form.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  register(formData: RegisterForm): Observable<any> {
    return this.httpClient.post('api/v1/users/register', formData);
  }




}
