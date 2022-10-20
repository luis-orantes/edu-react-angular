import { DirectiveAst } from '@angular/compiler';
import { Directive,
  ElementRef,
  Input,
  OnInit,
  ViewContainerRef,
  TemplateRef } from '@angular/core';

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




@Directive({
  selector: '[bwmNgIf]'
})
export class BmwNgIfDirective {

  hasView = false; // optional, to increase performance

  @Input('bwmNgIf') set bwmNgIf(condition: boolean) {
    if (condition && !this.hasView ) {
      this.container.createEmbeddedView(this.template);
      this.hasView = true;
    } else if(!condition && this.hasView) {
      this.container.clear();
      this.hasView = false;
    }
  }

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>,
  ) {}
  
}
