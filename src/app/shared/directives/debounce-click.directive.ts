import {
  Directive,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceClick]'
})
export class DebounceClickDirective implements OnDestroy, OnInit {
  @Output() debounceClickEvent = new EventEmitter();
  private subscription: Subscription;
  private clicks = new Subject();

  constructor() {}

  ngOnInit() {
    this.subscription = this.clicks.pipe(debounceTime(300)).subscribe(event => {
      this.debounceClickEvent.emit(event);
    });
  }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
