import {inject} from "@angular/core";
import {map, Observable} from "rxjs";
import {AlbumIndexGQL, ArtistIndexGQL, FolderIndexGQL, GenreIndexGQL} from "src/@generated/np-api.service";
import {NPBaseDataSource} from "./albums.datasource";

export type NPBaseItem = {
    id: string;
}
export type NPIndexGroup = {
    name: string;
    items: NPBaseItem[];
}

export type IndexType = 'artists' | 'albums' | 'folders' | 'genres'

export class IndexDataSource extends NPBaseDataSource<NPIndexGroup> {
    #apiAlbums = inject(AlbumIndexGQL);
    #apiArtists = inject(ArtistIndexGQL);
    #apiGenres = inject(GenreIndexGQL);
    #apiFolders = inject(FolderIndexGQL);
    #apiObs$: Observable<{ items: NPIndexGroup[], total: number }>;

    constructor(private readonly type: IndexType = 'artists') {
        super();
        if (this.type === "artists") {
            this.#apiObs$ = this.#apiArtists.fetch().pipe(
                map(res => ({items: res.data.artistIndex.groups, total: res.data.artistIndex.groups.length}))
            );
        } else if (this.type === "albums") {
            this.#apiObs$ = this.#apiAlbums.fetch().pipe(
                map(res => ({items: res.data.albumIndex.groups, total: res.data.albumIndex.groups.length}))
            );
        } else if (this.type === "folders") {
            this.#apiObs$ = this.#apiFolders.fetch().pipe(
                map(res => ({items: res.data.folderIndex.groups, total: res.data.folderIndex.groups.length}))
            );
        } else if (this.type === "genres") {
            this.#apiObs$ = this.#apiGenres.fetch().pipe(
                map(res => ({items: res.data.genreIndex.groups, total: res.data.genreIndex.groups.length}))
            );
        }
    }

    loadPage(page: number) {
        return this.#apiObs$;
    }

}
