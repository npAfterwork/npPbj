import {CDEFAULT_USER} from '../../@core/defaults';
import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'pbj-auth-box',
  standalone: true,
  templateUrl: './auth-settings-box.component.html',
  imports: [
    IonicModule,
    TranslateModule,
    FormsModule
  ],
  styleUrls: ['./auth-settings-box.component.scss']
})
export class AuthSettingsBoxComponent implements OnInit {
  passwordStyle: 'password' | 'text' = 'password';
  passwordIconColor: 'gray' | '' = 'gray';
  auth!: { server: string; password: string; session: any; username: string };

  constructor() {
  }

  ngOnInit() {
    // this.auth = this.authService.auth || (this.authService.auth = {server:'', username:'', session: undefined, password: ''});
    this.auth = {
      server: CDEFAULT_USER.server, username: CDEFAULT_USER.name, session: undefined, password: CDEFAULT_USER.password
    };
    console.log('INIT SETTINGS SERVWE');
  }

  showHidePassword() {
    this.passwordStyle = this.passwordStyle === 'password' ? 'text' : 'password';
    this.passwordIconColor = this.passwordStyle === 'password' ? 'gray' : '';
  }

  onUserChanged() {
    console.log('user changed');
  }
}
