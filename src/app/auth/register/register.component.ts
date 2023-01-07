
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterForm } from '../shared/register-form.model'
import { validateFormInputs } from 'src/app/shared/fn/formFn';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerFormData: RegisterForm;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  formErrs = [];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.registerFormData = new RegisterForm();
  }


  get print() {
    return JSON.stringify(this.registerFormData);
  }


  register(form: NgForm) {
    validateFormInputs(form);
    
    if(form.invalid) {
      return;
    }
    
    this.formErrs = [];
    
    this.authService.register(this.registerFormData).subscribe(_ => {
      this.router.navigate(['/login'], {
        queryParams: {msg: 'The user has been successfully registered'},
      });
    }, (err: BwmApi.errs[]) => this.formErrs = err)
    
  }




}
