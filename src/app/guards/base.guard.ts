import {JamAuthService} from '../jam';
import {CLOCALES} from '../model/consts';
import {SettingsService} from '../services/settings/settings.service';
import {TranslateService} from '@ngx-translate/core';

export class BaseGuard {

  constructor(
    protected readonly translate: TranslateService,
    protected readonly settings: SettingsService,
    protected readonly auth: JamAuthService
  ) {
  }

  async loadApplicationData() {
    console.debug('APP-Guard load data');
    const requests = [];
    if (!this.settings.hasLoaded()) {
      console.debug('APP-Guard load settings');
      requests.push(this.settings.load());
    }
    if (!this.auth.loaded) {
      console.debug('APP-Guard load auth');
      requests.push(this.auth.load());
    }
    this.translate.setDefaultLang(CLOCALES.DEFAULT);
    console.debug('APP-Guard load language');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    return new Promise<boolean>(async resolve => {
      this.translate.use(CLOCALES.DEFAULT).subscribe(() => {
        console.log('APP-Guard All Data Loaded');
        Promise.all(requests).then(() => resolve(true)).catch(e => console.error(e));
      });
    });
  }

}
