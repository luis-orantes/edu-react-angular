
import { AbstractControl, ValidatorFn } from "@angular/forms";


export function emailBanVal(email: String): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return control.value === email? {'emailBan': {value: control.value}} : null;
  }
}
