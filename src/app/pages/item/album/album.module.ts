import {ComponentsModule} from '../../../components/components.module';
import {AlbumPage} from './album.page';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

const routes: Routes = [
  {
    path:      '',
    component: AlbumPage
  }
];

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [AlbumPage]
})
export class AlbumPageModule {}
