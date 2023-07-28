import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {NPVirtualListComponent} from "src/app/@modules/np-virtual-list/np-virtual-list.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NPVirtualListComponent,
    NgOptimizedImage
  ],
  declarations: [HomePage]
})
export class HomePageModule {
}
