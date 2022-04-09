import {Pbj} from '../model/model';
import {AZPopoverComponent} from './a-z-popover/a-z-popover.component';
import {DashBoxPopoverComponent} from './dashboardbox-popover/dashbox-popover.component';
import {ExtendedMenuPopoverComponent} from './extended-menu-popover/extended-menu-popover.component';
import {HelpPopoverComponent} from './help-popover/help-popover.component';
import {ImagePopoverComponent} from './image-popover/image-popover.component';
import {ListSettingsPopoverComponent} from './list-settings-popover/list-settings-popover.component';
import {RootFilterPopoverComponent} from './root-filter-popover/root-filter-popover.component';
import {ActionSheetOptions, AlertOptions, OverlayEventDetail} from '@ionic/core';
import {ActionSheetController, AlertController, ModalController, PopoverController} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {
  // For now we pass the popoverService by navParams
  private css: { [key in (Pbj.PopoverType & Pbj.ModalType)]?: string } = {
    az:    'pbj-a-z-popover',
    image: 'pbj-a-z-popover'
  };

  // this prevents us from injecting the popover service into the components.. -> injection via navParam works
  private components: { [key in Pbj.PopoverType & Pbj.ModalType]: Function } = {
    help:       HelpPopoverComponent,
    root:       RootFilterPopoverComponent,
    az:         AZPopoverComponent,
    dash:       DashBoxPopoverComponent,
    menu:       ExtendedMenuPopoverComponent,
    image:      ImagePopoverComponent,
    listconfig: ListSettingsPopoverComponent
  };

  constructor(
    private readonly modalController: ModalController, // complex
    private readonly popoverController: PopoverController, // overflow actions
    private readonly alertController: AlertController, // small prompts and inputs
    private readonly actionSheetController: ActionSheetController // multiple choice
  ) { }

  // <editor-fold desc="*** Popups & Modals ***">

  async presentPopoverSync(type: Pbj.PopoverType, params: any, ev?: MouseEvent): Promise<OverlayEventDetail> {
    const popover = await this.presentPopoverAsync(type, params, ev);
    return popover.onWillDismiss();
    //    return popover.onDidDismiss();
  }

  async presentPopoverAsync(type: Pbj.PopoverType, params: any, ev?: MouseEvent): Promise<HTMLIonPopoverElement> {
    params.popoverService = this;
    const popover = await this.popoverController.create({
      component:      this.components[type],
      event:          ev,
      cssClass:       this.css[type],
      translucent:    true,
      componentProps: params
    });
    await popover.present();
    return popover;
  }

  async presentModalSync(type: Pbj.ModalType, params: any): Promise<OverlayEventDetail> {
    const modal = await this.presentModalAsync(type, params);
    return modal.onWillDismiss();
    //    return modal.onDidDismiss();
  }

  async presentModalAsync(type: Pbj.ModalType, params: any): Promise<HTMLIonModalElement> {
    params.popoverService = this;
    const modal = await this.modalController.create({
      component:      this.components[type],
      cssClass:       this.css[type],
      componentProps: params
    });
    await modal.present();
    return modal;
  }

  async hasModal() {
    return !!(await this.modalController.getTop());
  }

  async closeCurrent(data?: any, role?: string) {
    const popover = await this.popoverController.getTop();
    if (popover) {
      await popover.dismiss(data, role);
    } else {
      const modal = await this.modalController.getTop();
      if (modal) {
        await modal.dismiss(data, role);
      }
    }
  }

  // </editor-fold>

  // ########################################################## TODO

  // <editor-fold desc="*** Alert ***">
  async presentActionSheet(options: ActionSheetOptions) {
    const actionSheet = await this.actionSheetController.create(options);
    await actionSheet.present();
    return actionSheet;
  }

  async presentAlert(options: AlertOptions) {
    const alert = await this.alertController.create(options);
    await alert.present();
    return alert;
  }

  async presentConfirm(message: string, okayText = 'Okay', cancelText = 'Cancel') {
    const alert = await this.presentAlert({
      header:  message,
      inputs:  [],
      buttons: [
        { text: cancelText, role: 'cancel', cssClass: 'secondary' },
        { text: okayText }
      ]
    });
    const confirmData = await alert.onDidDismiss();
    return (confirmData.role !== 'cancel');
  }

  // </editor-fold>

  // <editor-fold desc="*** ActionSheet ***">

  async presentChoice(header: string, choices: Pbj.Choice[], hasCancel = true) {
    let result = null;
    const buttons = choices.map(choice => ({
      text:    choice.text,
      role:    'destructive',
      icon:    choice.icon,
      handler: () => {result = choice.value; }
    }));
    if (hasCancel) {
      buttons.push({
        text:    'Cancel',
        role:    'cancel',
        icon:    'close-sharp',
        handler: null
      });
    }

    const actionSheet = await this.presentAlert({
      header,
      buttons
    });
    await actionSheet.present();
    await actionSheet.onDidDismiss();
    return result;
  }

  // </editor-fold>

  async presentActionSheetd() {
    let result = null;
    const actionSheet = await this.presentActionSheet(
      {
        header:  'Albums',
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            icon: 'trash'
          },
          {
            text: 'Share',
            icon: 'share'
          },
          {
            text:    'Play (open modal)',
            icon:    'arrow-dropright-circle',
            handler: () => {
              console.log('Play clicked');
            }
          },
          {
            text:    'Favorite',
            icon:    'heart',
            handler: () => {
              console.log('Favorite clicked');
              return result = 'fav';
            }
          },
          {
            text:    'Cancel',
            icon:    'close',
            role:    'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }]
      });

    const data = await actionSheet.onDidDismiss();
    console.log(data, 'choice', result);
    return 'choice';
  }

  async presentNewPlaylistPrompt() {
    const alert = await this.presentAlert(
      {
        header:  'New Playlist!',
        inputs:  [
          {
            name:        'name',
            type:        'text',
            placeholder: 'Playlistname'
          }
        ],
        buttons: [
          {
            text:     'Cancel',
            role:     'cancel',
            cssClass: 'secondary',
            handler:  () => {
              console.log('Confirm Cancel');
            }
          },
          {
            text:    'Creste',
            handler: () => {
              console.log('Confirm Ok');
            }
          }
        ]
      });
    const playlistData = await alert.onDidDismiss();
    console.log('Closed New Playlist', playlistData, playlistData.data.values.name);
    return playlistData.data.values.name;
  }

}

//
// async createNewPodcast() {
//  const isCustom = await this.popoverService.presentChoice('Add podcast', [
//                                                             { text: 'Add new podcast from url', value: true },
//                                                             { text: 'Add new podcast from sugestion', value: false }
//                                                           ]
//  );
//  if (isCustom !== null) {
//    const url = isCustom
//      ? await this.presentNewPodcastPrompt()
//      : await this.presentNewPodcastFromSugestionPrompt();
//    if (url) {
//      await this.dataService.createPodcast(url);
//      console.log('podcast created and all reloaded');
//    }
//  }
// }
//
//  async openRootFilter() {
//    const roots = await this.dataService.getIndex<Pbj.Root>('root');
//    return this.popoverService.presentPopoverSync('root', { roots: this.filterService.applyRootFilter(roots) });
//  }
//  async presentSelectionPopover() {
//    //    return this.popoverService.presentModal('');
//  }
//  async presentMoreSelectionOptions() {
//    //    return this.popoverService.presentModal();
//  }
//  // </editor-fold>
//  async presentConfirm(message: string, okayText?: string, cancelText?: string) {
//    return this.popoverService.presentConfirm(message, okayText, cancelText);
//  }
//  message(text: string) {
//    return this.popoverService.presetToast(text);
//  }
//  error(newtext: string, error1: string, param3: { timeOut: number }) {
//    return this.popoverService.presetToast(newtext);
//  }
//  async presentNewPodcastPrompt() {
//    const alert = await this.popoverService.presentAlert(
//      {
//        header:  'New Podcast!',
//        inputs:  [
//          { name: 'name', type: 'text', placeholder: 'Podcast Url', value: this.dataStore.lastInput }
//        ],
//        buttons: [
//          { text: 'Cancel', handler: () => { console.log('Confirm Cancel'); }, role: 'cancel', cssClass: 'secondary' },
//          { text: 'Create', handler: () => { console.log('Confirm Ok'); } }
//        ]
//      });
//    const playlistData = await alert.onDidDismiss();
//    const url = playlistData.data ? playlistData.data.values.name : undefined;
//    return (playlistData.role !== 'cancel') ? this.dataStore.lastInput = url : undefined;
//  }
//  async presentNewPodcastFromSugestionPrompt() {
//    return this.popoverService.presentChoice('My Favorites ;)', CJAM_PODCASTS);
//  }
//  async presentAZPopover(currentLetters: string, onWillDismiss?: () => void) {
//    const value = await this.popoverService.presentPopoverSync('az', { currentLetters });
//    if (value.role === 'backdrop') {
//      this.filterService.filterByLetter(null);
//    }
//    if (typeof onWillDismiss === 'function') {
//      onWillDismiss();
//    }
//  }
//  async presentAddToPrompt(): Promise<string | 'queue' | 'new' | null> {
//    const playlists: Pbj.Playlist[] = await this.dataService.getIndex('playlist', []);
//  const choices: Pbj.Choice[] = playlists.map(playlist => {
//    return {
//      icon:  'add-circle-sharp' as Pbj.Icon, // TODO: Icon Playlist
//      text:  playlist.name,
//      value: playlist.id
//    };
//  });
//  choices.unshift(
//    { icon: 'add-circle-sharp', text: 'Add to queue', value: 'queue' },
//    { icon: 'add-circle-sharp', text: 'New Playlist', value: 'new' }
//  );
//  return this.popoverService.presentChoice('Add to', choices);
//  }
//  /**
//   * TODO: Mixing checkbox and input is only possible in modal...
//   */
//  async presentNewPlaylistPrompt(name_suggestion?: string) {
//    const alert = await this.popoverService.presentAlert(
//      {
//        header:  'New Playlist!',
//        inputs:  [
//          { name: 'name', type: 'text', placeholder: 'Playlist name', value: name_suggestion || 'New Playlist' }
//          //          { name: 'public', type: 'checkbox', label: 'Public', checked: false }
//        ],
//        buttons: [
//          { text: 'Cancel', handler: () => { console.log('Confirm Cancel'); }, role: 'cancel', cssClass: 'secondary' },
//          { text: 'Create', handler: () => { console.log('Confirm Ok'); } }
//        ]
//      });
//    const playlistData = await alert.onDidDismiss();
//    const name = playlistData.data ? playlistData.data.values.name : undefined;
//    return (playlistData.role !== 'cancel') ? name : undefined;
//  }
