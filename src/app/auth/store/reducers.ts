import {AuthStateInterface} from '../../shared/types/authState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {registerAction, registerFailureAction, registerSuccessAction} from './actions/register.action';
import {CurrentUserInterface} from '../../shared/types/currentUser.interface';
import {loginAction, loginFailureAction, loginSuccessAction} from './actions/login.action';
import {getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction} from './actions/getCurrentUser.action';

export const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
  isLoading: false
};

const authReducer = createReducer(
  initialState,
  on(registerAction, (state): AuthStateInterface => ({
    ...state,
    isSubmitting: true,
    validationErrors: null
  })
  ),
  on(registerSuccessAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: null,
    isLoggedIn: true,
    currentUser: action.currentUser
  })
  ),
  on(registerFailureAction, (state, action): AuthStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors,
  })
  ),
  on(loginAction, (state) => ({
    ...state,
    isSubmitting: true,
    validationErrors: null
  })
  ),
  on(loginSuccessAction, (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(loginFailureAction, (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(getCurrentUserAction, (state): AuthStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(getCurrentUserFailureAction, (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null
    })
));


// tslint:disable-next-line:typedef
export function reducers(state: AuthStateInterface | undefined, action: Action) {
  return authReducer(state, action);
}
