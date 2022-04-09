import {ComponentsModule} from '../../components/components.module';
import {PipesModule} from '../../pipes/pipes.module';
import {SettingsPage} from './settings.page';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

const routes: Routes = [
  {
    path:      '',
    component: SettingsPage
  }
];

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    PipesModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
