import {inject} from "@angular/core";
import {map} from "rxjs";
import {NPApiService} from "src/@generated/np-api.service";
import {GQL} from "../../@generated/np-types";
import {NPBaseDataSource} from "./albums.datasource";
import ArtistIndexGroupQl = GQL.ArtistIndexGroupQl;


export class ArtistsDataSource extends NPBaseDataSource<ArtistIndexGroupQl> {
  #apiService = inject(NPApiService);

  loadPage(page: number) {
    return this.#apiService.bands().pipe(
      map(res => ({
        items: res.data.artistIndex.groups as ArtistIndexGroupQl[],
        total: res.data.artistIndex.groups.length
      }))
    );
  }

}
