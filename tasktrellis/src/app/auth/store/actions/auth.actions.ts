import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../core/interfaces/user.interface';

export const signUp = createAction(
  '[SignUp] SignUp Pending',
  props<{ username: string; password: string; email: string }>()
);

export const signUpSuccess = createAction(
  '[SignUp] SignUp Success',
  props<{ user: IUser; token: string }>()
);

export const signUpFailure = createAction(
  '[SignUp] SignUp Failure',
  props<{ error: string }>()
);

export const signIn = createAction(
  '[signIn] signIn Pending',
  props<{ password: string; email: string }>()
);

export const signInSuccess = createAction(
  '[signIn] signIn Success',
  props<{ user: IUser; token: string }>()
);

export const signInFailure = createAction(
  '[signIn] signIn Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout', props);
