import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponse } from '../models/auth.model';
import { environment } from 'src/environments/environment'
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpTimer: ReturnType<typeof setTimeout> | null;
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router, private alert: AlertService) { }

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

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}')
    if (!userData) return
    const { email, id, _token, _tokenExpirationDate } = userData;
    const loadedUser = new User(email, id, _token, new Date(_tokenExpirationDate))
    if (loadedUser.token) {
      this.user.next(loadedUser);

      const tokenExpiration = new Date(userData._tokenExpirationDate).getTime()
      const currentTime = new Date().getTime()
      const expirationDuration = (tokenExpiration - currentTime) / 1000
      this.autoLogout(expirationDuration)
    }
  }

  logout() {
    const name = this.user.value?.email.split('@')[0]

    this.user.next(null);
    this.router.navigateByUrl('/auth');
    localStorage.removeItem('userData')
    if (this.tokenExpTimer) clearTimeout(this.tokenExpTimer);
    this.tokenExpTimer = null;

    this.alert.showAlert(`Goodbye ${name} !`, 'success');
  }

  autoLogout(expirationSeconds: number) {
    const expirationMs = expirationSeconds * 1000

    this.tokenExpTimer = setTimeout(() => {
      this.logout();
      setTimeout(() => this.alert.showAlert('Token has expired, please log in again!', 'danger'))
    }, expirationMs)
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
    // Set fix (expirationDate) on (login / register)
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn)
    localStorage.setItem('userData', JSON.stringify(user))
  }

}
