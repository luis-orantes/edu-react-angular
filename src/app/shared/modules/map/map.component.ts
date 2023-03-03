import { Component, Input, ViewEncapsulation } from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';
import { map } from 'rxjs/operators';

import { AppConfig } from 'src/app/shared/app-config';
import { MapService } from './map.service';

@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent {

  @Input('location') set location (location: string) {
    this.createMap();
    this.getGeoloction(location);
  };

  private map: any;

  constructor(
    private mapService: MapService,
  ) { }

  createMap() {
    this.map = tt.map({
      key: AppConfig.TT_API_KEY,
      container: 'bwm-map',
      style: 'tomtom://vector/1/basic-main',
      zoom: 15,
      scrollZoom: false,
    });
    // this.map.addControl(new tt.NavigationControl());
  }

  private getGeoloction(location: string) {
    this.mapService.reqGeoLocation(location)
      .subscribe(res => {
        this.map.setCenter(new tt.LngLat(res.lon, res.lat));

        const markerDiv = document.createElement('div');
        markerDiv.className = 'bwm-marker';
        new tt.Marker({
          element: markerDiv,
        })
          .setLngLat([res.lon, res.lat])
          .addTo(this.map);
    });
  }




}
