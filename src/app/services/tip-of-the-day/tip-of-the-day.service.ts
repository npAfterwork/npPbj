import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {TranslateService} from "@ngx-translate/core";
import {StorageService} from "src/app/services/storage/storage.service";

interface TipOfTheDayStore {
  lastTipsOfTheDay: number[];
}

@Injectable({providedIn: 'root'})
export class TipOfTheDayService {
  static TIPS_TEXT_ID: string;
  static STORAGE_KEY: string;

  readonly #translate = inject(TranslateService);
  readonly #storage = inject(StorageService);

  #tipOfTheDay = {
    all: [],
    current: -1,
    store: new BehaviorSubject<string>(null)
  };

  readonly tip$ = this.#tipOfTheDay.store.asObservable();
  #store: TipOfTheDayStore;


  async initialize(storageKey = 'pbj.tips', translateKey = 'TIPS') {
    TipOfTheDayService.STORAGE_KEY = storageKey;
    TipOfTheDayService.TIPS_TEXT_ID = translateKey;

    this.#store = await this.#storage.get<TipOfTheDayStore>(TipOfTheDayService.STORAGE_KEY, {lastTipsOfTheDay: []});
    this.#tipOfTheDay.all = await this.#translate.get(TipOfTheDayService.TIPS_TEXT_ID).toPromise();
    this.#tipOfTheDay.current = Math.trunc(Math.random() * this.#tipOfTheDay.all.length);
  }

  async next() {
    while (this.#store.lastTipsOfTheDay.indexOf(this.#tipOfTheDay.current) !== -1) {
      this.#tipOfTheDay.current = Math.trunc(Math.random() * this.#tipOfTheDay.all.length);
    }
    if (this.#store.lastTipsOfTheDay.length >= this.#tipOfTheDay.all.length / 2) {
      this.#store.lastTipsOfTheDay.shift();
    }
    this.#store.lastTipsOfTheDay.push(this.#tipOfTheDay.current);
    await this.#storage.set(TipOfTheDayService.STORAGE_KEY, this.#store);
    this.#tipOfTheDay.store.next(this.#tipOfTheDay.all[this.#tipOfTheDay.current]);

  }
}
