import {CPBJTexts} from '../../../model/consts';
import {Pbj} from '../../../model/model';
import {Utils} from '../../../model/utils';
import {PopoverService} from '../../../popover/popover.service';
import {DataService} from '../../../services/data/data.service';
import {NavService} from '../../../services/nav/nav.service';
import {PlayerService} from '../../../services/player/player.service';
import {SettingsService} from '../../../services/settings/settings.service';
import {UiService} from '../../../services/ui/ui.service';
import {PbjBaseListPage} from '../../pbj-base-list-page';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-folder',
  templateUrl: './folder.page.html',
  styleUrls:   ['./folder.page.scss']
})
export class FolderPage extends PbjBaseListPage implements OnInit {
  headerFn = Utils.headerFnItemType;
  id: string;
  folder: Pbj.Folder;
  protected actions: Pbj.PopoverAction[] = [
    { title: 'Add to queue', icon: { name: 'add-sharp' }, close: true, onClick: (ev, item) => { this.player.add(item).catch(e => console.error(e)); } },
    { title: 'Remove from queue', icon: { name: 'remove-sharp' }, close: true, onClick: (ev, item) => { this.player.remove(item).catch(e => console.error(e)); } },
    { title: 'Show folder art', icon: { name: 'images-sharp' }, close: true, onClick: (ev, item) => this.onShowImages(item) }
  ];

  constructor(
    navService: NavService,
    settings: SettingsService,
    player: PlayerService,
    popover: PopoverService,
    public readonly dataService: DataService,
    public readonly uiService: UiService,
    private route: ActivatedRoute
  ) {
    super(CPBJTexts.PAGES.folder, navService, player, popover, settings);
    this.updateListConfig(this.settings.single.folder);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log('init folder page');
    this.route.params.subscribe(async params => {
      this.id = params.id;
      this.folder = await this.dataService.getItem(params.id, 'folder', ['folder', 'track']);
    });
  }

  onShowImages(item: Pbj.Base) {
    this.popoverService.presentPopoverSync('image', {
      item
    }).catch(e => console.error(e));
  }

}
