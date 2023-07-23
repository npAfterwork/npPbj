import {inject, Injectable} from '@angular/core';
import {AccessService} from "src/@jam/access.service";
import {CredentialsArgs} from "src/@jam/model/credentialsArgs";
import {CPBJ} from "src/app/@core/consts";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly #accessService = inject(AccessService);
  #dataStore: { jwt?: string } = {
    jwt: undefined
  }

  async login(username = 'admin', password: 'admin') {
    try {
      const body: CredentialsArgs = {
        client: CPBJ.CLIENT,
        jwt: true,
        username,
        password
      }
      const res = await this.#accessService.authControllerLogin(body).toPromise();
      console.log('login was successful => go online', res);
      this.#dataStore.jwt = res.jwt;
    } catch (e) {
      console.log('login failed => error', e);
    }
  }

  jwt() {
    console.log(this.#dataStore.jwt);
    return this.#dataStore.jwt;
  }
}
