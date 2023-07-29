import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {inject} from "@angular/core";
import {from, Observable, switchMap} from "rxjs";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Subscription} from "rxjs/internal/Subscription";
import {AlbumDetailFragment, AlbumsGQL} from "src/@generated/np-api.service";

export abstract class NPBaseDataSource<T> extends DataSource<T> {
  private pageSize = 10;
  #cachedData: T[] = [];
  #dataSource = new BehaviorSubject<T[]>(this.#cachedData);
  #fetchedPages = new Set<number>();
  #viewerSubsciption: Subscription = new Subscription();

  abstract loadPage(page: number, pageSize: number): Observable<T[]>;

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    console.log('15:connect-now', collectionViewer);
    this.#viewerSubsciption.add(
      collectionViewer
        .viewChange
        .subscribe((range) => {
          const startPage = this.#getPageForIndex(range.start);
          const endPage = this.#getPageForIndex(range.end - 1);
          for (let page = startPage; page <= endPage; page++) {
            if (this.#fetchedPages.has(page)) {
              continue;
            }
            this.#fetchedPages.add(page);

            this.loadPage(page, this.pageSize).subscribe(newItems => {
              this.#cachedData.splice(page * this.pageSize, this.pageSize, ...newItems);
              this.#dataSource.next(this.#cachedData);
            });
          }
        }));

    return this.loadPage(0, this.pageSize).pipe(
      switchMap((items) => {
        this.#dataSource.next(items);
        return this.#dataSource;
      })
    );
  }


  #getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('28:disconnect-');

    this.#viewerSubsciption.unsubscribe();
  }
}

export class AlbumsDataSource extends NPBaseDataSource<AlbumDetailFragment> {
  #api = inject(AlbumsGQL)

  loadPage(page: number, pageSize: number): Observable<AlbumDetailFragment[]> {
    console.log('38:loadData-', page, pageSize);
    const data: AlbumDetailFragment[] = (new Array(500)).fill({}).map((_, idx) => {
      return {__typename: "AlbumQL", albumType: "album", name: 'name' + idx, artist: {__typename: "ArtistQL", id: '1'}};
    });

    console.log(data.slice(page * pageSize, (page + 1) * pageSize));
    return from([data.slice(page * pageSize, (page + 1) * pageSize + 1)]);
    // return this.#api.fetch({}).pipe(
    //   map(res => res.data.albums.items)
    // );
  }


}
