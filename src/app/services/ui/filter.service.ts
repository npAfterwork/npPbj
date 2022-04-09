import {Pbj} from '../../model/model';
import {Utils} from '../../model/utils';
import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filter$ = new EventEmitter<void>();
  filteredByText$ = new Subject<Pbj.Base[]>();

  filter: Pbj.Filter = {};

  // <editor-fold desc="*** List Filter ***">

  private filterItemsByLetter(items: Pbj.Base[]) {
    console.log('filter items by letter', this.filter);
    if (!this.filter.letter) { return items; }
    const regEx = this.filter.letter === '#' ? RegExp('^(?![a-z]).+', 'i') : RegExp(`^${this.filter.letter}.*`, 'i');
    return items.filter(item => regEx.test(Utils.getNameFromBase(item)));
  }

  private filterItemsByText(items: Pbj.Base[]) {
    console.log('filter items by text', this.filter);
    if (!this.filter.text) {
      this.updateCurrentLetters(items);
      return items;
    }
    const regEx = RegExp(`.*${this.filter.text}.*`, 'i');
    const filtered = items.filter(item => regEx.test(Utils.getNameFromBase(item)));
    this.updateCurrentLetters(filtered);
    return filtered;
  }

  private updateCurrentLetters(items: Pbj.Base[]) {
    this.filter.currentLetters = '';
    if (items) {
      items.forEach(item => {
        const name = Utils.getNameFromBase(item);
        if (name && name.length) {
          const letter = /[a-zA-Z]/.test(name[0]) ? name[0].toLowerCase() : '#';
          if (this.filter.currentLetters.indexOf(letter) < 0) {
            this.filter.currentLetters += letter;
          }
        }
      });
    }
  }

  filterByLetter(letter: string) {
    this.filter.letter = letter;
    this.filter$.next();
  }

  filterByText(text: string) {
    this.filter.text = text;
    this.filter$.next();
  }

  filterItems(items: Pbj.Base[], current: Pbj.Base[]) {
    this.filter.items = items;
    let filtered = this.filterItemsByText(items);
    this.filteredByText$.next(filtered);
    filtered = this.filterItemsByLetter(filtered);
    // AND  (filtered length is different to current (could be filtered if one item removed and one added)
    //   OR one of the filtered items is not found in current)
    const didFilter = ((filtered.length !== current.length)
      || !filtered.reduce((prev, item) => prev && !!current.find(current_item => current_item.id === item.id), true));
    return { didFilter, filtered, isFiltered: filtered.length !== items.length };
  }

  clearFilter() {
    this.updateCurrentLetters(this.filter.items);
    this.filter = {};
    this.filter$.next();
  }

  // </editor-fold>

  // <editor-fold desc="*** RootFilter ***">

  updateRootFilter(current: (Pbj.Root & { enabled: boolean })[]) {
    this.filter.rootFolderIds = current.filter(root => root.enabled)
      .map(root => root.id);
    this.filter$.next();
  }

  applyRootFilter(roots: Pbj.Root[]): (Pbj.Root & { enabled: boolean })[] {
    return roots.map(root => {
      const newRoot = root as (Pbj.Root & { enabled: boolean });
      newRoot.enabled = this.hasRootFilter() && this.getRootFilter().indexOf(root.id) > -1;
      return newRoot;
    });
  }

  hasRootFilter() {
    return !!this.filter.rootFolderIds && !!this.filter.rootFolderIds.length;
  }

  getRootFilter() {
    return this.filter.rootFolderIds;
  }

  // </editor-fold>

  hasTextFilter() {
    return this.filter.text && this.filter.text.length;
  }

  hasFilter() {
    return this.filter && (this.hasTextFilter() || this.hasRootFilter() || this.hasLetterFilter());
  }

  hasLetterFilter() {
    return this.filter && !!this.filter.letter;
  }
}
