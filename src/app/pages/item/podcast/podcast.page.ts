import {CPBJTexts} from '../../../model/consts';
import {Pbj} from '../../../model/model';
import {DataService} from '../../../services/data/data.service';
import {NavService} from '../../../services/nav/nav.service';
import {PbjBasePage} from '../../pbj-base-page';
import {ActivatedRoute} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-podcast',
  templateUrl: './podcast.page.html',
  styleUrls:   ['./podcast.page.scss']
})
export class PodcastPage extends PbjBasePage implements OnInit, OnDestroy {
  private id: string;
  private podcast: Pbj.Podcast;
  tab: 'episodes' | 'description' = 'episodes';

  constructor(
    navService: NavService,
    private readonly route: ActivatedRoute,
    public readonly dataService: DataService
  ) {
    super(CPBJTexts.PAGES.podcast, navService);
  }

  private autoPoll = true;

  ngOnInit() {
    super.ngOnInit();
    console.log('INIT PODCAST PAGE');
    this.subscriptions.push(
      this.dataService.item$('podcast').subscribe(item => {
        if (item) {
          console.log((item as Pbj.Podcast).episodes, 'subscribed epsisodes');
          if (this.autoPoll) {
            // this.dataService.refreshEpisodes(item.id);
          }
        }
      }),
      this.route.params.subscribe(async params => {
        this.id = params.id;
        console.log('load podcast with epsiodes -> should be distributed after this call');
        this.podcast = await this.dataService.getItem(params.id, 'podcast', ['episode']);
      })
    );
  }

  //  updateToolbar() {
  //    this.toolbarService.subscribe('refresh', async () => {
  //      console.log('refresh podcaast');
  //      this.podcast = await this.dataService.getItem(this.id, 'podcast', ['episode']) as Pbj.Podcast;
  //    });
  //    // this.toolbarService.enableButton('toggle', () => this.list.toggleView());
  //
  //    this.toolbarService.subscribe('clear_filter', () => {
  //      console.log('stop polling');
  //      this.autoPoll = false;
  //      this.dataService.stopPolling();
  //      this.toolbarService.unsubscribe('clear_filter');
  //    });
  //  }

  segmentChanged($event: CustomEvent) {
    this.tab = $event.detail.value;
  }
}
