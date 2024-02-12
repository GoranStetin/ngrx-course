import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

// Action creation function
export const login = createAction(
    // By convenction: [Which page can call it(we want to track from where action is comming)] what is the action
    "[Login Page] User Login",
    props<{ user: User }>()
);


export const logout = createAction(
    "[Top Menu] Logout"
    // This type of action dont need payLoad so we dont need to specify props
)


/*
---createAction(): Ovo je funkcija iz NGRX biblioteke koja kreira i vraća akciju.
Akcija u NGRX-u je objekat koji sadrži najmanje jedno polje,
type, koje opisuje šta akcija predstavlja.

---"[Login Page] User Login": Ovo je string koji jedinstveno identifikuje akciju unutar aplikacije.
    Konvencija je da se ime akcije obično piše u formi [izvor] opis akcije,
    gde je izvor mesto iz kog akcija može biti pozvana (na primer, stranica ili komponenta),
    a opis akcije je opisno ime akcije koje govori šta ta akcija predstavlja.

---props<{ user: User }>(): Ovo je funkcija koja se koristi za definisanje dodatnih podataka koje akcija može nositi.
   U ovom slučaju, akcija očekuje da nosi objekat sa jednim svojstvom user, koji je tipa User.
   User je verovatno definisan kao interfejs ili klasa negde u aplikaciji.
   Funkcija props omogućava tipizaciju ovih podataka tako da TypeScript može da proverava tipove prilikom kompajliranja koda.

*/