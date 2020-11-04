import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {PopularTagsService} from '../../../../services/popular-tags.service';
import {getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction} from '../actions/getPopularTags.action';
import {PopularTagType} from '../../../../types/popularTag.type';

@Injectable()
export class GetPopularTagsEffect {

  constructor(private actions$: Actions, private popularTagsService: PopularTagsService){}

  GetPopularTags$ = createEffect(() => this.actions$.pipe(
    ofType(getPopularTagsAction),
    switchMap(() => {
      return this.popularTagsService.getPopularTags().pipe(
        map((popularTags: PopularTagType[]) => {
          return getPopularTagsSuccessAction({popularTags});
        }),
        catchError(() => {
          return of(getPopularTagsFailureAction());
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
