import {Component, inject, OnInit} from '@angular/core';
import {NPApiService} from "src/@generated/np-api.service";
import {AlbumsDataSource} from "../../@datasources/albums.datasource";
import {NPResponsiveService} from "../../@modules/responsive/np-responsive.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  #api = inject(NPApiService);
  responsive = inject(NPResponsiveService);
  items = new AlbumsDataSource();
  state = this.responsive.state$;
  xs = this.responsive.watchBreak('xs');
  sm = this.responsive.watchBreak('sm');
  md = this.responsive.watchBreak('md');
  lg = this.responsive.watchBreak('lg');
  xl = this.responsive.watchBreak('xl');

  constructor() {
  }

  async ngOnInit() {
    this.items.initialize();
  }


  async extracted() {
    const album = await this.#api.album({id: '00634a9b-9167-4e83-b3e0-51139d344df9'}).toPromise()
                            .catch(reason => console.log(reason))
    if (album)
      console.log(album.data.album.artist.name);
  }


  async login() {
    console.log('get auth');
  }
}
