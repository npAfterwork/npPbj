import {LazyImgComponent} from './lazy-img.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports:         [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  entryComponents: [],
  declarations:    [
    LazyImgComponent
  ],
  exports:         [
    LazyImgComponent
  ],
  providers:       []
})
export class LazyImgModule {}
