import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {LOADERS, NgxSpinnerModule, Size} from "ngx-spinner";
import {Subscription} from 'rxjs/internal/Subscription';
import {LaSpinnerService} from 'src/app/@modules/la-rnd-spinner/la-spinner.service';

@Component({
    selector: 'np-la-spinner',
    standalone: true,
    templateUrl: './la-spinner.component.html',
    styleUrls: ['./la-spinner.component.scss'],
    imports: [
        NgxSpinnerModule
    ],
})
export class LaSpinnerComponent implements OnInit, OnDestroy {

    size: Size = 'default';
    bdColor = 'rgba(51,51,51,0.8)';
    color = '#fff';
    type: keyof typeof LOADERS = 'ball-scale-multiple';
    private sub: Subscription;
    public spinner = inject(LaSpinnerService);

    ngOnInit() {
        this.sub = this.spinner.type$.subscribe(data => {
            this.size = data.size;
            this.bdColor = data.bdColor;
            this.color = data.color;
            this.type = data.type as keyof typeof LOADERS;
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
