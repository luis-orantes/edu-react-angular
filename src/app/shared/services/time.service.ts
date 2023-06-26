import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  datePast(date: moment.Moment): boolean {
    return date.diff(moment(), 'days') < 0;
  }

  formatDate(date: string, dateFormat='YYYY/MM/DD'):string {
    if(!date) { return ''; }
    return moment(date).format(dateFormat);
  }
}
