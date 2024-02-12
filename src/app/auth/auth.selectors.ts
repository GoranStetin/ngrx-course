import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

//Feature selector (type safe version of feature selector)
export const selectAuthState = createFeatureSelector<AuthState>("auth")

/*
Selektori su čiste funkcije koje se koriste za dohvatanje i izvlačenje specifičnih delova stanja iz store-a.
Omogućavaju memoizaciju i optimalne performanse tako što izbegavaju nepotrebno ponovno izračunavanje izvedenih
podataka ako se osnovni podaci nisu promenili.
U sustini selektor je maping funkcija sa memorijom, sve dok se input ne promeni, output nece biti rekalkulisan
Cist primer memoizacije
*/

export const isLoggedIn = createSelector(
    //select the part of the store, in this case auth
    selectAuthState,
    (auth) => !!auth.user     
)

export const isLoggedOut = createSelector(
    //using siLoggedIn selector and ! it
    isLoggedIn,
    loggedIn => !loggedIn
)