import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {TipOfTheDayService} from "src/app/@modules/tip-of-the-day/tip-of-the-day.service";
import {SessionUser} from "src/app/services/jam/model/sessionUser";
import {NavService} from "src/app/services/nav/nav.service";
import {OnIonViewDidLeave} from "../../@core/model";
import {AuthSettingsBoxComponent} from '../../components/auth-settings-box/auth-settings-box.component';
import {NPMenuService} from "../../services/np-menu/np-menu.service";

@Component({
    selector: 'pbj-start',
    templateUrl: './start.page.html',
    styleUrls: ['./start.page.scss']
})
export class StartPage implements OnInit, OnIonViewDidLeave {
    @ViewChild('server') server: AuthSettingsBoxComponent;

    loading = false;
    readonly menuService = inject(NPMenuService);
    readonly #navService = inject(NavService);
    readonly tipOfTheDay = inject(TipOfTheDayService);


    ngOnInit() {
        this.tipOfTheDay.next().catch(e => console.error(e));
        this.menuService.hideMenu();
    }

    ionViewDidLeave(): void {
        this.menuService.showMenu();
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
        return this.#navService.navigateToHome();
    }

}
