import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../auth.service';
import {catchError, map, switchMap} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {updateCurrentUserAction, updateCurrentUserFailureAction, updateCurrentUserSuccessAction} from '../actions/updateCurrentUser.action';

@Injectable()
export class UpdateCurrentUserEffect {

  constructor(private actions$: Actions, private authService: AuthService){}

  UpdateCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateCurrentUserAction),
    switchMap(({currentUserInput}) => {
      return this.authService.updateCurrentUser(currentUserInput).pipe(
        map((currentUser: CurrentUserInterface) => {
          return updateCurrentUserSuccessAction({currentUser});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(updateCurrentUserFailureAction({errors: errorResponse.error.errors}));
        })
      );
    })
  ));


}
