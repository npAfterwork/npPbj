import {AuthSettingsBoxComponent} from '../../components/auth-settings-box/auth-settings-box.component';
import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {NavService} from "src/app/services/nav/nav.service";
import {AuthService} from "src/app/services/auth/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {TipOfTheDayService} from "src/app/services/tip-of-the-day/tip-of-the-day.service";
import {NPApiService} from "src/@generated/np-api.service";

@Component({
  selector: 'pbj-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss']
})
export class StartPage implements OnInit {
  readonly #authService = inject(AuthService);
  readonly #translate = inject(TranslateService);
  readonly #api = inject(NPApiService);
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
    console.log('go online', data);
    const album = await this.#api.album({id: '00634a9b-9167-4e83-b3e0-51139d344df9'}).toPromise()
                            .catch(reason => console.log(reason))
    console.log(album);
    await this.#authService.login('admin', 'admin');
    console.log('check was not successful => go settings',);
    const album2 = await this.#api.album({id: '00634a9b-9167-4e83-b3e0-51139d344df9'}).toPromise()
                             .catch(reason => console.log(reason))
    console.log(album2);
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
