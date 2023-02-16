import { templateJitUrl } from '@angular/compiler';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bmw-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  @Input('isAuthenticated') isAuthenticated = false;
  @Input('user') user = '';




}
