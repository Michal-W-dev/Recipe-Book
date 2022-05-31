import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { selectUser } from '../state/auth/auth.reducer';
import { AppState } from '../state/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private alert: AlertService, private store: Store<AppState>) { }
  // Can activate if user is logged
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isAuth = (!!firstValueFrom(this.store.select(selectUser)))
    // const isAuth = !!this.auth.user.value
    if (isAuth) return isAuth;
    if (state.url !== '/recipes') this.alert.showAlert('Log in to access this url!', 'danger')
    return this.router.createUrlTree(['/auth'])
  }
}
