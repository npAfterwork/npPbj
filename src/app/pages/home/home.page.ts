import {CPBJ} from '../../model/consts';
import {Pbj} from '../../model/model';
import {PopoverService} from '../../popover/popover.service';
import {NavService} from '../../services/nav/nav.service';
import {SettingsService} from '../../services/settings/settings.service';
import {UiService} from '../../services/ui/ui.service';
import {PbjBasePage} from '../pbj-base-page';
import {Component, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-home',
  templateUrl: './home.page.html',
  styleUrls:   ['./home.page.scss']
})
export class HomePage extends PbjBasePage implements OnInit {
  boxes: Pbj.DashboardBox[] = [];
  editMode = false;
  private actions: Pbj.PopoverAction[] = [
    { title: 'At the beginning', icon: { name: 'add-sharp' }, close: true, onClick: () => { this.onAddBox(true).catch(e => console.error(e)); } },
    { title: 'At the end', icon: { name: 'add-sharp' }, close: true, onClick: () => { this.onAddBox(false).catch(e => console.error(e)); } }
  ];

  constructor(
    navService: NavService,
    private readonly popoverService: PopoverService,
    private readonly settings: SettingsService,
    public readonly uiService: UiService
  ) {
    super('Home', navService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.boxes = this.settings.home.boxes;
  }

  async onAdd(ev: MouseEvent) {
    await this.popoverService.presentPopoverSync('menu', {
      header:  'Add a new Box',
      actions: this.actions
    }, ev);
  }

  async onRemoveBox(box: Pbj.DashboardBox) {
    if (await this.popoverService.presentConfirm('Remove Box?')) {
      this.boxes.splice(this.boxes.indexOf(box), 1);
      await this.settings.save();
    }
  }

  async onEditBox(box: Pbj.DashboardBox) {
    await this.popoverService.presentPopoverSync('dash', { box });
    await this.settings.save();
  }

  async onMoveBoxUp(box: Pbj.DashboardBox) {
    const indexOf = this.boxes.indexOf(box);
    this.boxes.splice(indexOf, 1);
    this.boxes.splice(Math.max(0, indexOf - 1), 0, box);
    await this.settings.save();
  }

  async onMoveBoxDown(box: Pbj.DashboardBox) {
    const indexOf = this.boxes.indexOf(box);
    this.boxes.splice(indexOf, 1);
    this.boxes.splice(Math.min(this.boxes.length, indexOf + 1), 0, box);
    await this.settings.save();
  }

  private async onAddBox(atTheStart: boolean) {
    const newBox: Pbj.DashboardBox = { ...CPBJ.CDASHBOX.DEFAULT };
    if (atTheStart) {
      this.boxes.splice(0, 0, newBox);
    } else {
      this.boxes.push(newBox);
    }
    await this.settings.save();
  }

  toggleEditMode(ev) {
    this.editMode = !this.editMode;
    console.log('on press', ev);
    return false;
  }

  update(box: Pbj.DashboardBox) {
    console.log('update');
    box.needsUpdate = !box.needsUpdate;
  }

  async navigateToList($event: MouseEvent, box: Pbj.DashboardBox) {
    $event.preventDefault();
    $event.stopPropagation();
    await this.navService.navigateToList(box.listtype, box.itemtype);
  }
}
