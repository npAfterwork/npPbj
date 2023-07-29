import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {NPImageCardComponent} from "src/app/@modules/components/np-image-card/np-image-card.component";
import {NPVirtualListComponent} from "src/app/@modules/components/np-virtual-list/np-virtual-list.component";

import {HomePageRoutingModule} from './home-routing.module';
import {HomePage} from './home.page';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        NPVirtualListComponent,
        NgOptimizedImage,
        NPImageCardComponent
    ],
    declarations: [HomePage]
})
export class HomePageModule {
}
