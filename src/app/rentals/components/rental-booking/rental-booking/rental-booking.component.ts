import { Component, OnInit, Input } from '@angular/core';
import { Moment } from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';

import { Booking } from 'src/app/booking/shared/booking.model';
import { Rental } from 'src/app/rentals/shared/rental.model';
import { TimeService } from 'src/app/shared/services/time.service';

@Component({
  selector: 'bwm-rental-booking',
  templateUrl: './rental-booking.component.html',
  styleUrls: ['./rental-booking.component.scss']
})
export class RentalBookingComponent implements OnInit {

  @Input('isAuth') isAuth = false;
  @Input('rental') rental: Rental;
  calendar: { startDate: Moment, endDate: Moment };
  locale = {
    format: "YYYY/MM/DD",
  };
  newBooking: Booking;
  
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public timeService: TimeService,
  ) { }

  ngOnInit() {
    this.initBooking();
  }

  initBooking() {
    this.newBooking = new Booking();
    this.newBooking.guests = 1;
  }

  updateBookingDates({startDate, endDate}: {[key: string]: Moment}) {
    if(!startDate || !endDate) { return; };

    if(startDate.isSame(endDate, 'days')) {
      alert('Invalid days!');
      this.calendar = null;
      // return;
    }

    this.newBooking.startAt = startDate.format();
    this.newBooking.endAt = endDate.format();
    this.newBooking.nights = endDate.diff(startDate, 'days');
    this.newBooking.price = this.newBooking.nights * this.rental.dailyPrice;
  }

  confirmModal() {
    this.ngxSmartModalService.getModal('confirmationModal').open();
  }

  get canReserve() {
    return this.newBooking.startAt &&
      this.newBooking.endAt &&
      this.newBooking.guests &&
      this.newBooking.guests > 0;
  }

  reservePlace() {
    alert(JSON.stringify(this.newBooking));
  }




}
