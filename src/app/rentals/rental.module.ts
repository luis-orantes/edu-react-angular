import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { RentalComponent } from './rental.component';
import { RentalCardComponent } from '../shared/rental-card/rental-card.component';

import { RentalService } from './shared/rental.service';

import { FirstUpperLetterPipe } from '../shared/pipes/first-upper-letter.pipe';

import { BwmHighLightDirective } from '../shared/directives/bwm-high-light.directive';
import { CustomNgIfDirective } from '../shared/directives/custom-ng_if.directive';
import { CustomNgForDirective } from '../shared/directives/custom-ng_for.directive';

const routes: Routes = [
  {path: 'rentals',
    component: RentalComponent,
    children: [
      {path: '', component: RentalListingComponent},
      {path: ':rentalId', component: RentalDetailComponent}
    ]
  }
];

@NgModule({
  declarations: [
    RentalComponent,
    RentalListingComponent,
    RentalDetailComponent,
    RentalCardComponent,
    FirstUpperLetterPipe,
    BwmHighLightDirective,
    CustomNgIfDirective,
    CustomNgForDirective,
  ],
  providers: [
    RentalService,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
  ]
})
export class RentalModule {}
