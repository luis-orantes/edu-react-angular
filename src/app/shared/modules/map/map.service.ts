import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient,
  ) { }

  reqGeoLocation(location: string): Observable<any>
  {
    return this.http
      .get(`https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${AppConfig.TT_API_KEY}`);
  }




}
