import {Component, inject, OnInit} from '@angular/core';
import {NPApiService} from "../../../@generated/np-api.service";
import {AuthService} from "src/app/services/auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  #api = inject(NPApiService);

  constructor() {
  }

  async ngOnInit() {
    await this.extracted();

  }


  async extracted() {
    const album = await this.#api.album({id: '00634a9b-9167-4e83-b3e0-51139d344df9'}).toPromise()
                            .catch(reason => console.log(reason))
    if (album)
      console.log(album.data.album.artist.name);
  }

  #authService = inject(AuthService);

  async login() {
    console.log('get auth');
    await this.#authService.login('admin', 'admin');
    console.log('check was not successful => go settings',);
  }
}
