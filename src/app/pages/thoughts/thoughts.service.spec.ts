import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';

import { TokenInterceptorService } from '../../@shared/services/token-interceptor.service';
import { reducers, State, getUserState } from '../../@shared/store';
import * as userActions from '../../@shared/store/user.action';

import { ThoughtsService } from './thoughts.service';

describe('ThoughtsService', () => {
  let store: Store<State>;
  let user$;
  let injector;
  let service;
  let httpMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({ ...reducers })],
      providers: [
        ThoughtsService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
        }
      ]
    });

    store = TestBed.get(Store);
    user$ = store.select(getUserState);

    spyOn(store, 'dispatch').and.callThrough();
    store.dispatch(new userActions.LoadSuccessAction({ token: 'prubea' }));
    injector = getTestBed();
    service = injector.get(ThoughtsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([ThoughtsService], (thoughtsService: ThoughtsService) => {
    expect(thoughtsService).toBeTruthy();
  }));

  it('should return data list', () => {
    const thoughtMock = [
      {
        name: 'Heelo',
        thought: 'Example'
      }
    ];

    service.getList().subscribe(dataResponse => {
      expect(dataResponse).toBeDefined();
      expect(dataResponse.length).toBe(1);
      expect(dataResponse[0].name).toBe('Heelo');
    });
    const req = httpMock.expectOne(`${service.url}list`);
    expect(req.request.method).toBe('GET');
    req.flush(thoughtMock);
  });

  it('should return data create', () => {
    user$.subscribe(() => {
      const thoughtMock = {
        id: 1,
        name: 'Heelo',
        thought: 'Example'
      };

      service.create().subscribe(dataResponse => {
        expect(dataResponse.id).toBeDefined();
        expect(dataResponse.name).toBe('Heelo');
      });
      const req = httpMock.expectOne(`${service.url}create`);
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Authorization')).toBe('Bearer prubea');

      req.flush(thoughtMock);
    });
  });
});
