import {ComponentsModule} from '../components/components.module';
import {LazyImgModule} from '../modules/lazy-img/lazy-img.module';
import {PipesModule} from '../pipes/pipes.module';
import {AZPopoverComponent} from './a-z-popover/a-z-popover.component';
import {DashBoxPopoverComponent} from './dashboardbox-popover/dashbox-popover.component';
import {ExtendedMenuPopoverComponent} from './extended-menu-popover/extended-menu-popover.component';
import {HelpPopoverComponent} from './help-popover/help-popover.component';
import {ImagePopoverComponent} from './image-popover/image-popover.component';
import {ListSettingsPopoverComponent} from './list-settings-popover/list-settings-popover.component';
import {PopoverService} from './popover.service';
import {RootFilterPopoverComponent} from './root-filter-popover/root-filter-popover.component';
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
    ComponentsModule,
    PipesModule,
    LazyImgModule
  ],
  entryComponents: [
    AZPopoverComponent,
    HelpPopoverComponent,
    RootFilterPopoverComponent,
    ExtendedMenuPopoverComponent,
    DashBoxPopoverComponent,
    ImagePopoverComponent,
    ListSettingsPopoverComponent
  ],
  declarations:    [
    AZPopoverComponent,
    HelpPopoverComponent,
    RootFilterPopoverComponent,
    ExtendedMenuPopoverComponent,
    DashBoxPopoverComponent,
    ImagePopoverComponent,
    ListSettingsPopoverComponent
  ],
  exports:         [],
  providers:       [PopoverService]
})
export class PopoverModule {}
