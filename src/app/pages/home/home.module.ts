import {ComponentsModule} from '../../components/components.module';
import {PipesModule} from '../../pipes/pipes.module';
import {HomePageRoutingModule} from './home-routing.module';
import {HomePage} from './home.page';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
