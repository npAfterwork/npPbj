import {Component, inject, OnInit} from '@angular/core';
import {AlbumDetailFragment} from "../../../@generated/np-api.service";
import {CDEFAULT_USER} from "../../@core/defaults";
import {IndexDataSource, IndexType} from "../../@datasources/index.datasource";
import {AuthService} from "../../services/auth/auth.service";
import {JamApiService} from "../../services/jam/jam.api.service";

@Component({
    selector: 'pbj-index-page',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
    type: IndexType = 'artists';
    items = new IndexDataSource(this.type);
    readonly #authService = inject(AuthService);
    readonly #apiService = inject(JamApiService);

    async ngOnInit() {

        await this.#authService.login(
            CDEFAULT_USER.server,
            CDEFAULT_USER.name,
            CDEFAULT_USER.password,
            true
        )
    }

    getImage(item: AlbumDetailFragment) {
        if (!item?.id) return undefined;
        return this.#apiService.image_url(item.id);
    }

}
