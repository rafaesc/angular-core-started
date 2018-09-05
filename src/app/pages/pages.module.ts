import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '../@shared/shared.module';
import { PagesRoutingModule } from './pages.routing';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule.forRoot(),
  ],
  declarations: [PagesComponent, HomeComponent]
})
export class PagesModule { }
