import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThoughtsComponent } from './thoughts.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

export const PAGES_ROUTES: Routes = [
  {
    path: '',
    component: ThoughtsComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'create', component: CreateComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(PAGES_ROUTES)],
  exports: [RouterModule]
})
export class ThoughtsRoutingModule {}
