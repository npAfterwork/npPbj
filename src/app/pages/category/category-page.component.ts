import {Component, inject, OnInit} from '@angular/core';
import {AlbumDetailFragment} from "../../../@generated/np-api.service";
import {CDEFAULT_USER} from "../../@core/defaults";
import {AlbumsDataSource} from "../../@datasources/albums.datasource";
import {NPResponsiveService} from "../../@modules/responsive/np-responsive.service";
import {AuthService} from "../../services/auth/auth.service";
import {JamApiService} from "../../services/jam/jam.api.service";

@Component({
  selector: 'app-home',
  templateUrl: 'category-page.component.html',
  styleUrls: ['category-page.component.scss'],
})
export class CategoryPage implements OnInit {
  responsive = inject(NPResponsiveService);
  items = new AlbumsDataSource();
  state = this.responsive.state$;
  xs = this.responsive.watchBreak('xs');
  sm = this.responsive.watchBreak('sm');
  md = this.responsive.watchBreak('md');
  lg = this.responsive.watchBreak('lg');
  xl = this.responsive.watchBreak('xl');
  readonly #authService = inject(AuthService);
  readonly #apiService = inject(JamApiService);

  constructor() {
  }

  async ngOnInit() {

    await this.#authService.login(
      CDEFAULT_USER.server,
      CDEFAULT_USER.name,
      CDEFAULT_USER.password,
      true
    )
  }


  async extracted() {
  }


  async login() {
  }

  getImage(item: AlbumDetailFragment) {
    if (!item?.id) return undefined;
    return this.#apiService.image_url(item.id);
  }
}
