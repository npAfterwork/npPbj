import {Component, OnInit, ViewChild} from '@angular/core';
import {TipOfTheDayService} from "src/app/@modules/tip-of-the-day/tip-of-the-day.service";
import {SessionUser} from "src/app/services/jam/model/sessionUser";
import {NavService} from "src/app/services/nav/nav.service";
import {AuthSettingsBoxComponent} from '../../components/auth-settings-box/auth-settings-box.component';

@Component({
  selector: 'pbj-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss']
})
export class StartPage implements OnInit {
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

}
