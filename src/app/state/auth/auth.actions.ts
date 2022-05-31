import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';


export const login = createAction(
  '[Auth] Login', props<{ user: User }>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const loadAuths = createAction(
  '[Auth] Load Auths', props<{ email: string, password: string, authType: 'login' | 'register' }>()
);

export const loadAuthsSuccess = createAction(
  '[Auth] Load Auths Success'
);

export const loadAuthsFailure = createAction(
  '[Auth] Load Auths Failure', props<{ error: string }>()
);
