import { Directive,
  ElementRef,
  Input,
  OnInit } from '@angular/core';

@Directive({
  selector: '[bwmHighLight]'
})
export class BwmHighLightDirective implements OnInit {

  @Input('bwmHighLight') bwmHighLight

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = this.bwmHighLight;
  }




}
