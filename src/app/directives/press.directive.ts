import {Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {timer} from 'rxjs/internal/observable/timer';
import {Subscription} from 'rxjs/internal/Subscription';

@Directive({
  selector: '[pbjPress]'
})
export class PressDirective {

  timerSub: Subscription;

  @Input() delay = 500;
  @Output() pressed: EventEmitter<any> = new EventEmitter();

  constructor(
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    const isTouch = ('ontouchstart' in document.documentElement);
    const element = this.elementRef.nativeElement;
    element.onpointerdown = ev => {
      this.timerSub = timer(this.delay).subscribe(() => {
        this.pressed.emit(ev);
      });
    };
    element.onpointerup = () => { this.unsub(); };
    element.onpointercancel = () => { this.unsub(); };
    if (isTouch) {
      element.onpointerleave = () => { this.unsub(); };
    }
  }

  private unsub() {
    if (this.timerSub && !this.timerSub.closed) { this.timerSub.unsubscribe(); }
  }

}
