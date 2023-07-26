import {AuthSettingsBoxComponent} from '../../components/auth-settings-box/auth-settings-box.component';
import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {NavService} from "src/app/services/nav/nav.service";
import {TipOfTheDayService} from "src/app/services/tip-of-the-day/tip-of-the-day.service";
import {NPApiService} from "src/@generated/np-api.service";
import {SessionUser} from "src/app/services/jam/model/sessionUser";

@Component({
  selector: 'pbj-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss']
})
export class StartPage implements OnInit {
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

  async goOnline(data: SessionUser) {
    console.log('go online', data);

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
