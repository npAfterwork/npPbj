import {LazyImgModule} from '../../modules/lazy-img/lazy-img.module';
import {PipesModule} from '../../pipes/pipes.module';
import {ListHorizComponent} from './list-horiz/list-horiz.component';
import {ListItemImageComponent} from './list-item-image/list-item-image.component';
import {ListItemPanelComponent} from './list-item-panel/list-item-panel.component';
import {ListItemComponent} from './list-item/list-item.component';
import {VirtualListComponent} from './virtual-list.component';
import {TranslateModule} from '@ngx-translate/core';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports:         [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LazyImgModule,
    PipesModule
  ],
  entryComponents: [],
  declarations:    [
    ListItemComponent,
    ListItemImageComponent,
    VirtualListComponent,
    ListItemPanelComponent,
    ListHorizComponent
  ],
  exports:         [
    VirtualListComponent,
    ListItemImageComponent,
    ListItemPanelComponent,
    ListItemComponent,
    ListHorizComponent
  ],
  providers:       []
})
export class VirtualListModule {}
