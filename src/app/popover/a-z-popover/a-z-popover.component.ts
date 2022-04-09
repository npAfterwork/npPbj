import {Pbj} from '../../model/model';
import {FilterService} from '../../services/ui/filter.service';
import {PBJBasePopover} from '../popover-base';
import {NavParams, Platform} from '@ionic/angular';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector:    'pbj-a-z-popover',
  templateUrl: './a-z-popover.component.html',
  styleUrls:   ['./a-z-popover.component.scss']
})
export class AZPopoverComponent extends PBJBasePopover implements OnInit {

  @Input() items: Pbj.Base[];
  letters = '#abcdefghijklmnopqrstuvwxyz'.split('');
  currentLetters: string;
  currentLetter: string;

  constructor(
    private readonly navParams: NavParams,
    public readonly platform: Platform,
    private readonly filterService: FilterService
  ) {
    super();
  }

  ngOnInit() {
    this.currentLetters = this.filterService.filter.currentLetters;
    this.currentLetter = this.filterService.filter.letter;
  }

  async execute(letter: string) {
    // deselect
    if (letter === this.currentLetter) {
      letter = '';
    }
    this.filterService.filterByLetter(letter);
    await this.popoverService.closeCurrent({ letter });
  }
}
