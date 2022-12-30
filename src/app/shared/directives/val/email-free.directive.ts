import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';


@Directive({
  selector: '[bwmEmailFree]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailFreeDirective,
    multi: true,
  }],
})
export class EmailFreeDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors {
    return /gmail|hotmail/i.test(control.value) ? {'bwmEmailFree': {value: control.value}} : null;
  }




}
