import {Pbj} from '../../model/model';
import {Utils} from '../../model/utils';
import {NavService} from '../../services/nav/nav.service';
import {UiService} from '../../services/ui/ui.service';
import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {IonVirtualScroll, Platform} from '@ionic/angular';
import {HeaderFn} from '@ionic/core';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector:    'pbj-virtual-list',
  templateUrl: './virtual-list.component.html',
  styleUrls:   ['./virtual-list.component.scss']
})
export class VirtualListComponent implements OnInit, OnDestroy {
  @ViewChild('vscroll', { static: true }) private readonly vscroll: IonVirtualScroll;
  @Input() mode: Pbj.ListItemImageMode = 'item';
  @Input() title = '';

  private _itemSize: Pbj.ListItemSize;
  get itemSize(): Pbj.ListItemSize {
    return this._itemSize;
  }

  @Input() set itemSize(value: Pbj.ListItemSize) {
    this._itemSize = value;
    this.updateListItemSize();
    this.updateItems();
  }

  private _panel = false;
  @Input() set panel(value: boolean) {
    this._panel = value;
    this.updateListItemSize();
    this.updateItems();
  }

  get panel(): boolean {
    return this._panel;
  }

  private _items: (Pbj.Base | Pbj.Base[])[];
  @Input()
  set items(items: (Pbj.Base | Pbj.Base[])[]) {
    console.log('items in list will change !!!!!!!!!', items ? items.length : 0);
    if (items) {
      this._items = items;
      console.log('items in list changed !!!!!!!!!!!!!!', this._items.length);
      this.updateItems();
    }
  }

  get items(): (Pbj.Base | Pbj.Base[])[] {
    return this._items;
  }

  @Input() headerfn: HeaderFn;

  @Output() more: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }> = new EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>();
  @Output() play: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }> = new EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>();

  private resizeSub: Subscription;
  panelSize: { count: number; width: number; base: number; height: number } = { count: 0, width: 0, base: 0, height: 0 };

  constructor(
    public readonly navService: NavService,
    public readonly uiService: UiService,
    private readonly elRef: ElementRef,
    private readonly platform: Platform
  ) {
  }

  ngOnInit(): void {
    this.updateListItemSize();
    this.resizeSub = this.platform.resize.asObservable().subscribe(() => {
      const current = this.getBestPanelCount();
      console.log(current);
      if ((current.count !== this.panelSize.count) || (current.width !== this.panelSize.width)) {
        this.panelSize = current;
        this.updateListItemSize();
        this.updateItems();
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeSub.unsubscribe();
  }

  /**
   * Strategy:
   * Item-Size: small medium large
   * Min-Panel-Count: small 3, medium 2, large 1
   * Panel-Width: min-count must fit -> after this use the highest possible width + count
   * List-Width: 100%
   * List-Heights: 48, 75, 150
   * Panel-Heights: 280, 320, 360
   */
  private getBestPanelCount() {
    let width = -1;
    let height = -1;
    switch (this.itemSize) {
      case 'small':
        width = this.panel ? 106 : -1;
        height = this.panel ? 156 : 48;
        break;
      case 'medium':
        width = this.panel ? 160 : -1;
        height = this.panel ? 210 : 75;
        break;
      case 'large':
        width = this.panel ? 210 : -1;
        height = this.panel ? 260 : 150;
        break;
    }
    let base = width;
    const pwidth = this.platform.width();
    const minCount = this.itemSize === 'large' ? 2 : (this.itemSize === 'medium' ? 2 : 3);

    const count = Math.max(Math.trunc(pwidth / width), minCount);
    width = Math.trunc(pwidth / (count <= minCount ? minCount : count));
    base = Math.min(width, base);
    return { count, width, base, height };
  }

  /**
   * Strategy:
   * Item-Size: small medium large
   * Min-Panel-Count: small 3, medium 2, large 1
   * Panel-Width: min-count must fit -> after this use the highest possible width + count
   * Panel-Heights: 280, 320, 360
   * List-Width: 100%
   * List-Heights: 48, 75, 150
   */
  private updateListItemSize() {
    this.panelSize = this.getBestPanelCount();
    this.elRef.nativeElement.style.setProperty('--pbj-list-item-height', `${this.panelSize.height}px`);
    this.elRef.nativeElement.style.setProperty('--pbj-list-item-width', `${this.panelSize.width}px`);
    this.elRef.nativeElement.style.setProperty('--pbj-list-item-base-size', `${this.panelSize.base}px`);
  }

  updateItems() {
    if (this.items && this.items.length) {
      if (this.panel) {
        if (Array.isArray(this._items[0])) {
          this._items = Utils.unGroupBy(this.items as Pbj.Base[][]);
        }
        this._items = Utils.groupBy(this.items as Pbj.Base[], this.panelSize.count);
      } else {
        this._items = !Array.isArray(this._items[0])
          ? [...this.items]
          : Utils.unGroupBy(this.items as Pbj.Base[][]);
      }
      this.vscroll.checkRange(0);
      // tslint:disable-next-line
      //      const event: any = (new window['Event']('resize') as any);
      //      window.dispatchEvent(event);
    }
  }

}
