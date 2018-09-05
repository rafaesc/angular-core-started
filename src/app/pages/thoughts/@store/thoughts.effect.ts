import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as store from '../../../@shared/store';

import { ThoughtsService } from '../thoughts.service';
import * as thoughtsActions from './thoughts.action';
import * as createActions from './create-thought.action';
import { Thought } from '../@models/thought.model';

@Injectable()
export class ThoughtsEffects {
  /**
   * Load Thoughts effect
   */
  @Effect()
  loadThoughts$: Observable<Action> = this.actions$
    .ofType(thoughtsActions.ActionTypes.LOAD)
    .withLatestFrom(this.appState$)
    .map(([action]: [thoughtsActions.LoadAction, store.State]) => action.payload)
    .switchMap(() => {
      return (
        this.thoughtsService
          .getList()
          .mergeMap(res => [
            new thoughtsActions.LoadSuccessAction(
              res.map(item => new Thought(item))
            )
          ])
          .catch(error => of(new thoughtsActions.LoadFailAction(error)))
      );
    });

    /**
     * Create Thought effect
     */
    @Effect()
    create$: Observable<Action> = this.actions$
      .ofType(createActions.ActionTypes.LOAD)
      .withLatestFrom(this.appState$)
      .map(([action]: [createActions.LoadAction, store.State]) => action.payload)
      .switchMap(state => {
        return (
          this.thoughtsService
            .create(state)
            .mergeMap(res => [
              new createActions.LoadSuccessAction(res)
            ])
            .catch(error => of(new createActions.LoadFailAction(error)))
        );
      });

  constructor(
    private actions$: Actions,
    private thoughtsService: ThoughtsService,
    private appState$: Store<store.State>
  ) {}
}
