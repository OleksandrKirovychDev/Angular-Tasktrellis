import { createReducer, on } from '@ngrx/store';
import {
  signUp,
  signUpFailure,
  signUpSuccess,
  signIn,
  signInFailure,
  signInSuccess,
} from '../actions/auth.actions';
import { IUser } from '../../../core/interfaces/user.interface';

export interface State {
  token: string | null;
  error: string | null;
  user: IUser | null;
  isLoading: boolean;
}

const initialState: State = {
  token: null,
  user: null,
  error: null,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,
  on(signUp, signIn, (state) => ({ ...state, isLoading: true })),
  on(signUpSuccess, signInSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    isLoading: false,
  })),
  on(signUpFailure, signInFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  }))
);
