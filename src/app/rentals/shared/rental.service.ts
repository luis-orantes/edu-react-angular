import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { extractApiErr } from 'src/app/shared/helpers/fn';

import { Rental } from './rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(
    private http: HttpClient,
  ) {}

  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`/api/v1/rentals`);
  }

  getRentalById(rentalId: string): Observable<Rental> {
    return this.http.get<Rental>(`/api/v1/rentals/${rentalId}`);
  }

  newRental(rentalData: Rental): Observable<any> {
    return this.http.post('api/v1/rentals', rentalData)
    .pipe(
      catchError((errs: HttpErrorResponse) => throwError(extractApiErr(errs)))
      // catchError((errs: HttpErrorResponse) => { return throwError(extractApiErr(errs))})
    );
  }




}
