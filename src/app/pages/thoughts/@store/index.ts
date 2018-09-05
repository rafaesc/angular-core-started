import { createSelector } from 'reselect';
import * as fromThoughts from './thoughts.reducer';
import * as fromCreate from './create-thought.reducer';

export interface State {
  thoughts: fromThoughts.State;
  create: fromCreate.State;
}

export const reducers = {
  thoughts: fromThoughts.reducer,
  create: fromCreate.reducer
};

export const getState = state => state.thoughts;

/**
 * Thoughts store functions
 */
export const getThoughtsState = createSelector(getState, (state: State) => state.thoughts);
export const getThoughts = createSelector(getThoughtsState, fromThoughts.getData);
export const getThoughtsLoading = createSelector(getThoughtsState, fromThoughts.getLoading);
export const getThoughtsFailed = createSelector(getThoughtsState, fromThoughts.getFailed);

/**
 * Create store functions
 */
export const getCreateState = createSelector(getState, (state: State) => state.create);
export const getCreateLoading = createSelector(getCreateState, fromCreate.getLoading);
export const getCreateFailed = createSelector(getCreateState, fromCreate.getFailed);
