import {Pbj} from '../../../model/model';
import {Utils} from '../../../model/utils';
import {UiService} from '../../../services/ui/ui.service';
import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Component({
  selector:    'pbj-list-item-panel',
  templateUrl: './list-item-panel.component.html',
  styleUrls:   ['./list-item-panel.component.scss']
})
export class ListItemPanelComponent {
  info = Utils.getItemInfoFromBase;
  // somehow this can be updated with single base items when switching from list to panel view
  checkItems = Array.isArray;

  @Input() size: Pbj.ListItemSize = 'small';
  @Input() mode: Pbj.ListItemImageMode = 'item';
  @Input() items: Pbj.Base[];

  @Output() navigateTo: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }> = new EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>();
  @Output() navigateToSub: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }> = new EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>();
  @Output() select: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }> = new EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>();
  @Output() play: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }> = new EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>();
  @Output() more: EventEmitter<{ item: Pbj.Base; ev: MouseEvent }> = new EventEmitter<{ item: Pbj.Base; ev: MouseEvent }>();

  @HostListener('click', ['$event'])
  onComponentClick(ev: MouseEvent) {
    ev.stopPropagation();
  }

  constructor(
    public readonly uiService: UiService
  ) { }

  preventAndEmit(ev: MouseEvent, emitter: EventEmitter<{ ev: MouseEvent; item: Pbj.Base }>, item: Pbj.Base) {
    ev.stopPropagation();
    ev.preventDefault();
    emitter.emit({ ev, item });
    return false;
  }
}
