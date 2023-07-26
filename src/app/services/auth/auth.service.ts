import {inject, Injectable} from '@angular/core';
import {AccessService} from "src/@jam/access.service";
import {CredentialsArgs} from "src/@jam/model/credentialsArgs";
import {CPBJ} from "src/app/@core/consts";
import {StorageService} from "src/app/services/storage/storage.service";
import {SessionUser} from "src/@jam/model/sessionUser";

const AUTH_STORAGE_KEY = 'pbj.auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly #accessService = inject(AccessService);
  readonly #storage = inject(StorageService);

  #dataStore: { user?: SessionUser, jwt?: string } = {}

  async login(username = 'admin', password = 'admin', keepMeLoggedIn = false) {
    try {
      const body: CredentialsArgs = {
        client: CPBJ.CLIENT,
        username,
        password,
        jwt: true
      }
      const {user, jwt} = await this.#accessService.authControllerLogin(body).toPromise();
      console.log('login was successful => go online', jwt, user);
      this.#dataStore.user = user;
      this.#dataStore.jwt = jwt; // TODO: still have to ask. not working without maybe other authorization header
      if (keepMeLoggedIn) {
        await this.#storage.set(AUTH_STORAGE_KEY, jwt);
      }

    } catch (e) {
      console.log('login failed => error', e);
    }
  }

  jwt() {
    return this.#dataStore.jwt ?? '';
  }
}
