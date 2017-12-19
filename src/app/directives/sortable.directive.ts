import { Directive, AfterViewInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';

import * as Sortable from 'sortablejs/Sortable.min';

// Sortable directive for angular,
// Wraps the SortableJs library

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective implements AfterViewInit {
  container$: HTMLElement;

  // allow to pass options through `appSortable`
  @Input() appSortable = {};

  constructor(public viewContainerRef: ViewContainerRef) {
    this.container$ = this.viewContainerRef.element.nativeElement;
  }

  ngAfterViewInit(): void {
    const sortable = Sortable.create(this.container$, {
      forceFallback: true,

      onStart: (evt) => {
        document.body.classList.add('on-sort-dragging');
      },

      onMove: (evt) => {
        evt.dragged.classList.add('moved');
      },

      onEnd: (evt) => {
        evt.item.classList.remove('moved');
        document.body.classList.remove('on-sort-dragging');
      },

      ...this.appSortable,
    });
  }
}
