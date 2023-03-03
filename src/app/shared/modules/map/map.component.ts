import { Component, Input, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';

import { MapService } from './map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent {
  
  private map: any;

  @Input('location') set location (location: string) {
    this.map = this.mapService.createMap();
    // this.getGeolocation('ajsldfklakdjsf'); // to test an invalid location
    this.getGeolocation(location);
  };

  constructor(
    private mapService: MapService,
  ) { }



  private getGeolocation(location: string) {
    this.mapService.reqGeoLocation(location)
      .subscribe(res => {
        this.mapService.initMap(this.map, res);
    }, (err: Error) => {
      this.mapService.addPopupToMap(this.map, err.message);
    }
    );
  }




}
