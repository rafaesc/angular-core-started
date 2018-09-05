import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

const ERROR_MESSAGE = 'Ocurrió un error inesperado, por favor vuelva a intentar más tarde';

@Injectable()
export class CatchInterceptorService implements HttpInterceptor {
  constructor() {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const interceptionOperator = tap<HttpEvent<any>>(() => {}, this.catchError);

    const handledRequest = next.handle(req);
    return handledRequest.pipe(interceptionOperator);
  }

  private catchError = err => {
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    }
    // tslint:disable-next-line:no-string-throw
    throw ERROR_MESSAGE;
  }

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.catchUnauthorized();
    } else {
      // tslint:disable-next-line:no-string-throw
      throw ERROR_MESSAGE;
    }
  }

  private catchUnauthorized() {
    console.log('Not authorized');
    // this.navigateToLogin();
  }
}
