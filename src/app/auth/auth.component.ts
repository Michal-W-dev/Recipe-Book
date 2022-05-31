import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { delay, interval, last, map, switchMap, take, tap, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/store';
import * as AuthActions from '../state/auth/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLogin = true;
  isLoading$ = this.store.select('auth').pipe(map(({ status }) => { this.reset(status); return status === 'loading' }))
  error$ = this.store.select('auth').pipe(map(auth => auth.error))
  user = { email: '', password: '' }

  constructor(private store: Store<AppState>) { }


  onSubmit(form: NgForm | 'login-guest') {
    if (form !== 'login-guest' && form.invalid) return

    // let authObs$: Observable<IAuthResponse | null>
    let email: string, password: string;

    if (form === 'login-guest') {
      [email, password] = ['guest@guest.pl', '321321']

      interval(35).pipe(take(email.length), tap(i => this.user.email += email[i]), switchMap(() => (
        timer(100, 40).pipe(take(password.length), tap(i => this.user.password += password[i]), last(), delay(300)))
      )).subscribe(() => this.store.dispatch(AuthActions.loadAuths({ email, password, authType: 'login' })))
      // ), switchMap(() => this.auth.login(email, password)))
    } else {
      [email, password] = [form.value.email, form.value.password]
      // if (this.isLogin) authObs$ = this.auth.login(email, password)
      // else authObs$ = this.auth.signUp(email, password)
      if (this.isLogin) this.store.dispatch(AuthActions.loadAuths({ email, password, authType: 'login' }))
      else this.store.dispatch(AuthActions.loadAuths({ email, password, authType: 'register' }))
    }
  }

  errorMinLength(control: NgModel) {
    const controlError = control.errors?.['minlength']
    return `The number of character is ${controlError.actualLength} and it must be  ${controlError.requiredLength}.`
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin
  }

  reset(status: string) {
    if (status === 'error' || status === 'success') this.user = { email: '', password: '' }
  }

}
