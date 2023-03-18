import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RentalService } from 'src/app/rentals/shared/rental.service';

import { Rental } from 'src/app/rentals/shared/rental.model';

@Component({
  selector: 'bwm-rental-new',
  templateUrl: './rental-new.component.html',
  styleUrls: ['./rental-new.component.scss']
})
export class RentalNewComponent implements OnInit {

  rentalCategories = Rental.RENTAL_CATEGORIES;
  newRental: Rental;

  constructor(
    private rentalService: RentalService,
  ) { }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental(rentalForm: NgForm) {
    if(rentalForm.invalid) {
      alert('The form has errors');
      return;
    }

    this.rentalService.newRental(this.newRental);
  }




}
