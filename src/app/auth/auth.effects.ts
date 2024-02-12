import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";




/*  
So the action gets dispatched, its reducer gets triggered,
and then after that we want to do something else.
In this case, we want to also, as a side effect,
save the user profile on local storage.
*/

@Injectable()
export class AuthEffects {
    
    /* 
    So in order to get notified whenever an action gets triggered,
    we are going to be injecting here a
    new service which is of type actions.
    This service is part of NGRX effects.
    */
    login$ = createEffect(() =>
        this.actions$
            .pipe(
                // TypeOf NGRXEffect operator
                ofType(AuthActions.login),
                tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
            )
            // Prevencija ponovnog dispecovanja akcije i infinity loopa
        , { dispatch: false });


     logout$ = createEffect(() => 
        this.actions$
            .pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    localStorage.removeItem('user');
                    this.router.navigateByUrl('/login');
                }) 
            ), {dispatch: false}
     )   

    constructor(private actions$: Actions, private router: Router) {
       
    }



}