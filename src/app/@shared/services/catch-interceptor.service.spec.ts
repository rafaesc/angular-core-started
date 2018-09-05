import { TestBed, inject } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { CatchInterceptorService } from './catch-interceptor.service';

describe('CatchInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [CatchInterceptorService]
    });
  });

  it('should be created', inject([CatchInterceptorService], (service: CatchInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
