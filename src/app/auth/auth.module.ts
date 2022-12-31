
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmailBanDirective } from 'src/app/shared/directives/val/email-ban.directive';
import { EmailFreeDirective } from 'src/app/shared/directives/val/email-free.directive';
import { SameAsDirective } from 'src/app/shared/directives/val/same-as.directive';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmailBanDirective,
    EmailFreeDirective,
    SameAsDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
