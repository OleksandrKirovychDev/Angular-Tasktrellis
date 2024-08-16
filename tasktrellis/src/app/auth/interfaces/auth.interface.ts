import { InjectionToken } from '@angular/core';

export interface IAuthResponse {
  token: string;
}

interface IAuthTypeConfig {
  label: string;
  title: string;
  switchText: string;
}

export interface IAuthConfig {
  signUp: IAuthTypeConfig;
  signIn: IAuthTypeConfig;
  continueText: string;
  appConfig: {
    logoPath: string;
    name: string;
    images?: [string, string] | [string];
  };
}

export const AUTH_CONFIG = new InjectionToken<IAuthConfig>('AUTH_CONFIG');
