import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Rental } from './rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http: HttpClient) {}

  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`/api/v1/rentals`);
  }

  getRentalById(rentalId: string): Observable<Rental> {
    return this.http.get<Rental>(`/api/v1/rentals/${rentalId}`);
  }

  newRental(rentalData: Rental) {
    alert(JSON.stringify(rentalData));
  }




}
