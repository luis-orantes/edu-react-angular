import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bwm-rental-detail',
  templateUrl: './rental-detail.component.html'
})
export class RentalDetailComponent implements OnInit {

  public rentalId = '';

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rentalId = params['rentalId'];
    });
  }

}
