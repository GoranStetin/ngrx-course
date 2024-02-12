import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { isLoggedIn } from "./auth.selectors";
import { tap } from "rxjs/operators";


// CanActivate je zastareo, novi nacin je koriscenje inject funkcije
export const AuthGuard: CanActivateFn = (): Observable<boolean> => {
    const router = inject(Router);
    return inject(Store)
        .pipe(
            select(isLoggedIn),
            tap(isLoggedIn => {
                if (!isLoggedIn) {
                    router.navigateByUrl('/login');
                }
            })
        )

};