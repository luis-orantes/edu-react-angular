import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bwm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerFormData: any = {};

  constructor() { }

  ngOnInit() {
  }

  get print() {
    return JSON.stringify(this.registerFormData);
  }


}
