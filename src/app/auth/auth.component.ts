import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IAuthResponse } from '../models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin = true;
  isLoading = false;
  error = ''

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return
    this.isLoading = true;
    const { email, password } = form.value;

    let authObs$: Observable<IAuthResponse>

    if (this.isLogin) authObs$ = this.auth.login(email, password)
    else authObs$ = this.auth.signUp(email, password)

    authObs$.subscribe({
      next: res => { console.log(res); this.router.navigateByUrl('/recipes') },
      error: err => this.error = err
    }).add(() => this.isLoading = false)

    form.reset()
  }

  errorMinLength(control: NgModel) {
    const controlError = control.errors?.['minlength']
    return `The number of character is ${controlError.actualLength} and it must be  ${controlError.requiredLength}.`
  }

}
