import {Component, inject} from '@angular/core';
import {LaSpinnerService} from "src/app/@modules/la-rnd-spinner/la-spinner.service";
import {NPMenuService} from "./services/np-menu/np-menu.service";

@Component({
    selector: 'pbj-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    readonly spinnerService = inject(LaSpinnerService);
    readonly menuService = inject(NPMenuService);

}
