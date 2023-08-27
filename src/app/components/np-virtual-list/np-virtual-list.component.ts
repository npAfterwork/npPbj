import {ScrollingModule} from "@angular/cdk/scrolling";
import {NgTemplateOutlet} from "@angular/common";
import {Component, EventEmitter, Input, OnInit, TemplateRef} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NPBaseDataSource} from "../../@datasources/albums.datasource";

@Component({
  selector: 'np-virtual-list',
  standalone: true,
  templateUrl: './np-virtual-list.component.html',
  styleUrls: ['./np-virtual-list.component.scss'],
  imports: [
    IonicModule,
    ScrollingModule,
    NgTemplateOutlet
  ]
})
export class NPVirtualListComponent<T> implements OnInit {
  @Input() items: T[] | NPBaseDataSource<T>;
  @Input() itemTemplate: TemplateRef<any>;
  itemClicked = new EventEmitter<T>;

  ngOnInit() {
    if (this.items instanceof NPBaseDataSource) {
      this.items.initialize();
    }
  }

}
