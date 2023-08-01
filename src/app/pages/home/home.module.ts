import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {NPImageCardComponent} from "src/app/@modules/components/np-image-card/np-image-card.component";
import {NPVirtualListComponent} from "src/app/@modules/components/np-virtual-list/np-virtual-list.component";
import {NPResponsivRowComponent} from "../../@modules/components/np-responsiv-row/np-responsiv-row.component";

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
    NPImageCardComponent,
    NPResponsivRowComponent
  ],
  declarations: [HomePage]
})
export class HomePageModule {
}
