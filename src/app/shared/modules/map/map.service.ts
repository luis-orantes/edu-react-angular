import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of as ObservableOf } from 'rxjs';
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

  private locationMem: {[key: string]: positionRes} = {};

  constructor(
    private http: HttpClient,
  ) { }

  getGeolocationCached(location: string): Observable<positionRes> {
    const result = this.locationCaheGet(location);
    return result ?
      ObservableOf(result) :
      this.reqGeoLocation(location);
  }

  reqGeoLocation(location: string): Observable<positionRes>
  {
    return this.http
      .get(`https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${AppConfig.TT_API_KEY}`)
      .pipe(
        map((res: tomTomRes) => {
          if(res.results && res.results.length>0) {
            const { position } = res.results[0];
            this.locationCacheSet(location, position);
            return position;
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

  locationCacheSet(location: string, position: positionRes): void {
    this.locationMem[this.normalizeLocation(location)] = position;
  }

  locationCaheGet(location: string): positionRes {
    return this.locationMem[this.normalizeLocation(location)];
  }

  normalizeLocation(location: string): string {
    return location.replace(/\s/g, '').toLowerCase();
  }




}
