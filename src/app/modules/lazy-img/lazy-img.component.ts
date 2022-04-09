import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {LazyComponent} from './lazy.component';

@Component({
             selector:    'pbj-lazy-img',
             templateUrl: './lazy-img.component.html',
             styleUrls:   ['./lazy-img.component.scss']
           })
export class LazyImgComponent extends LazyComponent implements OnInit, OnDestroy, OnChanges {

  /**
   * This attribute defines the alternative text describing the image.
   * Users will see this text displayed if the image URL is wrong,
   * the image is not in one of the supported formats, or if the image is not yet downloaded.
   */
  @Input() alt?: string;

  /** The image URL. This attribute is mandatory for the `<img>` element. */
  @Input() src: string;

  /** Emitted when the img src has been set */
  @Output() imgWillLoad: EventEmitter<void> = new EventEmitter<void>();

  /** Emitted when the image has finished loading */
  @Output() imgDidLoad: EventEmitter<void> = new EventEmitter<void>();

  /** Emitted when the img fails to load */
  @Output() imgError: EventEmitter<void> = new EventEmitter<void>();

  loadSrc: SafeUrl;

  constructor(
    el: ElementRef,
    private readonly domSanitizer: DomSanitizer
  ) { super(el); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src && changes.src.previousValue) {
      this.addIO();
    }
  }

  protected addIO() {
    if (!this.src) {
      return;
    }
    super.addIO();
  }

  protected load() {
    this.loadSrc = this.domSanitizer.bypassSecurityTrustUrl(this.src);
    this.imgWillLoad.emit();
  }

  onLoad = () => {
    this.imgDidLoad.emit();
  };

  onError = () => {
    this.imgError.emit();
  };
}
