/**
 * JamApi
 * Api for JamServe
 *
 * OpenAPI spec version: 0.2.1
 */

import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CredentialsArgs} from 'src/app/services/jam/model/credentialsArgs';
import {Session} from 'src/app/services/jam/model/session';

@Injectable({providedIn: 'root'})
export class JamApiService {
  #host = 'http://localhost:4040';
  #basePath = '/jam/v1';
  #httpClient = inject(HttpClient);
  #httpHeaders = new HttpHeaders()
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json');

  login(host: string, body: CredentialsArgs, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling authControllerLogin.');
    }
    this.#host = host;
    const url = `${this.#host + this.#basePath}/auth/login`
    return this.#httpClient.request<Session>('post', url,
      {
        body: body,
        withCredentials: true,
        headers: this.#httpHeaders,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  logout(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    const url = `${this.#host + this.#basePath}/auth/logout`;
    return this.#httpClient.request<Session>('post', url,
      {
        withCredentials: true,
        headers: this.#httpHeaders,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}

