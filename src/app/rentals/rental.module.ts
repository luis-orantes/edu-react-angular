import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MapModule } from '../shared/modules/map/map.module';

import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { RentalComponent } from './rental.component';
import { RentalCardComponent } from '../shared/rental-card/rental-card.component';

import { FirstUpperLetterPipe } from '../shared/pipes/first-upper-letter.pipe';

import { BwmHighLightDirective } from '../shared/directives/bwm-high-light.directive';
import { CustomNgIfDirective } from '../shared/directives/custom-ng_if.directive';
import { CustomNgForDirective } from '../shared/directives/custom-ng_for.directive';
import { RentalSecretComponent } from './rental-secret/rental-secret.component';
import { AuthGuard } from 'src/app/auth/shared/auth.guard';
import { RentalNewComponent } from './rental-new/rental-new/rental-new.component';




const routes: Routes = [
  {path: 'rentals',
    component: RentalComponent,
    children: [
      {path: '', component: RentalListingComponent},
      {path: 'new', component: RentalNewComponent, canActivate: [AuthGuard]},
      {path: 'secret', component: RentalSecretComponent, canActivate: [AuthGuard]},
      {path: ':rentalId', component: RentalDetailComponent},
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
    RentalSecretComponent,
    RentalNewComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    MapModule,
  ]
})
export class RentalModule {}
