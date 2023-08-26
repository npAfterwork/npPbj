import {NgForOf, NgTemplateOutlet} from "@angular/common";
import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {NPBaseDataSource} from "../../../@datasources/albums.datasource";

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
  @Input() items: T[] | NPBaseDataSource<T>;
  @Input() itemTemplate: TemplateRef<any>;

  allItems: T[] = [];
  #subscription = new Subscription();

  ngOnInit() {
    if (this.items instanceof NPBaseDataSource) {
      this.#subscription.add(
        this.items.initialize().onData$.subscribe(data => this.allItems = data.filter(value => !!value))
      );
    } else {
      this.allItems = this.items;
    }
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }

}
