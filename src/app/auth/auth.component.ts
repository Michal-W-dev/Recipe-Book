import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLogin = true;

  constructor() { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    form.reset()
  }

}
