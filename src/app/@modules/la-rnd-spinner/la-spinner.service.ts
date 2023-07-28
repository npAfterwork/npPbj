import {inject, Injectable} from '@angular/core';
import {LOADERS, NgxSpinnerModule, NgxSpinnerService, Spinner} from 'ngx-spinner';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({providedIn: 'root', deps: [NgxSpinnerModule]})
export class LaSpinnerService {

    #data = {
        all: [],
        last: undefined,
        store: new BehaviorSubject<Spinner>(LaSpinnerService.createData())
    };

    readonly ngxSpinner = inject(NgxSpinnerService);
    readonly type$ = this.#data.store.asObservable();

    static createData(): Spinner {
        return {
            type: 'ball-scale-multiple',
            size: 'large',
            color: '#fff',
            bdColor: 'rgba(8,8,8,0.53)'
        };
    }

    async show() {
        const newSpinner = LaSpinnerService.createData();
        const allTypes = Object.keys(LOADERS);
        newSpinner.type = allTypes[Math.floor(Math.random() * allTypes.length)];
        while (newSpinner.type === this.#data.last) {
            newSpinner.type = allTypes[Math.floor(Math.random() * allTypes.length)];
        }
        this.#data.last = newSpinner.type;
        this.#data.store.next(newSpinner);
        return this.ngxSpinner.show();
    }

    async hide() {
        return this.ngxSpinner.hide();
    }
}
