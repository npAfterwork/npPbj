import {ComponentsModule} from '../../../components/components.module';
import {PipesModule} from '../../../pipes/pipes.module';
import {PodcastEpisodePage} from './podcast-episode.page';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

const routes: Routes = [
  {
    path:      '',
    component: PodcastEpisodePage
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
  declarations: [PodcastEpisodePage]
})
export class PodcastEpisodePageModule {}
