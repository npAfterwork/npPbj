import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {NPImageCardComponent} from "src/app/components/np-image-card/np-image-card.component";
import {NPVirtualListComponent} from "src/app/components/np-virtual-list/np-virtual-list.component";
import {NPResponsivRowComponent} from "../../@modules/responsive/np-responsiv-row/np-responsiv-row.component";
import {NPResponsiveGridComponent} from "../../@modules/responsive/np-responsive-grid/np-responsive-grid.component";

import {CategoryPageRoutingModule} from './category-page-routing.module';
import {CategoryPage} from './category-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    NPVirtualListComponent,
    NgOptimizedImage,
    NPImageCardComponent,
    NPResponsivRowComponent,
    NPResponsiveGridComponent
  ],
  declarations: [CategoryPage]
})
export class CategoryPageModule {
}
