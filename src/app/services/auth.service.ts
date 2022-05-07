import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponse } from '../models/auth.model';
import { environment } from 'src/environments/environment'
import { catchError, Subject, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`
    return this.http.post<IAuthResponse>(url, { email, password, returnSecureToken: true })
      .pipe(catchError(this.handleError))
  }

  login(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`
    return this.http.post<IAuthResponse>(url, { email, password, returnSecureToken: true })
      .pipe(catchError(this.handleError))
  }


  private handleError(errRes: HttpErrorResponse) {
    const fbError = errRes.error?.error?.message
    let errMsg = 'An unknown error occured!'
    if (!fbError) return throwError(() => new Error(errMsg))

    errMsg = fbError.includes('EMAIL_EXISTS') ? 'This email exists already' :
      fbError.includes('WEAK_PASSWORD') ? 'Password must be at least 6 characters' :
        fbError.includes('EMAIL_NOT_FOUND') ? 'Email not found, please register first' :
          fbError.includes('INVALID_PASSWORD') ? 'Password is invalid' : errMsg

    return throwError(() => new Error(errMsg))
  }


}
