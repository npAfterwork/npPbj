import {Pbj} from '../../model/model';
import {Utils} from '../../model/utils';
import {PopoverService} from '../../popover/popover.service';
import {DataService} from '../../services/data/data.service';
import {NavService} from '../../services/nav/nav.service';
import {PlayerService} from '../../services/player/player.service';
import {Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import ItemEventEmitter = Pbj.ItemEventEmitter;

@Component({
  selector:    'pbj-view-content',
  templateUrl: './view-content.component.html',
  styleUrls:   ['./view-content.component.scss']
})
export class ViewContentComponent implements OnChanges {
  info: { endline: any; infoline: string; name: string; subline: string; typeinfo: string };

  @Input() item: Pbj.Base;
  @Input() size = 512;
  hasPlay = false;
  hasMore = false;
  @Output() more: ItemEventEmitter = new EventEmitter<{ ev: MouseEvent; item: Pbj.Base }>();
  @Output() play: ItemEventEmitter = new EventEmitter<{ ev: MouseEvent; item: Pbj.Base }>();

  constructor(
    private readonly dataService: DataService,
    private readonly popoverService: PopoverService,
    private readonly elRef: ElementRef,
    public readonly navService: NavService,
    public readonly player: PlayerService
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.hasPlay = !!this.play.observers.length;
    this.hasMore = !!this.more.observers.length;
    if (changes.item && this.item) {
      this.info = Utils.getItemInfoFromBase(this.item, 'cover');
      this.setBorderRadiusAndImageUrl();
    }
    if (!this.item) {
      this.clearBorderRadiusAndImageUrl();
    }
  }

  private setBorderRadiusAndImageUrl() {
    const border_radius = (this.item.item_type === 'artist') ? '50%' : '0%';
    this.elRef.nativeElement.style.setProperty('--pbj-list-item-image-border-radius', border_radius);
    this.elRef.nativeElement.style.setProperty('--pbj-artist-image-url',
      `url(${this.dataService.getImageUrl(Utils.getImageIdFromBase(this.item), this.size)})`);
  }

  private clearBorderRadiusAndImageUrl() {
    this.elRef.nativeElement.style.setProperty('--pbj-list-item-image-border-radius', null);
    this.elRef.nativeElement.style.setProperty('--pbj-artist-image-url', null);
  }

  openImagePopup() {
    this.popoverService.presentPopoverAsync('image', { item: this.item }).catch(e => console.error(e));
  }
}
