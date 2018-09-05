import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';

// Operators
import './operators';

// Modules
import { CoreRoutingModule } from './core.routing';
import { PagesModule } from '../pages/pages.module';
import { SharedModule } from '../@shared/shared.module';

// Store
import { reducers } from '../@shared/store';

// Effects
import { GlobalEffect } from '../@shared/store/global.effect';

// Enviroment
import { environment } from '../../environments/environment';

import { CoreComponent } from './core.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([GlobalEffect]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    PagesModule,
    CoreRoutingModule,
    SharedModule.forRoot(),
  ],
  declarations: [CoreComponent],
  exports: [
    CoreComponent
  ],
})
export class CoreModule { }
