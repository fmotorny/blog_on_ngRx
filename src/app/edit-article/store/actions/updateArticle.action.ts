import {createAction, props} from '@ngrx/store';
import {ActionTypes} from '../actionTypes';

import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {ArticleInterface} from '../../../shared/types/article.interface';

export const updateArticleAction = createAction(
  ActionTypes.UPDATE_ARTICLE,
  props<{slug: string, articleInput: ArticleInputInterface}>()
)

export const updateArticleSuccessAction = createAction(
  ActionTypes.UPDATE_ARTICLE_SUCCES,
  props<{article: ArticleInterface}>()
)

export const updateArticleFailureAction = createAction(
  ActionTypes.UPDATE_ARTICLE_FAILURE,
  props<{errors: BackendErrorsInterface}>()
)
