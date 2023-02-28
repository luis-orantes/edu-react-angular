import { Component, Input, ViewEncapsulation } from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent {

  private readonly TT_API_KEY = '';
  @Input('location') set location (location: string) {
    this.createMap();
  };

  constructor() { }

  createMap() {
    const map = tt.map({
      key: this.TT_API_KEY,
      container: 'bwm-map',
      style: 'tomtom://vector/1/basic-main',
    });
    map.addControl(new tt.NavigationControl());
  }




}
