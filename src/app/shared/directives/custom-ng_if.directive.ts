import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[bwmNgIf]'
})
export class CustomNgIfDirective {

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
  ) { }




}
