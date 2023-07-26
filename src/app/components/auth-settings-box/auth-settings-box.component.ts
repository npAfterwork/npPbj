import {CDEFAULT_USER} from '../../@core/defaults';
import {Component, EventEmitter, inject, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {TranslateModule} from "@ngx-translate/core";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "src/app/services/auth/auth.service";
import {SessionUser} from "src/app/services/jam/model/sessionUser";

@Component({
  selector: 'pbj-auth-box',
  standalone: true,
  templateUrl: './auth-settings-box.component.html',
  styleUrls: ['./auth-settings-box.component.scss'],
  imports: [
    IonicModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class AuthSettingsBoxComponent {
  @Output() login = new EventEmitter<SessionUser>();
  readonly #authService = inject(AuthService);

  passwordStyle: 'password' | 'text' = 'password';
  passwordIconColor: 'gray' | '' = 'gray';

  serverControl = new FormControl<string | null>(CDEFAULT_USER.server, Validators.required)
  usernameControl = new FormControl<string | null>(CDEFAULT_USER.name, Validators.required)
  passwordControl = new FormControl<string | null>(CDEFAULT_USER.password, Validators.required)
  keepMeLoggedInControl = new FormControl<boolean>(false)

  form = new FormGroup<{
    server: FormControl<string | null>,
    username: FormControl<string | null>,
    password: FormControl<string | null>,
    keepMeLoggedIn: FormControl<boolean>,
  }>({
    server: this.serverControl,
    username: this.usernameControl,
    password: this.passwordControl,
    keepMeLoggedIn: this.keepMeLoggedInControl
  })
  hasError = false;

  showHidePassword() {
    // TODO button does never look right...
    this.passwordStyle = this.passwordStyle === 'password' ? 'text' : 'password';
    this.passwordIconColor = this.passwordStyle === 'password' ? 'gray' : '';
  }

  async submit() {
    const data = this.form.getRawValue();
    const user = await this.#authService.login(
      data.server,
      data.username,
      data.password,
      data.keepMeLoggedIn
    );
    console.log(user, 'logged in');
    this.hasError = !user;
    if (user) {
      this.login.emit(user);
    }
  }
}
