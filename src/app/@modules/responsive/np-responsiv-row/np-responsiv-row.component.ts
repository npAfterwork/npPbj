import {NgForOf, NgTemplateOutlet} from "@angular/common";
import {Component, inject, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Subscription} from "rxjs/internal/Subscription";
import {NPBaseDataSource} from "../../../@datasources/albums.datasource";
import {NPResponsiveService, TBreakpoint} from "../np-responsive.service";

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
    @Input() items: T[] | NPBaseDataSource<T> = [];
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
    #subscription = new Subscription();

    ngOnInit() {
        this.#subscription.add(this.#responsivService.state$.subscribe(() => {
            this.#filterItems();
        }));
        if (this.items instanceof NPBaseDataSource) {
            this.#subscription.add(
                this.items.initialize().onData$.subscribe(items => {
                    this.#allItems = [...items];
                    this.#filterItems();
                }));
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
