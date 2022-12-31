
import { Directive, Input } from '@angular/core';
import { Validator, ValidationErrors, NG_VALIDATORS, FormGroup } from '@angular/forms';

@Directive({
  selector: '[bwmSameAs]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SameAsDirective,
    multi: true,
  }],
})
export class SameAsDirective implements Validator {

  @Input('bwmSameAs') bwmSameAs: string[];

  validate(controls: FormGroup): ValidationErrors | null {
    // make sure we have all data ready
    if(!this.bwmSameAs || !this.bwmSameAs[0] || !this.bwmSameAs[1]) return null;

    const str1 = controls.get(this.bwmSameAs[0]);
    const str2 = controls.get(this.bwmSameAs[1]);
    
    // when having an empty input, we will get null
    // we need to wait having some data in the inputs to continue
    if(!str1 || !str2) return null;

    return str1.value === str2.value ? null : {'bwmSameAs': {value: controls.value}};
  }

}
