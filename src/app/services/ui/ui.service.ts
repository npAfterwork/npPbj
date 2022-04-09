import {Pbj} from '../../model/model';
import {DataService} from '../data/data.service';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private dataStore = {
    selection: new BehaviorSubject<{ [id: string]: Pbj.ItemType }>({}),
    expanded:  new BehaviorSubject<Pbj.Base>(null)
  };

  readonly selection$: Observable<string[]> = this.dataStore.selection.pipe(
    map(value => Object.keys(value))
  );

  constructor(
    private readonly dataService: DataService
  ) {
  }

  // <editor-fold desc="*** Expanded ***">

  isExpanded(item: Pbj.Base) {
    return this.dataStore.expanded.value && (this.dataStore.expanded.value.id === item.id);
  }

  expand(item: Pbj.Base) {
    this.dataStore.expanded.next(item);
  }

  clearExpanded() {
    this.dataStore.expanded.next(null);
  }

  toggleExpand(item: Pbj.Base) {
    if (this.isExpanded(item)) {
      this.clearExpanded();
    } else {
      this.expand(item);
    }
  }

  // </editor-fold>

  // <editor-fold desc="*** Selection ***">

  private selection(): { [id: string]: Pbj.ItemType } {
    return this.dataStore.selection.getValue();
  }

  selected(tracksOnly = false): string[] {
    const selection = this.selection();
    if (tracksOnly) {
      const result = [];
      for (const id in selection) {
        if (selection.hasOwnProperty(id)) {
          if (selection[id] === 'track') {
            result.push(id);
          }
        }
      }
      return result;
    }
    return Object.keys(selection);
  }

  private async select(item: Pbj.Base) {
    const selection = this.selection();
    const all = await this.dataService.getAllSelectable(item);
    all.map(sitem => selection[sitem.id] = sitem.type);
    this.dataStore.selection.next(this.dataStore.selection.getValue());
  }

  private async unselect(item: Pbj.Base) {
    const selection = this.selection();
    const all = await this.dataService.getAllSelectable(item);
    all.map(sitem => delete selection[sitem.id]);
    this.dataStore.selection.next(this.selection());
  }

  isSelected(item: Pbj.Base) {
    return !!this.selection()[item.id];
  }

  async toggleSelect(item: Pbj.Base) {
    if (this.isSelected(item)) {
      await this.unselect(item);
    } else {
      await this.select(item);
    }
  }

  clearSelection() {
    this.dataStore.selection.next({});
  }

  hasSelection(): boolean {
    return !!Object.keys(this.dataStore.selection.value).length;
  }

  // </editor-fold>

}
