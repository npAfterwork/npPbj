import {CPBJTexts} from '../../../model/consts';
import {Pbj} from '../../../model/model';
import {DataService} from '../../../services/data/data.service';
import {NavService} from '../../../services/nav/nav.service';
import {PbjBasePage} from '../../pbj-base-page';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-podcast-episode',
  templateUrl: './podcast-episode.page.html',
  styleUrls:   ['./podcast-episode.page.scss']
})
export class PodcastEpisodePage extends PbjBasePage implements OnInit {

  podcast: Pbj.Podcast;
  episode: Pbj.Episode | undefined;

  constructor(
    navService: NavService,
    private readonly route: ActivatedRoute,
    public readonly dataService: DataService
  ) {
    super(CPBJTexts.PAGES.episode, navService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params.subscribe(async params => {
      this.podcast = await this.dataService.getItem(params.cid, 'podcast', []);
      // this.podcast = <Pbj.Podcast>await this.dataService.getItem(params.cid, 'podcast', ['episode']);
      this.episode = await this.dataService.getItem(params.eid, 'episode', []);
    });
  }

}
