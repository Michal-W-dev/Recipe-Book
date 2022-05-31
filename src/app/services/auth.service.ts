import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthResponse } from '../models/auth.model';
import { environment } from 'src/environments/environment'
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/store';
import * as AuthActions from '../state/auth/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpTimer: ReturnType<typeof setTimeout> | null;
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router, private alert: AlertService, private store: Store<AppState>) { }

  signUp(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`
    return this.http.post<IAuthResponse>(url, { email, password, returnSecureToken: true }).pipe(catchError(this.handleError))
    //.pipe(catchError(this.handleError), tap(res => (this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn))))
  }

  login(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`
    return this.http.post<IAuthResponse>(url, { email, password, returnSecureToken: true }).pipe(catchError(this.handleError))
    //.pipe(catchError(this.handleError), tap(res => (this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn))))
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}')
    if (!userData) return
    const { email, id, _token, _tokenExpirationDate } = userData;
    const loadedUser = new User(email, id, _token, new Date(_tokenExpirationDate))
    if (loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(AuthActions.login({ user: loadedUser }))
      const tokenExpiration = new Date(userData._tokenExpirationDate).getTime()
      const currentTime = new Date().getTime()
      const expirationDuration = (tokenExpiration - currentTime) / 1000
      this.autoLogout(expirationDuration)
    }
  }

  logout() {
    const name = this.user.value?.email.split('@')[0];
    this.store.dispatch(AuthActions.logout())
    // this.user.next(null);
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

  private handleError = (errRes: HttpErrorResponse) => {
    const fbError = errRes.error?.error?.message
    let error = 'An unknown error occured!'
    if (!fbError) {
      this.store.dispatch(AuthActions.loadAuthsFailure({ error }))
      if (!fbError) return throwError(() => new Error(error))
    }
    error = fbError.includes('EMAIL_EXISTS') ? 'This email exists already' :
      fbError.includes('WEAK_PASSWORD') ? 'Password must be at least 6 characters' :
        fbError.includes('EMAIL_NOT_FOUND') ? 'Email not found, please register first' :
          fbError.includes('INVALID_PASSWORD') ? 'Password is invalid' : error

    this.store.dispatch(AuthActions.loadAuthsFailure({ error }))
    this.alert.showAlert('Something went wrong !', 'danger')
    return throwError(() => new Error(error))
  }

}
