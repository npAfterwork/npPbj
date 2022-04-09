import {LaSpinnerComponent} from './la-spinner.component';
import {SpinnerService} from './spinner.service';
import {NgModule} from '@angular/core';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  imports:         [
    NgxSpinnerModule
  ],
  entryComponents: [],
  declarations:    [
    LaSpinnerComponent
  ],
  exports:         [
    LaSpinnerComponent
  ],
  providers:       [SpinnerService]
})
export class LaRndSpinnerModule {}
