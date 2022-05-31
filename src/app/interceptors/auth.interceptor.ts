import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { exhaustMap, firstValueFrom, map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/store';
import { selectToken, selectUser } from '../state/auth/auth.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private store: Store<AppState>) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // const token = this.auth.user.value?.token || false

    return this.store.select(selectToken).pipe(take(1), map(userToken => {
      const token = userToken || false
      return request.clone({ params: new HttpParams().set('auth', token) })
    }), exhaustMap(modifiedReq => next.handle(modifiedReq)))
  }
}
