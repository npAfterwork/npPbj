import {CPBJTexts} from '../../../model/consts';
import {Pbj} from '../../../model/model';
import {DataService} from '../../../services/data/data.service';
import {NavService} from '../../../services/nav/nav.service';
import {PbjBasePage} from '../../pbj-base-page';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-playlist',
  templateUrl: './playlist.page.html',
  styleUrls:   ['./playlist.page.scss']
})
export class PlaylistPage extends PbjBasePage implements OnInit {
  id: string;
  buttons: Pbj.ViewButton[] = [
    { title: 'Play', color: 'secondary', fill: 'solid', icon: { name: 'play-sharp', slot: 'start' }, onClick: () => this.play() },
    { title: 'Play Random', color: 'primary', fill: 'outline', icon: { name: 'shuffle-sharp', slot: 'start' }, onClick: () => this.play() },
    { color: 'primary', fill: 'outline', icon: { name: 'ellipsis-horizontal-sharp', slot: 'icon-only' }, onClick: () => this.play() }
  ];

  constructor(
    navService: NavService,
    public readonly dataService: DataService,
    private route: ActivatedRoute
  ) {
    super(CPBJTexts.PAGES.playlist, navService);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log('init folder page');
    this.route.params.subscribe(async params => {
      this.id = params.id;
      await this.dataService.getItem(params.id, 'playlist', ['track']);
    });
  }

  private play() {
    console.log('PLAY ');
  }
}
