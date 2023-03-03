import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import tt from '@tomtom-international/web-sdk-maps';

import { AppConfig } from '../../app-config';

interface tomTomRes {
  summary: {[key: string]: any};
  results: {[key: string]: any}[];
}

interface positionRes {
  lat: number;
  lon: number;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient,
  ) { }

  reqGeoLocation(location: string): Observable<positionRes>
  {
    return this.http
      .get(`https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${AppConfig.TT_API_KEY}`)
      .pipe(
        map((res: tomTomRes) => {
          if(res.results && res.results.length>0) {
            return res.results[0].position;
          }
          throw this.locationErr;
        }),
        catchError(_ => throwError(this.locationErr))
      );
  }

  private get locationErr() {
    return new Error('Location not found!');
  }

  createMap() {
    return tt.map({
      key: AppConfig.TT_API_KEY,
      container: 'bwm-map',
      style: 'tomtom://vector/1/basic-main',
      zoom: 15,
      scrollZoom: false,
    });
    // this.map.addControl(new tt.NavigationControl());
  }

  initMap(map: any, position: positionRes) {
    this.centerMap(map, position);
    this.addMarkerToMap(map, position);
  }

  centerMap(map: any, position: positionRes) {
    map.setCenter(new tt.LngLat(position.lon, position.lat));
  }

  addMarkerToMap(map: any, position: positionRes) {
    const markerDiv = document.createElement('div');
    markerDiv.className = 'bwm-marker';

    new tt.Marker({
      element: markerDiv
    })
      .setLngLat([position.lon, position.lat])
      .addTo(map);
  }

  addPopupToMap(map: any, message: string) {
    new tt.Popup({className: 'bwm-popup', closeButton: false, closeOnClick: false})
      .setLngLat(new tt.LngLat(0, 0))
      .setHTML(`<p>${message}</p>`)
      .addTo(map);
  }




}
