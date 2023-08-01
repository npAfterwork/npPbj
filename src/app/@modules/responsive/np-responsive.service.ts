import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from "rxjs";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

export type TBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

@Injectable({
  providedIn: 'root'
})
export class NPResponsiveService implements OnDestroy {

  #breakpoints: Record<TBreakpoint, number> = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }

  #dataStore: Record<TBreakpoint, BehaviorSubject<boolean>> = {
    xs: new BehaviorSubject<boolean>(false),
    sm: new BehaviorSubject<boolean>(false),
    md: new BehaviorSubject<boolean>(false),
    lg: new BehaviorSubject<boolean>(false),
    xl: new BehaviorSubject<boolean>(false),
  }

  #observables: Record<TBreakpoint, Observable<boolean>> = {
    xs: this.#dataStore.xs.asObservable(),
    sm: this.#dataStore.sm.asObservable(),
    md: this.#dataStore.md.asObservable(),
    lg: this.#dataStore.lg.asObservable(),
    xl: this.#dataStore.xl.asObservable(),
  }
  #state = new BehaviorSubject<TBreakpoint>('xs')
  state$ = this.#state.asObservable();

  #observer: MediaQueryList[] = []

  constructor() {
    for (const point in this.#breakpoints) {
      const observer = window.matchMedia(
        '(min-width: ' + this.#breakpoints[point] + 'px)'
      );
      observer.addEventListener('change', (ev) => {
        this.#dataStore[point].next(ev.matches);
        this.#updateState();
      });
      this.#dataStore[point].next(observer.matches);
      this.#observer.push(observer);
    }
    this.#updateState();
  }

  watchBreak(point: TBreakpoint): Observable<boolean> {
    return this.#observables[point];
  }

  #updateState() {
    let state: TBreakpoint = "xs";
    for (const breakPoint in this.#dataStore) {
      if (this.#dataStore[breakPoint].value) {
        state = breakPoint as TBreakpoint;
      }
    }
    this.#state.next(state);
  }

  ngOnDestroy(): void {
    for (const obs of this.#observer) {
      obs.removeAllListeners('change');
    }
  }

  getState() {
    return this.#state.value;
  }
}
