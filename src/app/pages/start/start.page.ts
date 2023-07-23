import {AuthSettingsBoxComponent} from '../../components/auth-settings-box/auth-settings-box.component';
import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {NavService} from "src/app/services/nav/nav.service";
import {AuthService} from "src/app/services/auth/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {TipOfTheDayService} from "src/app/services/tip-of-the-day/tip-of-the-day.service";

@Component({
  selector: 'pbj-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss']
})
export class StartPage implements OnInit {
  #authService = inject(AuthService);
  #translate = inject(TranslateService);
  @ViewChild('server') server: AuthSettingsBoxComponent;

  loading = false;

  constructor(
    private readonly navService: NavService,
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

  async goOnline(data: any) {
    this.loading = true;
    console.log('get auth', data);
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
