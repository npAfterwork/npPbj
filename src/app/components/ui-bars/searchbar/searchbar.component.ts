import {FilterService} from '../../../services/ui/filter.service';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonSearchbar} from '@ionic/angular';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector:    'pbj-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls:   ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit, OnDestroy {

  @ViewChild('searchbar') searchbar: IonSearchbar;

  private subscriptions: Subscription[] = [];
  private _isUpdating = false;

  constructor(
    public readonly filterService: FilterService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.filterService.filter$.subscribe(() => {
        if (this.filterService.filter.text !== this.searchbar.value) {
          this._isUpdating = true;
          this.searchbar.value = this.filterService.filter.text;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onFilterChange($event: CustomEvent<{ value: string }>) {
    if (!this._isUpdating) {
      this.filterService.filterByText($event.detail.value);
    }
    this._isUpdating = false;
  }

  async setFocus() {
    await this.searchbar.setFocus();
  }

}
