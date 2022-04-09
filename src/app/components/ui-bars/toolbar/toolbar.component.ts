import {CPBJ} from '../../../model/consts';
import {Pbj} from '../../../model/model';
import {NavService} from '../../../services/nav/nav.service';
import {FilterService} from '../../../services/ui/filter.service';
import {SearchbarComponent} from '../searchbar/searchbar.component';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector:    'pbj-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls:   ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy, OnInit {
  @ViewChild('searchBar') searchBar: SearchbarComponent;
  @Input() back = false;
  @Input() text = CPBJ.CLIENT;
  @Input() search = false;

  @Output() more: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() add: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  buttons_end: Pbj.ToolbarUIButton[] = [
    { id: 'search', icon: { name: 'search-sharp' }, onClick: () => this.searchbar() },
    { id: 'clear_filter', icon: { name: 'close-sharp' }, onClick: () => this.clearFilter() },
    { id: 'more', icon: { name: 'ellipsis-horizontal-sharp' }, onClick: ev => this.more.emit(ev) },
    { id: 'add', icon: { name: 'add-sharp' }, onClick: ev => this.add.emit(ev) }
    //    this.toolbar.button('help', btn_size),
    //    this.toolbar.button('add', btn_size),
    //    this.toolbar.button('refresh', btn_size),
  ];

  bars = {
    standard: true,
    search:   false
  };

  constructor(
    public readonly navService: NavService,
    private readonly filterService: FilterService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  private searchbar() {
    if (this.search) {
      this.bars.search = true;
      this.bars.standard = false;
      this.searchBar.setFocus().catch(e => console.error(e));
    }
  }

  private standardbar() {
    this.bars.search = false;
    this.bars.standard = true;

  }

  private clearFilter() {
    // close search bar if filter is clear already -> first click clear -> second click close
    if (this.filterService.hasFilter()) {
      if (!this.filterService.hasTextFilter()) {
        this.standardbar();
      }
      this.filterService.clearFilter();
    } else {
      this.standardbar();
    }
  }

  isEnabled(id: Pbj.ToolbarButton) {
    switch (id) {
      case 'search':
        return this.bars.standard && this.search;
      case 'more':
        return this.bars.standard && !!this.more.observers.length;
      case 'add':
        return this.bars.standard && !!this.add.observers.length;
      case 'clear_filter':
        return this.bars.search || this.filterService.hasFilter();
      case 'help':
      case 'refresh':
      default:
        return false;
    }
  }

  color(id: Pbj.ToolbarButton): 'secondary' | 'primary' {
    switch (id) {
      case 'clear_filter':
        return this.filterService.hasFilter() ? 'secondary' : 'primary';
      case 'search':
      case 'help':
      case 'refresh':
      case 'more':
      default:
        return 'primary';
    }
  }

}
