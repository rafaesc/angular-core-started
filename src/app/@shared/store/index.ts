import { createSelector } from 'reselect';
import * as fromUser from './user.reducer';

export interface State {
  user: fromUser.State;
  thoughts?: any;
}

export const reducers = {
  user: fromUser.reducer
};


/**
 * User store functions
 */
export const getUserState   = (state: State) => state.user;
export const getUser  = createSelector(getUserState, fromUser.getData);
export const getUserLoading  = createSelector(getUserState, fromUser.getLoading);
export const getUserFailed  = createSelector(getUserState, fromUser.getFailed);
