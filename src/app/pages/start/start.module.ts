import {ComponentsModule} from '../../components/components.module';
import {StartPage} from './start.page';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path:      '',
    component: StartPage
  }
];

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ComponentsModule
  ],
  declarations: [StartPage]
})
export class StartPageModule {}
