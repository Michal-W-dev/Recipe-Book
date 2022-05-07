import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, NgModel } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin = true;
  isLoading = false;
  error = ''

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return
    this.isLoading = true;

    const { email, password } = form.value;
    if (this.isLogin) {
      console.log('Logging is not implemented yet');

    } else {
      this.auth.signUp(email, password).subscribe({
        next: res => console.log(res),
        error: err => this.error = err
      }).add(() => this.isLoading = false)
    }
    // form.reset()
  }

  errorMinLength(control: NgModel) {
    const controlError = control.errors?.['minlength']
    return `The number of character is ${controlError.actualLength} and it must be  ${controlError.requiredLength}.`
  }

}
