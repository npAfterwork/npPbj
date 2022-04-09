import {CPBJTexts} from '../../model/consts';
import {Pbj} from '../../model/model';
import {Utils} from '../../model/utils';
import {DataService} from '../../services/data/data.service';
import {NavService} from '../../services/nav/nav.service';
import {PbjBasePage} from '../pbj-base-page';
import {IonSearchbar} from '@ionic/angular';
import {Component, ViewChild} from '@angular/core';

@Component({
  selector:    'pbj-search',
  templateUrl: './search.page.html',
  styleUrls:   ['./search.page.scss']
})
export class SearchPage extends PbjBasePage {

  @ViewChild('searchbar') searchbar: IonSearchbar;
  private _all: Pbj.Base[];
  items: Pbj.Base[];
  headerfn = Utils.headerFnItemType;
  type: Pbj.ItemType | 'all';
  typeChoices: { label: string; value: Pbj.ItemType | 'all' }[];

  constructor(
    navService: NavService,
    public readonly dataService: DataService
  ) {
    super(CPBJTexts.PAGES.search, navService);
  }

  async onSeachChange($event: CustomEvent<{ value: string }>) {
    const value = $event.detail.value;
    this._all = await this.dataService.searchAll(value);
    const choices: { [value: string]: Pbj.ItemType | 'all' } = { all: 'all' };
    this._all.forEach(item => choices[item.item_type] = item.item_type);
    //    console.log(this.items, choices);
    this.typeChoices = Object.values(choices).map(key => ({ label: key, value: key }));
    this.type = 'all';
    this.items = [...this._all];
  }

  onTypeChange($event: Pbj.ItemType | 'all') {
    console.log($event);
    this.items = this._all.filter(item => $event === 'all' || item.item_type === $event);
  }

}
