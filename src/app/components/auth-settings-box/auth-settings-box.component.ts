import {CDEFAULT_USER} from '../../@core/defaults';
import {Component, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {TranslateModule} from "@ngx-translate/core";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'pbj-auth-box',
  standalone: true,
  templateUrl: './auth-settings-box.component.html',
  imports: [
    IonicModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./auth-settings-box.component.scss']
})
export class AuthSettingsBoxComponent implements OnInit {
  passwordStyle: 'password' | 'text' = 'password';
  passwordIconColor: 'gray' | '' = 'gray';

  serverControl = new FormControl<string | null>(CDEFAULT_USER.server, Validators.required)
  usernameControl = new FormControl<string | null>(CDEFAULT_USER.name, Validators.required)
  passwordControl = new FormControl<string | null>(CDEFAULT_USER.password, Validators.required)

  form = new FormGroup({
    server: this.serverControl,
    username: this.usernameControl,
    password: this.passwordControl
  })

  ngOnInit() {
    // this.auth = this.authService.auth || (this.authService.auth = {server:'', username:'', session: undefined, password: ''});
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
