import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstUpperLetter'
})
export class FirstUpperLetterPipe implements PipeTransform {

  transform(value: string): string {
    if(!value || typeof value != 'string')
      return '';

     return value.split(' ').map(item => {
      // to get the first letter we could use 'item[0]' but it would fail for words separated by two or more spaces
      return item.slice(0, 1).toUpperCase()+item.slice(1);
    }).join(' ');
  }




}
