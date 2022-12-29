
import { NgForm } from "@angular/forms";

export function validateFormInputs(form: NgForm): void {
  for(let inputKey in form.controls) {
    form.controls[inputKey].markAsDirty();
  }
}
