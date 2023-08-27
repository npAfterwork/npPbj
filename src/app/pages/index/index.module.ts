import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {NPResponsiveGridComponent} from "../../@modules/responsive/np-responsive-grid/np-responsive-grid.component";
import {NPImageCardComponent} from "../../components/np-image-card/np-image-card.component";
import {NpNamedCardComponent} from "../../components/np-named-card/np-named-card.component";
import {NPVirtualListComponent} from "../../components/np-virtual-list/np-virtual-list.component";

import {IndexPageRoutingModule} from './index-routing.module';

import {IndexPage} from './index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexPageRoutingModule,
    NPImageCardComponent,
    NPVirtualListComponent,
    NPResponsiveGridComponent,
    NpNamedCardComponent
  ],
  declarations: [IndexPage]
})
export class IndexPageModule {
}
