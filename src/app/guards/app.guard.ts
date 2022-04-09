import {JamAuthService} from '../jam';
import {SettingsService} from '../services/settings/settings.service';
import {BaseGuard} from './base.guard';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppGuard extends BaseGuard implements CanActivate {

  constructor(
    translate: TranslateService,
    settings: SettingsService,
    auth: JamAuthService
  ) {
    super(translate, settings, auth);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loadApplicationData();
  }

}
