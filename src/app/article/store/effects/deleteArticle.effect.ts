import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ArticleService} from '../../services/article.service';
import {deleteArticleAction, deleteArticleFailureAction, deleteArticleSuccessAction} from '../actions/deleteArticle.action';
import {Router} from '@angular/router';


@Injectable()
export class DeleteArticleEffect {

  constructor(private actions$: Actions, private articleLocalService: ArticleService, private router: Router){}

  GetArticle$ = createEffect(() => this.actions$.pipe(
    ofType(deleteArticleAction),
    switchMap(({slug}) => {
      return this.articleLocalService.deleteArticle(slug).pipe(
        map(() => {
          return deleteArticleSuccessAction();
        }),
        catchError(() => {
          return of(deleteArticleFailureAction());
        })
      );
    })
  ));


  redirectAfterDelete$ = createEffect(() => this.actions$.pipe(
      ofType(deleteArticleSuccessAction),
      tap(() => {
        this.router.navigate(['/']);
      })
    ),
    {dispatch: false}
  );

}
