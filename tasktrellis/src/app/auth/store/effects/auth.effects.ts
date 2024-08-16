import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { exhaustMap, tap, map, catchError, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import * as AuthActions from '../actions/auth.actions';
import { IUser } from '../../../core/interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { PersistenceService } from '../../../core/services/persistance.service';

export const signIn$ = createEffect(
  (
    actions$ = inject(Actions),
    persistanceService: PersistenceService = inject(PersistenceService),
    authService: AuthService = inject(AuthService)
  ) =>
    actions$.pipe(
      ofType(AuthActions.signIn),
      exhaustMap(({ password, email }) =>
        authService.signIn({ password, email })
      ),
      tap(({ token }) => persistanceService.set('token', token)),
      map(({ token }) => {
        const user: IUser = jwtDecode(token);
        user.id = user.sub;
        return AuthActions.signInSuccess({ user, token });
      }),
      catchError((errorRes: HttpErrorResponse) =>
        of(AuthActions.signInFailure({ error: errorRes.message }))
      )
    ),

  { functional: true }
);

export const signUp$ = createEffect(
  (
    actions$ = inject(Actions),
    persistanceService: PersistenceService = inject(PersistenceService),
    authService: AuthService = inject(AuthService)
  ) =>
    actions$.pipe(
      ofType(AuthActions.signUp),
      exhaustMap(({ password, email, username }) =>
        authService.signUp({ password, email, name: username })
      ),
      tap(({ token }) => persistanceService.set('token', token)),
      map(({ token }) => {
        const user: IUser = jwtDecode(token);
        user.id = user.sub;
        return AuthActions.signUpSuccess({ user, token });
      }),
      catchError((errorRes: HttpErrorResponse) =>
        of(AuthActions.signUpFailure({ error: errorRes.message }))
      )
    ),
  { functional: true }
);

export const logout$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('token');
        router.navigateByUrl('/auth');
      })
    ),
  { functional: true, dispatch: false }
);
