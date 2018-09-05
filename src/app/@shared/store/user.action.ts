import { Action } from '@ngrx/store';

import { type } from '../utils/helpers';

export const ActionTypes = {
  LOAD: type('[User] Load'),
  LOAD_SUCCESS: type('[User] Load Success'),
  LOAD_FAIL: type('[User] Load Fail'),
};

/**
 * User Actions
 */
export class LoadAction implements Action {
  type = ActionTypes.LOAD;

  constructor(public payload: any = null) { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: any = null) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any = null) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;
