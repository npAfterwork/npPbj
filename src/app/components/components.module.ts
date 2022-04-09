import {PipesModule} from '../pipes/pipes.module';
import {AuthSettingsBoxComponent} from './auth-settings-box/auth-settings-box.component';
import {DashboardBoxComponent} from './dashboard-box/dashboard-box.component';
import {PlayerComponent} from './player/player.component';
import {SidemenuComponent} from './sidemenu/sidemenu.component';
import {ChoosebarComponent} from './ui-bars/choosebar/choosebar.component';
import {FooterComponent} from './ui-bars/footer/footer.component';
import {ListChooserComponent} from './ui-bars/list-chooser/list-chooser.component';
import {ProgressBarComponent} from './ui-bars/progress-bar/progress-bar.component';
import {SearchbarComponent} from './ui-bars/searchbar/searchbar.component';
import {SelectionBarComponent} from './ui-bars/selectionbar/selectionbar.component';
import {ToolbarComponent} from './ui-bars/toolbar/toolbar.component';
import {ToolbeltComponent} from './ui-bars/toolbelt/toolbelt.component';
import {TypeChooserComponent} from './ui-bars/type-chooser/type-chooser.component';
import {ViewContentFabComponent} from './view-content-fab/view-content-fab.component';
import {ViewContentComponent} from './view-content/view-content.component';
import {VirtualListModule} from './virtual-list/virtual-list.module';
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
    PipesModule,
    VirtualListModule
  ],
  entryComponents: [],
  declarations:    [
    ProgressBarComponent,
    AuthSettingsBoxComponent,
    SidemenuComponent,
    ToolbarComponent,
    SearchbarComponent,
    PlayerComponent,
    ViewContentComponent,
    ViewContentFabComponent,
    FooterComponent,
    ToolbeltComponent,
    SelectionBarComponent,
    TypeChooserComponent,
    ListChooserComponent,
    ChoosebarComponent,
    DashboardBoxComponent
  ],
  exports:         [
    ProgressBarComponent,
    AuthSettingsBoxComponent,
    SidemenuComponent,
    ToolbarComponent,
    SearchbarComponent,
    PlayerComponent,
    ViewContentComponent,
    ViewContentFabComponent,
    FooterComponent,
    TypeChooserComponent,
    ListChooserComponent,
    ToolbeltComponent,
    ChoosebarComponent,
    DashboardBoxComponent,
    VirtualListModule
  ],
  providers:       []
})
export class ComponentsModule {}
