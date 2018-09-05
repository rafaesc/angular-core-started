import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Thought } from './@models/thought.model';

@Injectable()
export class ThoughtsService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getList(): Observable<any> {
    const endpoint = this.url + 'list';
    return this.http.get(endpoint);
  }

  public create(data: Thought): Observable<any> {
    const endpoint = this.url + 'create';
    return this.http.post(endpoint, data);
  }
}
