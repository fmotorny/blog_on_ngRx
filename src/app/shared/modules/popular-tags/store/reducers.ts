import {Action, createReducer, on} from '@ngrx/store';
import {PopularTagsStateInterface} from '../../../types/popularTagsState.interface';
import {getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction} from './actions/getPopularTags.action';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null
}


const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: true
    })
  ),

  on(
    getPopularTagsSuccessAction,
    (state, action): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.popularTags
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
  // on(routerNavigationAction, (): FeedStateInterface => initialState)
)

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagsReducer(state, action);
}
