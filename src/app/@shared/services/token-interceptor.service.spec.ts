import { TestBed, inject } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { reducers } from '../store';

import { TokenInterceptorService } from './token-interceptor.service';

describe('TokenInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), ],
      providers: [TokenInterceptorService,
        ]
    });
  });

  it('should be created', inject([TokenInterceptorService], (service: TokenInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
