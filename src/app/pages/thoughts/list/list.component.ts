import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Thought } from '../@models/thought.model';
import * as store from '../@store';
import * as thoughtsActions from '../@store/thoughts.action';
import * as UserActions from '../../../@shared/store/user.action';

@Component({
  selector: 'app-list',
  template: `
  <h1>Thoughts</h1>
  <p>
    <a routerLink="/thoughts/create">Create</a>
  </p>
  <ul>
    <li *ngFor="let item of thoughts">
      {{item.name}} <br />
      <p>{{ item.thought }}</p>
    </li>
  </ul>
  `,
  styles: []
})
export class ListComponent implements OnInit {
  public thoughts: Array<Thought>;
  private thoughts$ = this.appState$.select(store.getThoughts);

  constructor(protected appState$: Store<store.State>) {
    appState$.dispatch(new thoughtsActions.LoadAction());
  }

  ngOnInit() {
    this.thoughts$.subscribe(thoughts => {
      this.thoughts = thoughts;
    });
  }

}
