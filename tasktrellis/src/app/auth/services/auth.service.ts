import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IAuthResponse } from '../interfaces/auth.interface';
import { environment } from '../../../environments/environment.development';
import { TCreateUser, TLoginUser } from '../../core/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  public signUp(data: TCreateUser): Observable<IAuthResponse> {
    const url = `${environment.baseUrl}/auth/signup`;
    return this.http.post<IAuthResponse>(url, data);
  }

  public signIn(data: TLoginUser): Observable<IAuthResponse> {
    const url = `${environment.baseUrl}/auth/signin`;
    return this.http.post<IAuthResponse>(url, data);
  }
}
