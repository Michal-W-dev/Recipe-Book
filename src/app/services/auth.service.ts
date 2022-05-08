import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponse } from '../models/auth.model';
import { environment } from 'src/environments/environment'
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`
    return this.http.post<IAuthResponse>(url, { email, password, returnSecureToken: true })
      .pipe(catchError(this.handleError), tap(res => (
        this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn)
      )))
  }

  login(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`
    return this.http.post<IAuthResponse>(url, { email, password, returnSecureToken: true })
      .pipe(catchError(this.handleError), tap(res => (
        this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn)
      )))
  }

  logout() {
    this.user.next(null);
    this.router.navigateByUrl('/auth')
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

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    // Set fix (expirationDate), on (login / register)
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

}
