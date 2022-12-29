import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, AbstractControl, Validators, NgForm } from '@angular/forms';

import { RegisterForm } from '../shared/register-form.model';
import { validateFormInputs } from 'src/app/shared/fn/formFn';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  login(form: NgForm) {
    validateFormInputs(form);
    if(this.loginForm.invalid) { return; }
    alert(this.print);
  }

  get email(): AbstractControl { return this.loginForm.get('email') }
  get password(): AbstractControl { return this.loginForm.get('password') }

  get print() {
    return JSON.stringify(this.loginForm.value);
  }




}
