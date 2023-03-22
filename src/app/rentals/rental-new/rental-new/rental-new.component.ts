import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { RentalService } from 'src/app/rentals/shared/rental.service';
import { validateFormInputs } from 'src/app/shared/fn/formFn';

import { Rental } from 'src/app/rentals/shared/rental.model';

@Component({
  selector: 'bwm-rental-new',
  templateUrl: './rental-new.component.html',
  styleUrls: ['./rental-new.component.scss'],
})
export class RentalNewComponent implements OnInit {

  rentalCategories = Rental.RENTAL_CATEGORIES;
  newRental: Rental;
  formErrs: BwmApi.errs[] = [];

  constructor(
    private rentalService: RentalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental(rentalForm: NgForm) {
    validateFormInputs(rentalForm);
    if(rentalForm.invalid) {
      alert('The form has errors');
      return;
    }

    this.formErrs = [];

    this.rentalService.newRental(this.newRental)
    .subscribe(_ => this.router.navigate(['/rentals']),
      (errs: BwmApi.errs[]) => this.formErrs = errs
    );
  }




}
