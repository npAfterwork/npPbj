import {Auth, Jam, JamConfiguration} from '../../jam';
import {CPBJ} from '../../model/consts';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Storage} from '@ionic/storage';

export const WINDOW = new InjectionToken('window', { providedIn: 'root', factory: () => window });

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends JamConfiguration {
  static localStorageName = 'pbj.auth';
  clientDomain?: string = undefined;

  constructor(
    private localstorage: Storage,
    @Inject(WINDOW) private window: Window
  ) {
    super();
    this.clientName = CPBJ.CLIENT;
    this.clientDomain = window.location.origin;
  }

  domain(): string {
    return this.clientDomain;
  }

  async fromStorage(): Promise<{ user: Jam.User; auth: Auth } | undefined> {
    return this.localstorage.get(ConfigurationService.localStorageName);
  }

  async toStorage(data: { user: Jam.User; auth: Auth } | undefined): Promise<void> {
    return this.localstorage.set(ConfigurationService.localStorageName, data);
  }

  async userChangeNotify(user: Jam.User | undefined): Promise<void> {
    console.log('user change notify', user);
  }

}
