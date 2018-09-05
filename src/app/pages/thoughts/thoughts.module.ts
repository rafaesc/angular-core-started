import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../@shared/shared.module';
import { TokenInterceptorService } from '../../@shared/services/token-interceptor.service';

import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ThoughtsComponent } from './thoughts.component';
import { ThoughtsRoutingModule } from './thoughts.routing';

import { reducers } from './@store';
import { ThoughtsEffects } from './@store/thoughts.effect';
import { ThoughtsService } from './thoughts.service';

@NgModule({
  imports: [
    CommonModule,
    ThoughtsRoutingModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    StoreModule.forFeature('thoughts', reducers),
    EffectsModule.forFeature([ThoughtsEffects]),
    HttpClientModule
  ],
  declarations: [ListComponent, CreateComponent, ThoughtsComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    ThoughtsService]
})
export class ThoughtsModule {}
