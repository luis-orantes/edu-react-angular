import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { RentalModule } from './rentals/rental.module';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
  ],
  imports: [
    RentalModule,
    BrowserModule,
    AppRoutingModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
