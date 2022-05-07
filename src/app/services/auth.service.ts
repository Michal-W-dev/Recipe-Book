import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponse } from '../models/auth.model';
import { environment } from 'src/environments/environment'
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<IAuthResponse>(this.url, {
      email, password,
      returnSecureToken: true
    }).pipe(catchError(err => {
      const fbError = err.error?.error?.message
      let errMsg = 'An unknown error occured!'
      if (!fbError) return throwError(() => new Error(errMsg))

      errMsg = fbError.includes('EMAIL_EXISTS') ? 'This email exists already' :
        fbError.includes('WEAK_PASSWORD') ? 'Password must be at least 6 characters' : errMsg

      return throwError(() => new Error(errMsg))
    }))
  }

}
