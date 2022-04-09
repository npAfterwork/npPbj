import {JamAuthService} from '../jam';
import {NavService} from '../services/nav/nav.service';
import {SettingsService} from '../services/settings/settings.service';
import {BaseGuard} from './base.guard';
import {TranslateService} from '@ngx-translate/core';
import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class UserGuard extends BaseGuard implements CanActivate {

  constructor(
    translate: TranslateService,
    settings: SettingsService,
    auth: JamAuthService,
    private readonly navService: NavService
  ) {
    super(translate, settings, auth);
  }

  async canActivate() {
    console.log('USER-GUARD: start');
    await this.loadApplicationData();
    await this.auth.check();

    const isLoggedIn = this.auth.isLoggedIn();
    // Try to log in for debug purpose
    // console.warn('Login with debug user', '17: canActivate');
    //
    // this.auth.login(CDEFAULT_USER.server, CDEFAULT_USER.name, CDEFAULT_USER.password, true, (err => {
    // 	console.log('USER LOGGED IN');
    // 	resolve(!err);
    // }));
    if (!isLoggedIn) {
      console.log('user guard block -> to to start');
      await this.navService.navigateToStart(); // .then(() => console.log('reached start'));
    }
    return isLoggedIn;
  }
}
