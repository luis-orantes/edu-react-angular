import { Component, Input, ViewEncapsulation } from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';
import { map } from 'rxjs/operators';

import { AppConfig } from 'src/app/shared/app-config';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent {

  @Input('location') set location (location: string) {
    this.createMap();
  };

  constructor() { }

  createMap() {
    const map = tt.map({
      key: AppConfig.TT_API_KEY,
      container: 'bwm-map',
      style: 'tomtom://vector/1/basic-main',
    });
    map.addControl(new tt.NavigationControl());
  }




}
