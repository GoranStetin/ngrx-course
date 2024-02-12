import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';

import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthGuard } from './auth/auth.guard';
import { metaReducers, reducers } from '.';


const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    // *
    StoreRouterConnectingModule.forRoot({ stateKey: 'router', routerState: RouterState.Minimal }),
    /*Efekti su izvor sporednih efekata
     (kao što su asinhroni operacije poput komunikacije sa serverom)
     u NGRX ekosistemu. Oni slušaju za određene akcije poslate u store,
     izvršavaju neke operacije,
     i zatim šalju nove akcije (ili ih ne šalju) nazad u store. */
    EffectsModule.forRoot(),
    AuthModule.forRoot(),
    /*
    StoreModule.forRoot(reducers, { metaReducers }) se koristi za inicijalizaciju Ngrx Store-a
    sa određenim reducerima i metaReducerima,
    što omogućava efikasno upravljanje i manipulaciju stanjem u Angular aplikacijama.
    */
    StoreModule.forRoot(reducers, {
      // **
      metaReducers,
      runtimeChecks: {
        /*
        So here we are going to choose the strict state immutability check and we are going to turn it to true.
        So with this development check on, we are making sure that the state in our store is never accidentally
        mutated by our application code and this includes the reducers and any other application code that might
        accidentally try to mutate directly the state.
        */
        strictStateImmutability: true,
        // sprecava modifikaciju akcija
        strictActionImmutability: true,
        //
        strictStateSerializability: true,
        //
        strictActionSerializability: true,
        //
        strictActionTypeUniqueness: true,
        //
        strictActionWithinNgZone: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


/*
*StoreRouterConnectingModule:
StoreRouterConnectingModule je modul unutar Ngrx-a koji povezuje Angular Router sa Ngrx Store.
Ovaj modul omogućava sinhronizaciju navigacionih događaja (kao što su promene URL-a)
sa stanjem u Ngrx Store-u.
Drugim rečima,promene u ruteru se automatski odražavaju u stanju Ngrx Store-a i obrnuto.
*/

/*
So a meta reducer is a reducer function just like any other.
It follows the same concepts such as it takes the current state an action and produces a new version
of a state.
But the difference is that a meta reducer is going to be processed before the normal reducers are invoked.
So that's the main difference.
So whenever an action gets dispatched in our application, such as, for example, the login action,
what store is going to do is it's going to trigger any meta reducers that it might have configured before
handling the login action.
These meta reducers have a specific order.
They will be executed in that specific order every time when all the meta reducers are finished.
Only then normal actions such as, for example, the login or logout action are going to be handled.
*/