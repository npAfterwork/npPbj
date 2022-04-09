import {Pbj} from '../../../model/model';
import {Utils} from '../../../model/utils';
import {PlayerService} from '../../../services/player/player.service';
import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector:    'pbj-list-item',
  templateUrl: './list-item.component.html',
  styleUrls:   ['./list-item.component.scss']
})
export class ListItemComponent {
  // somehow this can be updated with single base items when switching from panel to list view
  checkItems = Array.isArray;

  info: { name: string; subline: string; infoline: string; endline: string } = { name: '', subline: '', infoline: '', endline: '' };
  itemImageSize = 40; // TODO: ???
  @Input() size: Pbj.ListItemSize = 'small';
  @Input() mode: Pbj.ListItemImageMode = 'item';
  private _item: Pbj.Base;
  @Input()
  set item(value: Pbj.Base) {
    this._item = value;
    if (value) {
      this.updateItemInfo();
    }
  }

  get item(): Pbj.Base {
    return this._item;
  }

  @Output() select: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }> = new EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>();
  @Output() navigateTo: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }> = new EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>();
  @Output() navigateToSub: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }> = new EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>();
  @Output() play: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }> = new EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>();
  @Output() more: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }> = new EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>();

  constructor(
    private readonly elRef: ElementRef,
    private readonly player: PlayerService
  ) { }

  private updateItemInfo() {
    this.info = Utils.getItemInfoFromBase(this.item, this.mode);
    const border_radius = (this.item.item_type === 'artist') ? '50%' : '0%';
    this.elRef.nativeElement.style.setProperty('--pbj-list-item-image-border-radius', border_radius);

  }

  preventAndEmit(ev: MouseEvent, emitter: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>, item: Pbj.Base) {
    ev.stopPropagation();
    ev.preventDefault();
    emitter.emit({ item, ev });
    return false;
  }

}
