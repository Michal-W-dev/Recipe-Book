import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from '../store';
import { titleCase } from './auth.reducer'
import * as AuthActions from './auth.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) { }

  authLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loadAuths),
    switchMap(({ email, password, authType }) => (
      (authType === 'login') ? this.auth.login(email, password) : this.auth.signUp(email, password)
    ).pipe(
      map(res => {
        //Handle loadAuth success (error catched in authService)
        this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn)
        this.router.navigateByUrl('/recipes')
        const name = titleCase(email.split('@')[0])
        this.alert.showAlert(`Welcome ${name} !`, 'success')
        return AuthActions.loadAuthsSuccess()
      }),
    ))
  ))

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    // Set fix (expirationDate) on (login / register)
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.store.dispatch(AuthActions.login({ user }))
    // this.user.next(user);
    this.auth.autoLogout(expiresIn)
    localStorage.setItem('userData', JSON.stringify(user))
  }


}
