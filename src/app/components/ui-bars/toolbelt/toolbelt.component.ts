import {CPBJ} from '../../../model/consts';
import {Pbj} from '../../../model/model';
import {PopoverService} from '../../../popover/popover.service';
import {DataService} from '../../../services/data/data.service';
import {SettingsService} from '../../../services/settings/settings.service';
import {FilterService} from '../../../services/ui/filter.service';
import {UiService} from '../../../services/ui/ui.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {Platform} from '@ionic/angular';
import {AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector:    'pbj-toolbelt',
  templateUrl: './toolbelt.component.html',
  styleUrls:   ['./toolbelt.component.scss']
})
export class ToolbeltComponent implements OnChanges, AfterViewInit, OnInit, AfterContentInit {

  @Input() scrollTop = -1;
  @Input() custom = false;
  @Input() az = false;
  @Input() root = false;

  @Output() add: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() changeMode: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeSize: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeListSettings: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  private offsetY = 0;

  // alternatively also the host parameter in the @Component()` decorator can be used
  @HostBinding('class.sticky') isSticky = false;

  buttons_start: Pbj.ToolbeltUIButton[] = [];
  buttons_end: Pbj.ToolbeltUIButton[] = [
    { id: 'azpopover', icon: { name: 'apps-sharp' }, onClick: () => {  this.openAZFilter().catch(e => console.error(e)); } },
    { id: 'root', icon: { name: 'funnel-sharp' }, onClick: () => { this.openRootFilter().catch(e => console.error(e)); } },
    { id: 'add', icon: { name: 'add-sharp' }, onClick: ev => this.add.emit(ev) },
    { id: 'toggle_mode', icon: { name: 'list-sharp' }, onClick: () => this.changeMode.emit() },
    { id: 'toggle_size', icon: { name: 'resize-sharp' }, onClick: () => this.changeSize.emit() },
    { id: 'toggle_popover', icon: { name: 'settings-sharp' }, onClick: ev => this.changeListSettings.emit(ev) }
  ];
  private verySmall: boolean;
  private _subresize: Subscription;

  constructor(
    private readonly popoverService: PopoverService,
    private readonly filterService: FilterService,
    private readonly dataService: DataService,
    private readonly uiService: UiService,
    private readonly settings: SettingsService,
    private readonly el: ElementRef,
    private readonly platform: Platform
  ) {

  }

  ngOnInit(): void {
    this.resize();
    this._subresize = this.platform.resize.asObservable().subscribe(() => this.resize());
  }

  ngOnDestroy(): void {
    this._subresize.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.scrollTop && !!this.scrollTop) {
      const parentContent = (this.el.nativeElement as HTMLElement).closest('ion-content');
      this.offsetY = parentContent ? parentContent.getBoundingClientRect().top : 0;
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = this.el.nativeElement.getBoundingClientRect();
      const offset = elemRect.top - bodyRect.top;
      this.isSticky = (offset <= this.offsetY);
    }
  }

  ngAfterViewInit(): void {
    const parentContent = (this.el.nativeElement as HTMLElement).closest('ion-content');
    this.offsetY = parentContent ? parentContent.getBoundingClientRect().top : 0;
  }

  ngAfterContentInit(): void {
    //    const parentContent = (this.el.nativeElement as HTMLElement).closest('ion-content');
    //    const offsetY = parentContent ? parentContent.getBoundingClientRect().top : 0;
  }

  isEnabled(id: Pbj.ToolbeltButton) {
    const isTooSmallForAll = (this.verySmall && this.uiService.hasSelection());
    const hasModeObs = !!this.changeMode.observers.length;
    const hasSizeObs = !!this.changeSize.observers.length;
    const useListPopover = this.settings.ui.useListSettingsPopoverAlways;
    switch (id) {
      case 'azpopover':
        return this.az;
      case 'root':
        return this.root;
      case 'toggle_mode':
        return hasModeObs && !useListPopover && !isTooSmallForAll;
      case 'toggle_size':
        return hasSizeObs && !useListPopover && !isTooSmallForAll;
      case 'toggle_popover':
        return hasSizeObs && hasModeObs && (useListPopover || isTooSmallForAll);
      case 'add':
        return !!this.add.observers.length;
      default:
        return false;
    }
  }

  color(id: Pbj.ToolbeltButton): 'secondary' | 'primary' {
    switch (id) {
      case 'toggle_mode':
      case 'toggle_size':
      case 'azpopover':
        return this.filterService.hasLetterFilter() ? 'secondary' : 'primary';
      case 'root':
        return this.filterService.hasRootFilter() ? 'secondary' : 'primary';
      default:
        return 'primary';
    }
  }

  private async openAZFilter() {
    await this.popoverService.presentPopoverSync('az', {});

  }

  private async openRootFilter() {
    const roots = await this.dataService.getIndex<Pbj.Root>('root');
    await this.popoverService.presentPopoverSync('root', { roots: this.filterService.applyRootFilter(roots) });
  }

  private resize() {
    this.verySmall = this.platform.width() < CPBJ.TOOLBAR.SMALL;
    console.log('platform ', this.platform.width());
  }
}
