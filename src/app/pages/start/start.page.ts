import {AuthSettingsBoxComponent} from '../../components/auth-settings-box/auth-settings-box.component';
import {TipOfTheDayService} from '../../services/ui/tip-of-the-day.service';
import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {SettingsService} from "src/app/services/settings/settings.service";
import {NavService} from "src/app/services/nav/nav.service";
import {AuthService} from "src/app/services/auth/auth.service";

@Component({
  selector: 'pbj-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss']
})
export class StartPage implements OnInit {
  #authService = inject(AuthService);
  @ViewChild('server') server: AuthSettingsBoxComponent;

  loading = false;

  constructor(
    private readonly navService: NavService,
    private readonly settings: SettingsService,
    public readonly tipOfTheDay: TipOfTheDayService
  ) {
  }

  ngOnInit() {
    this.tipOfTheDay.next().catch(e => console.error(e));
  }

  ionViewWillEnter() {
    // if (this.authService.isLoggedIn() && this.settings.server.autoSignIn) {
    console.log('auto go online in init');
    // this.goOnline();
    // this.goOnline();
    // }
  }

  async goOnline() {
    this.loading = true;
    const auth = this.server.auth;
    console.log('get auth');
    await this.#authService.login('admin', 'admin');
    console.log('check was not successful => go settings',);
  }

  private async loadInitialData() {
    // setInterval(() => this.progress = Math.min(++this.progress, 100), 50);
    // await this.dataService.load();
    await this.start();
  }

  private async start() {
    console.log('Start App');
    await this.navService.navigateToHome();
  }
}
