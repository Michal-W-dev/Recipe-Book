import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private alert: AlertService) { }

  // Can activate if user is logged
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const isAuth = !!this.auth.user.value
    if (isAuth) return isAuth;
    if (state.url !== '/recipes') this.alert.showAlert('Log in to access this url!', 'danger')
    return this.router.createUrlTree(['/auth'])
  }
}
