import { Directive, AfterViewInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';

import * as Sortable from 'sortablejs/Sortable.min';

const prevDefault = handle => {
  try {
    handle.addEventListener('touchstart', e => e.preventDefault(), {
      capture: false,
      passive: false,
    });
  } catch (e) {
    /* do nothing, it means browser doesn't support passive events */
  }
};

// Sortable directive for angular,
// Wraps the SortableJs library

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective implements AfterViewInit {
  container$: HTMLElement;

  // allow to pass options through `appSortable`
  @Input() appSortable: any = {};

  constructor(public viewContainerRef: ViewContainerRef) {
    this.container$ = this.viewContainerRef.element.nativeElement;
  }

  ngAfterViewInit(): void {
    // prevent default on touchstart for drag handlers,
    // so user can drag elements without scrolling the page
    //
    // sortablejs should do this by itself, but it has a bug, see:
    // https://github.com/RubaXa/Sortable/issues/1022
    if (this.appSortable.handle) {
      const handlers = this.container$.querySelectorAll(this.appSortable.handle);

      handlers.forEach(prevDefault);
    }

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
