import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  formatDate(date: string, dateFormat='YYYY/MM/DD'):string {
    if(!date) { return ''; }
    return moment(date).format(dateFormat);
  }
}
