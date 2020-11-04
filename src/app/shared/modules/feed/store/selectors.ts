import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FeedStateInterface} from '../types/feedState.interface';
import {AppStateInterface} from '../../../types/appState.interface';

export const feedFeatureSelector = createFeatureSelector<AppStateInterface, FeedStateInterface>('feed');

export const isLoadingSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.isLoading
)

export const errorSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.error
)

export const feedSelector = createSelector(
  feedFeatureSelector,
  (feedState: FeedStateInterface) => feedState.data
)

// export const  isSubmittingSelector = createSelector(authFeatureSelector, (authState: AuthStateInterface) => authState.isSubmitting);
//
// export const validationErrorSelector = createSelector(authFeatureSelector, (authState: AuthStateInterface) => authState.validationErrors);


// export const isLoggedInSelector = createSelector(
//   authFeatureSelector, (authState: AuthStateInterface) => authState.isLoggedIn
// );
//
// export const isAnonymousSelector = createSelector(
//   authFeatureSelector, (authState: AuthStateInterface) => authState.isLoggedIn === false
// );
//
// export const currentUserSelector = createSelector(
//   authFeatureSelector, (authState: AuthStateInterface) => authState.currentUser
// );
