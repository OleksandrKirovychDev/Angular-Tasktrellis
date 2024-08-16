import {
  ChangeDetectionStrategy,
  Component,
  inject,
  AfterViewInit,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import * as AuthActions from './store/actions/auth.actions';
import { AUTH_CONFIG } from './interfaces/auth.interface';
import { APP_AUTH_CONFIG } from './constants/auth.constants';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormControlComponent } from '../shared/components/form-control/form-control.component';
import { InputComponent } from '../shared/components/input/input.component';
import { BehaviorSubject } from 'rxjs';
import { TCreateUser } from '../core/interfaces/user.interface';
import { passwordValidator } from './validators/password.validator';
import { ButtonComponent } from '../shared/components/button/button.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    NgOptimizedImage,
    InputComponent,
    ButtonComponent,
  ],
  providers: [
    {
      provide: AUTH_CONFIG,
      useValue: APP_AUTH_CONFIG,
    },
  ],
  template: `
    @if(authConfig.appConfig) {
    <div
      class="wrapper relative bg-primary-100 py-10 px-6 w-full flex-grow h-full"
    >
      <img
        priority
        width="200"
        height="50"
        class="block mb-6 mx-auto max-w-md"
        [ngSrc]="authConfig.appConfig.logoPath"
        [alt]="authConfig.appConfig.name + ' logo'"
      />

      <div class="mx-auto shadow rounded bg-white p-6 max-w-md w-full">
        <span
          class="block mb-5 font-semibold text-base text-center text-neutral-600"
          >{{ labelText }}</span
        >

        <form [formGroup]="authForm" (ngSubmit)="submitForm()">
          <div class="flex flex-col mb-5">
            <app-form-control>
              <app-input
                placeholder="Enter email"
                formControlName="email"
                [type]="'email'"
              ></app-input>
            </app-form-control>

            @if (isSignUpMode$ | async) {
            <app-form-control>
              <app-input
                placeholder="Enter username"
                formControlName="name"
              ></app-input>
            </app-form-control>
            } @if(isShowPasswordField) {
            <app-form-control>
              <app-input
                [type]="'password'"
                placeholder="Enter password"
                formControlName="password"
              ></app-input>
            </app-form-control>
            }
          </div>
          <app-button
            class="continue-btn"
            [state]="(isSignUpMode$ | async) ? 'normal' : 'success'"
            [label]="buttonText"
            [type]="'submit'"
            [disabled]="isDisabledForm"
          ></app-button>
        </form>

        <hr class="my-4" />

        <button
          (click)="toggleMode()"
          class="text-sm text-primary-200 cursor-pointer text-center hover:text-primary-300 transition"
        >
          {{ switchText }}
        </button>
      </div>
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements AfterViewInit {
  private _fb = inject(NonNullableFormBuilder);
  private _store = inject(Store);
  protected authConfig = inject(AUTH_CONFIG);

  public readonly isSignUpMode$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public authForm = this._fb.group({
    name: this._fb.control<TCreateUser['name']>(''),
    email: this._fb.control<TCreateUser['email']>('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._fb.control<TCreateUser['password']>('', [
      Validators.required,
      passwordValidator,
    ]),
  });

  public get isDisabledForm(): boolean {
    return (
      (this.isShowPasswordField && this.authForm.invalid) ||
      (!this.isShowPasswordField &&
        (this.authForm.controls.name.invalid ||
          this.authForm.controls.email.invalid))
    );
  }

  public get isShowPasswordField(): boolean {
    return !this.authForm.controls.password.hasError('notReady');
  }

  public get labelText(): string {
    return this.isSignUpMode$.getValue()
      ? this.authConfig.signUp.title
      : this.authConfig.signIn.title;
  }

  public get switchText(): string {
    return this.isSignUpMode$.getValue()
      ? this.authConfig.signIn.switchText
      : this.authConfig.signUp.switchText;
  }

  public get buttonText(): string {
    const isSignUp = this.isSignUpMode$.getValue();

    if (this.isShowPasswordField) {
      return isSignUp
        ? this.authConfig.signUp.label
        : this.authConfig.signIn.label;
    }

    return this.authConfig.continueText;
  }

  public ngAfterViewInit() {
    this._hidePasswordField();
  }

  public submitForm(): void {
    if (this.authForm.invalid && this.authForm.controls.email.valid) {
      this.authForm.controls.password.updateValueAndValidity();
    }
    if (this.authForm.invalid) return;

    const user: TCreateUser = this.authForm.value as TCreateUser;

    if (this.isSignUpMode$.getValue()) {
      this._store.dispatch(
        AuthActions.signUp({
          password: user.password,
          email: user.email,
          username: user.name,
        })
      );
    } else {
      this._store.dispatch(
        AuthActions.signIn({ password: user.password, email: user.email })
      );
    }
  }

  public toggleMode(): void {
    const isSignUp = this.isSignUpMode$.getValue();
    const nameControl = this.authForm.controls.name;

    this.isSignUpMode$.next(!isSignUp);

    if (isSignUp) nameControl.removeValidators(Validators.required);
    else nameControl.setValidators([Validators.required]);

    nameControl.updateValueAndValidity();
  }

  private _hidePasswordField(): void {
    const passwordControl = this.authForm.controls.password;
    passwordControl.setErrors({ notReady: true, ...passwordControl.errors });
  }
}
