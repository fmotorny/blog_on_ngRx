import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {ArticleService as SharedArticleService} from '../../../shared/services/article.service';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from '../actions/getArticle.action';


@Injectable()
export class GetArticleEffect {

  constructor(private actions$: Actions, private sharedArticleService: SharedArticleService){}

  UpdateArticle$ = createEffect(() => this.actions$.pipe(
    ofType(getArticleAction),
    switchMap(({slug}) => {
      return this.sharedArticleService.getArticle(slug).pipe(
        map((article: ArticleInterface) => {
          return getArticleSuccessAction({article});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(getArticleFailureAction());
        })
      );
    })
  ));



}
