import {HelpEntry} from '../../model/consts';
import {SettingsService} from '../settings/settings.service';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HelpService {

  private helpEntry: HelpEntry;

  constructor(
    private readonly settings: SettingsService
  ) {
  }

  enableHelp(entry: HelpEntry) {
    console.log('enable help ?');
    if (this.settings.ui.helpMode !== 'never') {
      let doShow = (this.settings.ui.helpMode === 'always');
      if (this.settings.ui.helpMode === 'once') {
        doShow = !this.settings.intern.helpIDs.find(id => id === entry.id);
      }
      //      doShow = true; // TODO: debug
      if (doShow) {
        this.helpEntry = entry;
      }
    } else {
      console.log('help mode never so dont show help');
    }
  }

  //  async openHelp(helpEntry: HelpEntry) {
  //    this.settings.intern.helpIDs.push(helpEntry.id);
  //    await this.settings.save();
  //    return this.popoverService.presentPopoverAsync('help', { helpEntry });
  //  }

}
