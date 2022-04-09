import {ElementRef} from '@angular/core';

export abstract class LazyComponent {

  private io: IntersectionObserver;

  protected abstract load(): void;

  protected constructor(
    protected readonly el: ElementRef)
  {
  }

  protected addIO() {
    if ('IntersectionObserver' in window) {
      this.removeIO();
      this.io = new IntersectionObserver(data => {
        // because there will only ever be one instance
        // of the element we are observing
        // we can just use data[0] // TODO: This is not true... WHY??
        if (data.length && data.pop().isIntersecting) {
          this.load();
          this.removeIO();
        }
      });

      this.io.observe(this.el.nativeElement);
    } else {
      // fall back to setTimeout for Safari and IE
      setTimeout(() => this.load(), 200);
    }
  }

  protected removeIO() {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  ngOnInit() {
    this.addIO();
  }

  ngOnDestroy(): void {
    this.removeIO();
  }
}
