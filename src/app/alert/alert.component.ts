import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  show = false;
  message = '';
  border = ''
  alertSub: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSub = this.alertService.alertEmitter.subscribe(({ show, msg, cssBorder }) => {
      this.show = show;
      this.message = msg;
      this.border = cssBorder
    })
  }

}
