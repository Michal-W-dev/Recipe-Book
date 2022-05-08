import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { delay, interval, last, map, Observable, switchMap, take, tap, timer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IAuthResponse } from '../models/auth.model';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin = true;
  isLoading = false;
  error = ''
  user = { email: '', password: '' }

  constructor(private auth: AuthService, private router: Router, private alert: AlertService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin
  }

  onSubmit(form: NgForm | 'login-guest') {
    if (form !== 'login-guest' && form.invalid) return

    let authObs$: Observable<IAuthResponse>
    let email: string, password: string;

    if (form === 'login-guest') {
      [email, password] = ['guest@guest.pl', '321321']

      authObs$ = interval(35).pipe(take(email.length), tap(i => this.user.email += email[i]), switchMap(() => (
        timer(100, 40).pipe(take(password.length), tap(i => this.user.password += password[i]), delay(300)))
      ), switchMap(() => this.auth.login(email, password)))
    } else {
      [email, password] = [form.value.email, form.value.password]

      if (this.isLogin) authObs$ = this.auth.login(email, password)
      else authObs$ = this.auth.signUp(email, password)
    }

    this.isLoading = true;

    authObs$.subscribe({
      next: res => {
        this.router.navigateByUrl('/recipes')
        const name = email.split('@')[0]
        this.alert.showAlert(`Welcome ${name} !`, 'success')
      },
      error: err => {
        this.error = err
        this.alert.showAlert('Something went wrong !', 'danger')
      }
    }).add(() => {
      this.isLoading = false
      this.user = { email: '', password: '' }
    })
  }


  errorMinLength(control: NgModel) {
    const controlError = control.errors?.['minlength']
    return `The number of character is ${controlError.actualLength} and it must be  ${controlError.requiredLength}.`
  }

}
