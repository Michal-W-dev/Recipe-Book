import { createReducer, createSelector, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AppState } from '../store';
import * as AuthActions from './auth.actions'


export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | null,
  error: string | null,
  status: 'pending' | 'loading' | 'error' | 'success'
}

export const initialState: AuthState = {
  user: null,
  error: null,
  status: 'pending'
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { user }) => ({ ...state, user })),
  on(AuthActions.logout, (state, _) => ({ ...state, user: null })),
  on(AuthActions.loadAuths, (state, _) => ({ ...state, error: null, status: 'loading' })),
  on(AuthActions.loadAuthsSuccess, (state, _) => ({ ...state, error: null, status: 'success' })),
  on(AuthActions.loadAuthsFailure, (state, { error }) => ({ ...state, error, status: 'error' }))
);

const selectAuthReducer = (state: AppState) => state.auth;

export const selectUser = createSelector(selectAuthReducer, state => state.user)
export const selectToken = createSelector(selectUser, user => user?.token)
export const selectIsLogged = createSelector(selectUser, user => !!user?.token)
export const selectUserName = createSelector(selectUser, user => user && titleCase(user?.email.split('@')[0]))


export const titleCase = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)