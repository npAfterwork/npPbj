import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'np-image-card',
  standalone: true,
  templateUrl: './np-image-card.component.html',
  styleUrls: ['./np-image-card.component.scss'],
  imports: [
    IonicModule
  ]
})
export class NPImageCardComponent implements OnInit {

  @Input() imageSrc: string;
  @Input() title: string;

  constructor() {
  }

  ngOnInit() {
  }

}
