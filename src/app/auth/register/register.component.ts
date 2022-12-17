import { Component, OnInit } from '@angular/core';
import { RegisterForm } from '../shared/register-form.model'

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerFormData: RegisterForm;

  constructor() { }

  ngOnInit() {
    this.registerFormData = new RegisterForm();
  }

  get print() {
    return JSON.stringify(this.registerFormData);
  }


}
