import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/shared/auth.service';

@Component({
  selector: 'bwm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    // this.logout = this.logout.bind(this);
  }

  ngOnInit() {
    this.authService.checkAuthentication();
  }

  logout = () => {
    this.authService.logout();
    this.router.navigate(['/rentals']);
  }




}
