import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Jam} from '../../jam';
import {Pbj} from '../../model/model';
import {LazyComponent} from '../../modules/lazy-img/lazy.component';
import {PopoverService} from '../../popover/popover.service';
import {DataService} from '../../services/data/data.service';
import {NavService} from '../../services/nav/nav.service';
import {PlayerService} from '../../services/player/player.service';
import {UiService} from '../../services/ui/ui.service';

@Component({
             selector:    'pbj-dashboard-box',
             templateUrl: './dashboard-box.component.html',
             styleUrls:   ['./dashboard-box.component.scss']
           })
export class DashboardBoxComponent extends LazyComponent implements OnInit, OnDestroy, OnChanges {
  @Input() rows = 1;
  @Input() amount = 20;
  @Input() size: Pbj.ListItemSize;
  @Input() boxtype: Pbj.DashboardBoxType;

  @Input() listType?: Pbj.ListType;
  @Input() itemType?: Pbj.ItemType;
  @Input() needsUpdate?: boolean;

  // Panel Events to bubble
  @Output() play: EventEmitter<Pbj.Base> = new EventEmitter<Pbj.Base>();
  @Output() more: EventEmitter<Pbj.Base> = new EventEmitter<Pbj.Base>();

  list: Pbj.Base[];
  items: Pbj.Base[][] | Pbj.Base[];
  stats: Jam.Stats;

  constructor(
    public readonly uiService: UiService,
    public readonly navService: NavService,
    public readonly popover: PopoverService,
    public readonly player: PlayerService,
    private readonly dataService: DataService,
    private readonly elRef: ElementRef
  ) {
    super(elRef);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.needsUpdate && !changes.needsUpdate.firstChange) {
      console.log('update from changes', changes);
      this.update().catch(e => console.error(e));
    }
  }

  protected load(): void {
    this.update().catch(e => console.error(e));
  }

  async update() {
    console.log('update');
    this.needsUpdate = false; // reset update helper so next time its set to true ngOnChange does trigger again
    this.items = [];
    let all;
    switch (this.boxtype) {
      case 'list':
        all = this.list || (await this.dataService.getList(this.itemType, this.listType));
        this.items = all.filter((item, index) => index < this.amount);
        this.elRef.nativeElement.style.setProperty('--pbj-dashboard-box-rows', this.items.length);
        break;
      case 'panel':
        all = this.list || (await this.dataService.getList(this.itemType, this.listType));
        all.filter((item, index) => index < this.amount)
           .map((current, index, items) => {
             const idx = Math.floor(index / Math.ceil(items.length / this.rows));
             (!this.items[idx]) ? this.items[idx] = [current] : (this.items[idx] as Pbj.Base[]).push(current);
           });
        this.elRef.nativeElement.style.setProperty('--pbj-dashboard-box-rows', this.rows);
        break;
      case 'stats':
        this.stats = await this.dataService.getStats();
        this.elRef.nativeElement.style.setProperty('--pbj-dashboard-box-rows', 1);
        break;
    }
  }

}
