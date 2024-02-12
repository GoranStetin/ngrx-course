import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../environments/environment";
import { routerReducer } from "@ngrx/router-store";


export interface AppState {

} 

/*
routerReducer je poseban reducer koji dolazi sa @ngrx/router-store bibliotekom i
služi za upravljanje stanjem navigacije u Angular aplikacijama. Ovaj reducer automatski reaguje na Angular
ruter akcije (kao što su navigacije) i ažurira deo stanja router u skladu sa trenutnim stanjem rutera.
Kada koristimo StoreModule.forRoot(reducers) u našem Angular modulu, ovaj reducers objekat
će se koristiti za kreiranje glavnog store-a aplikacije,
gde će svaki ključ u reducers objektu odgovarati određenom delu stanja u AppState.
*/

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
}

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        console.log("state before", state),
        console.log("action", action)
        return reducer(state, action)
    }
}

export const metaReducers: MetaReducer<AppState>[] =
!environment.production ? [logger] : [];