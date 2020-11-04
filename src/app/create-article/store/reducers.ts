
import {Action, createReducer, on} from '@ngrx/store';
import {CreateArticleStateInterface} from '../types/createArticleState.interface';
import {createArticleAction, createArticleFailureAction, createArticleSuccessAction} from './actions/createArticleaction';


const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,

}


const articleReducer = createReducer(
  initialState,
  on(
    createArticleAction,
    (state): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),

  on(
    createArticleSuccessAction,
    (state, action): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(
    createArticleFailureAction,
    (state, action): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  )

);

export function reducers(state: CreateArticleStateInterface, action: Action) {
  return articleReducer(state, action);
}
