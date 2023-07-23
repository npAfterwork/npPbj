import {StartPage} from './start.page';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {AuthSettingsBoxComponent} from "../../components/auth-settings-box/auth-settings-box.component";

const routes: Routes = [
  {
    path: '',
    component: StartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    AuthSettingsBoxComponent,
  ],
  declarations: [StartPage]
})
export class StartPageModule {
}
