import {inject, Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NPToastService {
  readonly #toastController = inject(ToastController);

  #toast: HTMLIonToastElement;

  message(text: string) {
    this.#presetToast(text).catch(e => console.error(e));
  }

  error(newtext: string) {
    this.#presetToast(newtext).catch(e => console.error(e));
  }

  #closeLast() {
    if (this.#toast) {
      this.#toast.dismiss().catch(e => console.error(e));
    }
  }

  async #presetToast(text: string) {
    this.#closeLast();
    this.#toast = await this.#toastController.create({
      message: text,
      duration: 2000,
      position: 'top'
    });
    return this.#toast.present();
  }
}
