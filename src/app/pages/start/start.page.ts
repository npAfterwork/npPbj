import {AuthSettingsBoxComponent} from '../../components/auth-settings-box/auth-settings-box.component';
import {JamAuthService} from '../../jam';
import {DataService} from '../../services/data/data.service';
import {NavService} from '../../services/nav/nav.service';
import {SettingsService} from '../../services/settings/settings.service';
import {TipOfTheDayService} from '../../services/ui/tip-of-the-day.service';
import {PbjBasePage} from '../pbj-base-page';
import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector:    'pbj-start',
  templateUrl: './start.page.html',
  styleUrls:   ['./start.page.scss']
})
export class StartPage extends PbjBasePage implements OnInit {

  @ViewChild('server') server: AuthSettingsBoxComponent;

  loading = false;

  constructor(
    navService: NavService,
    private readonly settings: SettingsService,
    private readonly authService: JamAuthService,
    public readonly dataService: DataService,
    public readonly tipOfTheDay: TipOfTheDayService
  ) {
    super('', navService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.tipOfTheDay.next().catch(e => console.error(e));
  }

  ionViewWillEnter() {
    super.ionViewWillEnter();
    if (this.authService.isLoggedIn() && this.settings.server.autoSignIn) {
      console.log('auto go online in init');
      // this.goOnline();
      // this.goOnline();
    }
  }

  async goOnline() {
    this.loading = true;
    const auth = this.server.auth;
    console.log('get auth', this.authService.auth, auth);
    try {
      await this.authService.login(auth.server, auth.username, auth.password, this.settings.server.storePassword);
      console.log('login was successful => go online');
      this.dataService.offline = false;
      await this.loadInitialData();
    } catch (e) {
      console.log('check was not successful => go settings');
    }
  }

  async goOffline() {
    console.log('go offline');
    this.dataService.offline = true;
    await this.loadInitialData();
  }

  private async loadInitialData() {
    // setInterval(() => this.progress = Math.min(++this.progress, 100), 50);
    await this.dataService.load();
    await this.start();
  }

  private async start() {
    console.log('Start App');
    await this.navService.navigateToHome();
  }
}
