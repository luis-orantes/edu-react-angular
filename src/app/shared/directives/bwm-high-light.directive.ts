import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[bwmHighLight]'
})
export class BwmHighLightDirective {

  constructor(el: ElementRef)
  {
    el.nativeElement.style.backgroundColor = 'yellow';
  }




}
