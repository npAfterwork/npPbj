import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {Pbj} from "src/app/@core/model";
import {CDEFAULT_SETTINGS} from "src/app/@core/defaults";
import {HelpEntry} from "src/app/@core/consts";

/** Storage key used for the settings */
const SETTINGS_KEY = 'pbj-settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  /** The PbjSettings object */
  private settings: Pbj.Settings = CDEFAULT_SETTINGS;

  /**
   * Use the Ionic-Storage Service to load and store the app settings
   * @param {Storage} storage
   */
  constructor(private storage: Storage) {
    console.log('SettingsService CREATE');
  }

  /**
   * Load the settings from the Storage Service
   * If settings are not set use the default settings
   * @return {Promise<void>}
   */
  async load(): Promise<void> {
    console.log('load settings');
    await this.storage.create();
    const value = await this.storage.get(SETTINGS_KEY);
    if (value) {
      console.log('settings loaded', value);
      this.settings = value;
      this.mergeDefaults();
    } else {
      this.resetToDefault();
    }
  }

  /**
   * Reset the settings to the default settings
   */
  resetToDefault() {
    this.settings = {...CDEFAULT_SETTINGS};
    this.save().catch(e => console.error(e));
  }

  /**
   * Stores the current settings in the Storage Service
   */
  save() {
    return this.storage.set(SETTINGS_KEY, this.settings);
  }

  /**
   * Check if the settings have been loaded
   */
  hasLoaded() {
    return !!this.all;
  }

  /**
   * Get all the settings
   * @return {Pbj.Settings}
   */
  get all() {
    return this.settings;
  }

  /**
   * Get the server settings
   * @return {Pbj.ServerSettings}
   */
  get server() {
    return this.settings.server;
  }

  /**
   * Get the ui settings
   * @return {Pbj.UiSettings}
   */
  get ui() {
    return this.settings.ui;
  }

  /** Get the config */
  get config() {
    return this.settings.config;
  }

  /**
   * Get the internal app settings (can not be set by user)
   * @return {Pbj.AppSettings}
   */
  get intern() {
    return this.settings.intern;
  }

  get single() {
    return this.settings.single;
  }

  get player() {
    return this.settings.player;
  }

  get queue() {
    return this.settings.queue;
  }

  /**
   * Merge two levels of properties into the current settings
   */
  private mergeDefaults() {
    for (const k in CDEFAULT_SETTINGS) {
      if (!(k in this.settings)) {
        if (CDEFAULT_SETTINGS.hasOwnProperty(k)) {
          this.settings[k] = CDEFAULT_SETTINGS[k];
        }
      } else {
        if (CDEFAULT_SETTINGS.hasOwnProperty(k)) {
          const subProp = CDEFAULT_SETTINGS[k];
          for (const j in subProp) {
            if (!(j in this.settings[k])) {
              if (subProp.hasOwnProperty(j)) {
                this.settings[k][j] = subProp[j];
              }
            }
          }
        }
      }
    }
  }

  didOpenHelpEntry(helpEntry: HelpEntry) {
    return helpEntry ? this.intern.helpIDs.find(id => id === helpEntry.id) : false;
  }
}
