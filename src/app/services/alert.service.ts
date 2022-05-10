import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alertEmitter = new Subject<{ show: boolean, msg: string, cssBorder: string }>()
  constructor() { }

  showAlert(msg = '', borderColor?: 'danger' | 'success') {
    const isBorder = (color: 'danger' | 'success') => borderColor === color
    const cssBorder = `2px solid ${isBorder('success') ? 'lime' : isBorder('danger') ? 'deeppink' : 'white'}`

    this.alertEmitter.next({ show: true, msg, cssBorder });
    setTimeout(() => this.alertEmitter.next({ show: false, msg: '', cssBorder }), 3500)
  }

}
