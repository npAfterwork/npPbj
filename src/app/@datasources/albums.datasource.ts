import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {inject} from "@angular/core";
import {map, Observable} from "rxjs";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Subscription} from "rxjs/internal/Subscription";
import {AlbumDetailFragment, AlbumsGQL} from "src/@generated/np-api.service";

export abstract class NPBaseDataSource<T> extends DataSource<T> {
  protected pageSize = 50;
  #cachedData: T[] = [];
  #dataSource = new BehaviorSubject<T[]>(this.#cachedData);
  #fetchedPages = new Set<number>();
  #subscription: Subscription = new Subscription();

  abstract loadPage(page: number): Observable<{ items: T[], total: number }>;

  initialize() {
    this.loadPage(0).subscribe((data) => this.#updatePage(0, data));
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    this.#subscription.add(
      collectionViewer
        .viewChange
        .subscribe((range) => {
          const startPage = this.#getPageForIndex(range.start);
          const endPage = this.#getPageForIndex(range.end - 1);
          for (let page = startPage; page <= endPage; page++) {
            this.#loadPageIfNeeded(page);
          }
        }));
    return this.#dataSource;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('28:disconnect-');
    this.#subscription.unsubscribe();
  }

  #loadPageIfNeeded(page: number) {
    if (this.#fetchedPages.has(page)) {
      return;
    }
    this.#fetchedPages.add(page);
    this.loadPage(page)
        .subscribe((data) => this.#updatePage(page, data));
  }

  #updatePage(page: number, data: { items: T[]; total: number }) {
    if (this.#cachedData.length !== data.total) {
      this.#cachedData = new Array(data.total)
        .fill(undefined);
      this.#cachedData.splice(0, this.#cachedData.length, ...this.#cachedData);
    }
    this.#cachedData.splice(page * this.pageSize, this.pageSize, ...data.items);
    this.#dataSource.next(this.#cachedData);
  }

  #getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }
}

export class AlbumsDataSource extends NPBaseDataSource<AlbumDetailFragment> {
  #api = inject(AlbumsGQL)

  loadPage(page: number) {
    return this.#api.fetch({skip: page * this.pageSize, take: this.pageSize}).pipe(
      map(res => ({items: res.data.albums.items, total: res.data.albums.total}))
    );
  }

}
