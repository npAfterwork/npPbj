import {DataSource, ListRange} from "@angular/cdk/collections";
import {NgForOf, NgTemplateOutlet} from "@angular/common";
import {Component, inject, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Subject} from "rxjs";
import {Subscription} from "rxjs/internal/Subscription";
import {NPResponsiveService, TBreakpoint} from "../../responsive/np-responsive.service";

@Component({
  selector: 'np-responsiv-row',
  standalone: true,
  templateUrl: './np-responsiv-row.component.html',
  styleUrls: ['./np-responsiv-row.component.scss'],
  imports: [
    IonicModule,
    NgForOf,
    NgTemplateOutlet
  ]
})
export class NPResponsivRowComponent<T> implements OnInit, OnDestroy {
  @Input() items: T[] | DataSource<T> = [];
  @Input() itemTemplate: TemplateRef<any>;
  @Input() config: Record<TBreakpoint, number> = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  }

  current: T[] = [];
  #allItems: T[] = [];

  readonly #responsivService = inject(NPResponsiveService);
  #subscription: Subscription;

  ngOnInit() {
    this.#subscription = this.#responsivService.state$.subscribe(() => {
      this.#filterItems();
    })
    if (this.items instanceof DataSource) {
      const collectionViewer = {viewChange: new Subject<ListRange>()};
      this.items.connect(collectionViewer).subscribe(items => {
        this.#allItems = [...items];
        this.#filterItems();
        (this.items as DataSource<any>).disconnect(collectionViewer);
      });
      let max = -1;
      for (const breakPoint in this.config) {
        max = Math.max(max, this.config[breakPoint]);
      }
      collectionViewer.viewChange.next({start: 0, end: max});
    } else {
      this.#allItems = this.items;
      this.#filterItems();
    }
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }

  #filterItems() {
    const state = this.#responsivService.getState();
    this.current = this.#allItems.filter((_, idx) => idx < this.config[state]);
  }
}
