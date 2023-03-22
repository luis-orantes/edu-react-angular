import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/shared/auth.service';
import { extractApiErr } from 'src/app/shared/helpers/fn';

import { Rental } from './rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`/api/v1/rentals`);
  }

  getRentalById(rentalId: string): Observable<Rental> {
    return this.http.get<Rental>(`/api/v1/rentals/${rentalId}`);
  }

  newRental(rentalData: Rental): Observable<any> {
    // alert(JSON.stringify(rentalData));

    // TODO:<? make post accept httpOptions
    // const httpOptions = {
    //   hearders: new HttpHeaders({
    //     auth: `Bearer ${this.authService.getToken()}`,
    //   })
    // };
    const httpHeaders = new HttpHeaders({
      auth: `Bearer ${this.authService.getToken()}`,
    });
    
    return this.http.post('api/v1/rentals', rentalData, {
      headers: httpHeaders,
    })
    .pipe(
      catchError((errs: HttpErrorResponse) => throwError(extractApiErr(errs)))
      // catchError((errs: HttpErrorResponse) => { return throwError(extractApiErr(errs))})
    );
  }




}
