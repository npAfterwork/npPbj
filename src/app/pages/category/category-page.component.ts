import {Component, inject, OnInit} from '@angular/core';
import {CDEFAULT_USER} from "../../@core/defaults";
import {AlbumsDataSource} from "../../@datasources/albums.datasource";
import {NPResponsiveService} from "../../@modules/responsive/np-responsive.service";
import {AuthService} from "../../services/auth/auth.service";

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

  constructor() {
  }

  async ngOnInit() {

    await this.#authService.login(
      CDEFAULT_USER.server,
      CDEFAULT_USER.name,
      CDEFAULT_USER.password,
      true
    )
    this.items.initialize();
  }


  async extracted() {
  }


  async login() {
    console.log('get auth');
  }
}
