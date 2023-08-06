import {DataSource, ListRange} from "@angular/cdk/collections";
import {NgForOf, NgTemplateOutlet} from "@angular/common";
import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Subject} from "rxjs";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'np-responsive-grid',
  standalone: true,
  templateUrl: './np-responsive-grid.component.html',
  styleUrls: ['./np-responsive-grid.component.scss'],
  imports: [
    NgTemplateOutlet,
    NgForOf
  ]
})
export class NPResponsiveGridComponent<T> implements OnInit, OnDestroy {
  @Input() items: T[] | DataSource<T>;
  @Input() itemTemplate: TemplateRef<any>;

  allItems: T[] = [];
  #subscription = new Subscription();

  ngOnInit() {
    if (this.items instanceof DataSource) {
      const collectionViewer = {viewChange: new Subject<ListRange>()};
      this.#subscription.add(this.items.connect(collectionViewer).subscribe(items => {
        this.allItems = [...items];
        (this.items as DataSource<any>).disconnect(collectionViewer);
      }));
      collectionViewer.viewChange.next({start: 0, end: 1});
    } else {
      this.allItems = this.items;
    }
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }

}
