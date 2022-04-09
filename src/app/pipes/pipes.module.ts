import {PressDirective} from '../directives/press.directive';
import {CountPipe} from './count.pipe';
import {DescriptionPipe} from './description.pipe';
import {DurationPipe} from './duration.pipe';
import {GroupByModPipe} from './group-by-mod.pipe';
import {ObjectKeysPipe} from './object-keys.pipe';
import {SizePipe} from './size.pipe';
import {TimestampPipe} from './timestamp.pipe';
import {TrackPipe} from './track.pipe';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  imports:         [
    CommonModule
  ],
  entryComponents: [],
  declarations:    [
    PressDirective, // for now ...
    DescriptionPipe,
    TimestampPipe,
    DurationPipe,
    SizePipe,
    GroupByModPipe,
    TrackPipe,
    ObjectKeysPipe,
    CountPipe
  ],
  exports:         [
    PressDirective, // ....
    DurationPipe,
    GroupByModPipe,
    DescriptionPipe,
    TimestampPipe,
    SizePipe,
    ObjectKeysPipe,
    CountPipe
  ],
  providers:       [DurationPipe, SizePipe, TrackPipe, ObjectKeysPipe, CountPipe, PressDirective]
})
export class PipesModule {}
