
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";


export function extractApiErr (resErr: HttpErrorResponse): BwmApi.errs[] {
  let errs: BwmApi.errs[] = [{title: 'Error', msg: 'Some error ocurred'}];
  
  if(resErr && resErr.error && resErr.error.err) {
    errs = resErr.error.err;
  }

  if(!errs[0].title || !errs[0].msg) {
    // titles not shown
    errs=[
      {
        title: 'ERROR',
        msg: 'UNFORMATTED ERROR: ',
      }, {
        title: 'ERROR',
        msg: JSON.stringify(errs),
      }];
    }
  
  return errs;
}