import {Auth, Jam, JamAuthService} from '../../jam';
import {CDEFAULT_USER} from '../../model/defaults';
import {Component, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-auth-box',
  templateUrl: './auth-settings-box.component.html',
  styleUrls:   ['./auth-settings-box.component.scss']
})
export class AuthSettingsBoxComponent implements OnInit {
  passwordStyle: 'password' | 'text' = 'password';
  passwordIconColor: 'gray' | '' = 'gray';
  auth: Auth;
  private user: Jam.SessionUser;

  constructor(
    public readonly jamAuth: JamAuthService
  ) { }

  ngOnInit() {
    // this.auth = this.authService.auth || (this.authService.auth = {server:'', username:'', session: undefined, password: ''});
    this.auth = this.jamAuth.auth || (this.jamAuth.auth = {
      server: CDEFAULT_USER.server, username: CDEFAULT_USER.name, session: undefined, password: CDEFAULT_USER.password
    });
    console.log('INIT SETTINGS SERVWE', this.jamAuth.auth);
    this.user = this.jamAuth.user;
    console.log(this.auth, this.user);
  }

  showHidePassword() {
    this.passwordStyle = this.passwordStyle === 'password' ? 'text' : 'password';
    this.passwordIconColor = this.passwordStyle === 'password' ? 'gray' : '';
  }

  onUserChanged() {
    console.log('user changed');
  }
}
