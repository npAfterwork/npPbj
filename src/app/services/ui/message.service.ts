import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private toast: HTMLIonToastElement;

  constructor(
    private readonly toastController: ToastController
  ) {
  }

  private closeLast() {
    if (this.toast) {
      this.toast.dismiss().catch(e => console.error(e));
    }
  }

  private async presetToast(text: string) {
    this.closeLast();
    this.toast = await this.toastController.create({
      message:  text,
      duration: 2000,
      position: 'top'
    });
    return this.toast.present();
  }

  message(text: string) {
    this.presetToast(text).catch(e => console.error(e));
  }

  error(newtext: string) {
    this.presetToast(newtext).catch(e => console.error(e));
  }

}
