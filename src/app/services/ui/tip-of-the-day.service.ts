import {SettingsService} from '../settings/settings.service';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

const TIPS_TEXT_ID = 'TIPS';

@Injectable({
  providedIn: 'root'
})
export class TipOfTheDayService {

  private tipOfTheDay = {
    all:     [],
    current: 0,
    store:   new BehaviorSubject<string>(null)
  };

  readonly tip$ = this.tipOfTheDay.store.asObservable();

  constructor(
    private readonly settings: SettingsService,
    private readonly translate: TranslateService
  ) {
    console.log('23: Tipoftheday constructor');
    this.translate.get(TIPS_TEXT_ID).subscribe(allTips => {
      this.tipOfTheDay.all = allTips;
    });
  }

  async next() {
    console.log(this.tipOfTheDay.current, 'askldfjaklsd');
    while (this.settings.intern.lastTipsOfTheDay.indexOf(this.tipOfTheDay.current) !== -1) {
      this.tipOfTheDay.current = Math.trunc(Math.random() * this.tipOfTheDay.all.length);
    }
    if (this.settings.intern.lastTipsOfTheDay.length >= this.tipOfTheDay.all.length / 2) {
      this.settings.intern.lastTipsOfTheDay.shift();
    }
    this.settings.intern.lastTipsOfTheDay.push(this.tipOfTheDay.current);
    await this.settings.save();
    this.tipOfTheDay.store.next(this.tipOfTheDay.all[this.tipOfTheDay.current]);

  }
}
