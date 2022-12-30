
import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[bwmEmailBan]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailBanDirective,
    multi: true,
  }]
})
export class EmailBanDirective implements Validator {

  @Input('bwmEmailBan') bwmEmailBan: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
      return control.value === this.bwmEmailBan ? {'bwmEmailBan': {value: control.value}} : null;
  }




}
