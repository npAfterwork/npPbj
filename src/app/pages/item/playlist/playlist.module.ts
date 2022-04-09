import {ComponentsModule} from '../../../components/components.module';
import {PlaylistPage} from './playlist.page';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

const routes: Routes = [
  {
    path:      '',
    component: PlaylistPage
  }
];

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlaylistPage]
})
export class PlaylistPageModule {}
