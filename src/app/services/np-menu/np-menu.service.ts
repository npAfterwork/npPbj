import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Injectable({
    providedIn: 'root'
})
export class NPMenuService {
    #visible = new BehaviorSubject<boolean>(true);
    visible$ = this.#visible.asObservable();

    constructor() {
    }

    hideMenu() {
        this.#visible.next(false);
    }

    showMenu() {
        this.#visible.next(true);
    }
}
