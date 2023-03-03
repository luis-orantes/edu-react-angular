import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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




}
