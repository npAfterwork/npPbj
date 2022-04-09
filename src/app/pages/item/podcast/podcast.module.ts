import {ComponentsModule} from '../../../components/components.module';
import {PipesModule} from '../../../pipes/pipes.module';
import {PodcastPage} from './podcast.page';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

const routes: Routes = [
  {
    path:      '',
    component: PodcastPage
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
  declarations: [PodcastPage]
})
export class PodcastPageModule {}
