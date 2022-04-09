import {ComponentsModule} from '../../components/components.module';
import {ListPage} from './list.page';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

const routes: Routes = [
  {
    path:      '',
    component: ListPage
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
  declarations: [ListPage]
})
export class ListPageModule {}
