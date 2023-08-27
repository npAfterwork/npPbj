import {NgIf} from "@angular/common";
import {Component, inject, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {TNPHexColor} from "../../@core/types";
import {IndexType} from "../../@datasources/index.datasource";
import {NPThemeService} from "../../services/np-theme/np-theme.service";

@Component({
    selector: 'np-named-card',
    standalone: true,
    templateUrl: './np-named-card.component.html',
    styleUrls: ['./np-named-card.component.scss'],
    imports: [
        IonicModule,
        NgIf
    ]
})
export class NpNamedCardComponent implements OnInit {
    #themeService = inject(NPThemeService)
    color: TNPHexColor;
    @Input() title: string;
    @Input() type: IndexType;
    @Input() count?: number;

    constructor() {
    }

    ngOnInit() {
        this.color = this.#themeService.getNextColor();
    }

}
