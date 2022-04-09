import {SettingsService} from '../../services/settings/settings.service';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-settings',
  templateUrl: './settings.page.html',
  styleUrls:   ['./settings.page.scss']
})
export class SettingsPage implements OnInit, OnDestroy {

  constructor(public settings: SettingsService) { }

  ngOnInit() {
    console.log('Init Settings', this.settings);
  }

  ngOnDestroy(): void {
    console.log(this.settings.ui);
  }

  resetSettings() {
    this.settings.resetToDefault();
  }

  showSettings() {
    console.log(this.settings.all);
  }

  setCoverFit($event: CustomEvent<{ text: string; value: 'contain' | 'cover' }>) {
    console.log($event);
    // this.settings.ui.coverFit = $event.detail.value;
    // this.settings.save();
  }

  saveSettings() {
    console.log(this.settings.all);
    this.settings.save().catch(e => console.error(e));
  }
}
