import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thoughts',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class ThoughtsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
