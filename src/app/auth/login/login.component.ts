import { Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validator, AbstractControl, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RegisterForm } from '../shared/register-form.model';
import { validateFormInputs } from 'src/app/shared/fn/formFn';
import { emailBanVal, emailFreeVal, sameAsVal } from 'src/app/shared/fn/valFn';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  msg: string;
  msgTimeout: number;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  formErrs: BwmApi.errs[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.showLoginMsg();
  }

  ngOnDestroy(): void {
    this.msgTimeout && clearTimeout(this.msgTimeout);
  }

  initForm() {
    this.loginForm = this.formBuilder.group({ // input validators
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailPattern),
        // emailBanVal('a@b.com'),
        // emailFreeVal(),
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4)],
      ]}/*,
      { // form validators
        validators: [
          sameAsVal(['password', 'email']), // just a test
        ]
      }*/
    );
  }

  login(form: NgForm) {
    validateFormInputs(form);
    if(this.loginForm.invalid) { return; }

    this.formErrs = [];
    return this.authService
      .login(this.loginForm.value)
      .subscribe((_: string) => {
        if(this.authService.urlRedirect) {
          this.router.navigate([this.authService.urlRedirect]);
          this.authService.urlRedirect = null;
        }
        else
          this.router.navigate(['/rentals']);
      }, (errs: BwmApi.errs[]) => {
        this.formErrs = errs;
      })

  }

  get email(): AbstractControl { return this.loginForm.get('email') }
  get password(): AbstractControl { return this.loginForm.get('password') }

  get print() {
    return JSON.stringify(this.loginForm.value);
  }

  showLoginMsg() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.msg = params['msg'] ? params['msg'] : null;

      this.msgTimeout = window.setTimeout(_ => {
        this.router.navigate([], {
          replaceUrl: true,
          queryParams: {msg: null},
          queryParamsHandling: 'merge',
        });
        this.msg = '';
      }, 3000);
    })
    
  }




}
