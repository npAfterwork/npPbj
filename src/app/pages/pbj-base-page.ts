import {OnIonViewDidEnter, OnIonViewDidLeave, OnIonViewWillEnter, OnIonViewWillLeave, OnIonViewWillUnload} from '../model/model';
import {NavService} from '../services/nav/nav.service';
import {OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';

export class PbjBasePage implements OnInit, OnDestroy, OnIonViewWillEnter, OnIonViewDidLeave, OnIonViewDidEnter, OnIonViewWillLeave, OnIonViewWillUnload {
  /** Set by Ion-Content if implemented (Scroll-Top of page) */
  scrollTop = 0;
  protected url;
  protected subscriptions: Subscription[] = [];

  constructor(
    public pageName: string,
    public readonly navService: NavService
  ) {
  }

  ngOnInit() {
    this.url = this.navService.router.url;
    console.debug('8: ngOnInit', this.url);
  }

  ionViewWillEnter() {
    console.debug('25: ionViewWillEnter');
    this.url = this.navService.router.url;
    this.navService.emitter.ionViewWillEnter.emit(this.url); // reset toolbar and add components toolbar buttons
  }

  ionViewDidEnter(): void {
    console.debug('27: ionViewDidEnter');
    this.url = this.navService.router.url;
    this.navService.emitter.ionViewDidEnter.emit(this.url);
  }

  ionViewWillLeave(): void {
    console.debug('31: ionViewWillLeave');
    this.navService.emitter.ionViewWillLeave.emit(this.url);
  }

  ionViewDidLeave() {
    console.debug('21: ionViewDidLeave');
    this.navService.emitter.ionViewDidLeave.emit(this.url);
  }

  ngOnDestroy(): void {
    console.debug('11: ngOnDestroy', this.url);
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
