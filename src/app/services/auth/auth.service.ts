import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {CPBJ} from "src/app/@core/consts";
import {StorageService} from "src/app/@modules/storage/storage.service";
import {JamApiService} from "src/app/services/jam/jam.api.service";
import {SessionUser} from "src/app/services/jam/model/sessionUser";

const AUTH_STORAGE_KEY = 'pbj.auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly #jamApiService = inject(JamApiService);
    readonly #storage = inject(StorageService);

    readonly #dataStore: { user?: SessionUser, jwt?: string } = {}

    jwt() {
        return this.#dataStore.jwt ?? '';
    }

    async login(
        server: string,
        username: string,
        password: string,
        keepMeLoggedIn: boolean
    ) {
        try {
            const {user, jwt} = await firstValueFrom(this.#jamApiService.login(server,
                {
                    client: CPBJ.CLIENT,
                    username,
                    password,
                    jwt: true
                }));
            this.#dataStore.user = user;
            this.#dataStore.jwt = jwt; // TODO: still have to ask. not working without maybe other authorization header
            // store the jwt or undefined in storage
            await this.#storage.set(AUTH_STORAGE_KEY, keepMeLoggedIn ? jwt : undefined);
        } catch (e) {
            this.#dataStore.user = undefined;
            console.log('login failed => error', e);
        }
        return this.#dataStore.user;
    }
}
