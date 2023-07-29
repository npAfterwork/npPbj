import {inject, Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {firstValueFrom} from "rxjs";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {StorageService} from "src/app/@modules/storage/storage.service";

const STORAGE_KEY = 'np.lastTips';
const TRANSLATE_KEY = 'TIPS';

@Injectable({providedIn: 'root'})
export class TipOfTheDayService {
    static TIPS_TEXT_ID = TRANSLATE_KEY;
    static STORAGE_KEY = STORAGE_KEY;

    readonly #translate = inject(TranslateService);
    readonly #storage = inject(StorageService);

    #store = {
        all: [],
        current: -1,
        lastTipsOfTheDay: [] as number[],
        tipOfTheDay: new BehaviorSubject<string>(null)
    };

    readonly tipOfTheDay$ = this.#store.tipOfTheDay.asObservable();

    async initialize(storageKey = STORAGE_KEY, translateKey = TRANSLATE_KEY) {
        TipOfTheDayService.STORAGE_KEY = storageKey;
        TipOfTheDayService.TIPS_TEXT_ID = translateKey;

        this.#store.lastTipsOfTheDay = await this.#storage.get<number[]>(TipOfTheDayService.STORAGE_KEY, []);
        this.#store.all = await firstValueFrom(this.#translate.get(TipOfTheDayService.TIPS_TEXT_ID));
        this.#store.current = Math.trunc(Math.random() * this.#store.all.length);
    }

    async next() {
        const lastTipsOfTheDay = this.#store.lastTipsOfTheDay;
        while (lastTipsOfTheDay.indexOf(this.#store.current) !== -1) {
            this.#store.current = Math.trunc(Math.random() * this.#store.all.length);
        }
        if (lastTipsOfTheDay.length >= this.#store.all.length / 2) {
            lastTipsOfTheDay.shift();
        }
        lastTipsOfTheDay.push(this.#store.current);
        await this.#storage.set(TipOfTheDayService.STORAGE_KEY, lastTipsOfTheDay);
        this.#store.tipOfTheDay.next(this.#store.all[this.#store.current]);
    }
}
