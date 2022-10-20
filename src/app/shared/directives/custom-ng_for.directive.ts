import { Directive, TemplateRef, ViewContainerRef, Input, OnChanges } from '@angular/core';




@Directive({
  selector: '[bwmNgFor]'
})
export class CustomNgForDirective implements OnChanges {

  @Input('bwmNgForOf') bwmNgForOf: Array<any>;


  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>,
  ) { }


  ngOnChanges(): void {
    for(let item of this.bwmNgForOf)
      this.container.createEmbeddedView(this.template, {$implicit: item});
  }




}
