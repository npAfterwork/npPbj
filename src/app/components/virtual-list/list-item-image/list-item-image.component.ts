import {Pbj} from '../../../model/model';
import {Utils} from '../../../model/utils';
import {DataService} from '../../../services/data/data.service';
import {UiService} from '../../../services/ui/ui.service';
import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-list-item-image',
  templateUrl: './list-item-image.component.html',
  styleUrls:   ['./list-item-image.component.scss']
})
export class ListItemImageComponent implements OnInit {
  imageUrl: string;
  imageReady = false;
  private _item: Pbj.Base;
  private _url: string;
  private _id: string;

  @Input()
  set item(value: Pbj.Base) {
    this._item = value;

    this._id = Utils.getImageIdFromBase(this._item);
    this.imageUrl = this.dataService.getImageUrl(this._id, Math.max(150, this.size));
    this.imageReady = true;
  }

  get item(): Pbj.Base {
    return this._item;
  }

  @Input()
  set url(value: string) {
    this._url = value;
    this.imageUrl = value;
    console.log(this.imageUrl, 'image url');
    this.imageReady = true;
    //    this.addIO();
  }

  get url() {
    return this._url;
  }

  private _size = 40;
  @Input()
  set size(value: number) {
    this._size = value;
  }

  get size() {
    return this._size;
  }

  @Input() mode: Pbj.ListItemImageMode = 'item';

  constructor(
    private readonly dataService: DataService,
    private readonly uiService: UiService,
    private readonly elRef: ElementRef
  ) {

  }

  ngOnInit(): void {
    const border_radius = (this.item.item_type === 'artist') ? '50%' : '0%';
    this.elRef.nativeElement.style.setProperty('--pbj-list-item-image-border-radius', border_radius);

  }

}
