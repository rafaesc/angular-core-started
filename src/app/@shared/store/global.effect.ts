import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as store from '.';

@Injectable()
export class GlobalEffect {

  constructor(
    private actions$: Actions,
    private appState$: Store<store.State>
  ) {}
}
