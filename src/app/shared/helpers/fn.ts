
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";


export function extractApiErr (resErr: HttpErrorResponse): BwmApi.errs[] {
  let errs = [{title: 'Error', msg: 'Some error ocurred'}];
  
  if(resErr && resErr.error && resErr.error.err) {
    errs = resErr.error.err;
  }
  
  return errs;
}