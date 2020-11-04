import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../auth.service';
import {PersistanceService} from '../../../shared/services/persistance.service';

import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {of} from 'rxjs';

import {getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction} from '../actions/getCurrentUser.action';

@Injectable()
export class GetCurrentUserEffect {

  constructor(private actions$: Actions, private authService: AuthService, private persistanceService: PersistanceService){}

  GetCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(getCurrentUserAction),
    switchMap(() => {

      const token = this.persistanceService.get('save token to localStorage');
      console.log('token', token);
      if (!token) {
        return of(getCurrentUserFailureAction());
      }

      return this.authService.getCurrentUser().pipe(
        map((currentUser: CurrentUserInterface) => {
          return getCurrentUserSuccessAction({currentUser});
        }),
        catchError(() => {
          return of(getCurrentUserFailureAction());
        })
      );
    })
  ));


  // redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
  //   ofType(loginSuccessAction),
  //   tap(() => {
  //     this.router.navigate(['/']);
  //   })
  // ), {dispatch: false});
}
