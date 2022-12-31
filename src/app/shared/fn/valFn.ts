
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";


export function emailBanVal(email: String): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return control.value === email ? {'emailBan': {value: control.value}} : null;
  }
}

export function emailFreeVal(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return /gmail|hotmail/i.test(control.value) ? {'emailFree': {value: control.value}} : null;
  }
}

export function sameAsVal(bwmSameAs: string[]): ValidatorFn {
  return (controls: FormGroup): ValidationErrors => {
    // make sure we have all data ready
    if(!bwmSameAs || !bwmSameAs[0] || !bwmSameAs[1]) return null;

    const str1 = controls.get(bwmSameAs[0]);
    const str2 = controls.get(bwmSameAs[1]);

    // when having an empty input, we will get null
    // we need to wait having some data in the inputs to continue
    if(!str1 || !str2) return null;
    
    return str1.value === str2.value ? null : {'bwmSameAs': {value: controls.value}};
  }
}

