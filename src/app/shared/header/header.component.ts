import { templateJitUrl } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'bmw-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {

  customNumber: 123;
}
