import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CreateArticleStateInterface} from '../types/createArticleState.interface';
import {AppStateInterface} from '../../shared/types/appState.interface';

export const createArticleFeatureSelector = createFeatureSelector<AppStateInterface, CreateArticleStateInterface>('createArticle');

export const isLoadingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) => createArticleState.isSubmitting
)

export const errorSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) => createArticleState.validationErrors
)

