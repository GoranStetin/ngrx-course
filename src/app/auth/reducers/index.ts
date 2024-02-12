import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
  State
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
}

export const initialAuthState: AuthState = {
  user : undefined
}


/*
Reduktori su čiste funkcije koje uzimaju trenutno stanje aplikacije
i akciju koja treba da se izvrši,
i vraćaju novo stanje. Oni definišu kako se stanje aplikacije
menja u odgovoru na akcije poslate u store.
*/
export const authReducer = createReducer(
  // This is initial state
  initialAuthState,
  // This is what reducer should do i case of login action. Will call arrow function and return user from the action
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    }
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    }
    
  })
)


export const metaReducers: MetaReducer<AuthState>[] = isDevMode() ? [] : [];
