import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { State } from '../store';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private token;

  constructor(private store: Store<State>) {
    this.subscribeToTokenChanges();
  }

  private subscribeToTokenChanges() {
    this.store.select(state => state.user).subscribe(this.setToken);
  }

  private setToken = user => {
    if (user && user.data) {
      this.token = user.data.token;
    }
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorizedReq = this.setAuthHeader(req);
    const handledRequest = next.handle(authorizedReq);
    return handledRequest;
  }
  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    if (this.token) {
      const authToken = `Bearer ${this.token}`;
      const headers = req.headers.set('Authorization', authToken);
      const authorizedReq = req.clone({ headers });
      return authorizedReq;
    }
    return req;
  }
}
