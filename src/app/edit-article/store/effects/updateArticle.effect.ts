import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {EditArticleService} from '../../editArticle.service';
import {updateArticleAction, updateArticleFailureAction, updateArticleSuccessAction} from '../actions/updateArticle.action';

@Injectable()
export class UpdateArticleEffect {

  constructor(private actions$: Actions, private editArticleService: EditArticleService, private router: Router){}

  UpdateArticle$ = createEffect(() => this.actions$.pipe(
    ofType(updateArticleAction),
    switchMap(({slug, articleInput}) => {
      return this.editArticleService.updateArticle(slug, articleInput).pipe(
        map((article: ArticleInterface) => {
          return updateArticleSuccessAction({article});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(updateArticleFailureAction({errors: errorResponse.error.errors}));
        })
      );
    })
  ));


  redirectAfterUpdate$ = createEffect(() => this.actions$.pipe(
    ofType(updateArticleSuccessAction),
    tap(({article}) => {
      this.router.navigate(['/article', article.slug]);
    })
  ), {dispatch: false});
}
