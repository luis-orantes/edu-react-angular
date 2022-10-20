import { Directive, TemplateRef, ViewContainerRef, Input, OnChanges } from '@angular/core';




@Directive({
  selector: '[bwmNgFor]'
})
export class CustomNgForDirective implements OnChanges {

  @Input('bwmNgFor') bwmNgFor: Array<any>;


  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>,
  ) { }


  ngOnChanges(): void {
    for(let item of this.bwmNgFor)
      this.container.createEmbeddedView(this.template);
  }




}
