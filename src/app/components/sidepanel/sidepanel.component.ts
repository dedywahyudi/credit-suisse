import { Component, OnDestroy, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss'],
  exportAs: 'collapsible',
})
export class SidepanelComponent implements OnChanges, OnDestroy {
  @Input() collapsible;
  @Input() isHidden = false;
  @Input() reversed = false;

  // otuputs onToggle events
  @Output() onToggle: EventEmitter<boolean> = new EventEmitter;

  get isCollapsible() {
    return this.collapsible !== undefined;
  }

  ngOnChanges(changes: SimpleChanges) {
    // watch for input changes, toggle el if isHidden
    if (changes.isHidden) {
      this.onToggle.emit(this.isHidden);
    }
  }

  /**
   * toggle Toggle the el state
   */
  toggle() {
    this.isHidden = !this.isHidden;
    this.onToggle.emit(this.isHidden);

    document.body.classList.remove('sidebar-toggled');
    if (this.isHidden && !this.reversed || !this.isHidden && this.reversed) {
      document.body.classList.add('sidebar-toggled');
    }
  }

  // remove the toggled state on destroy
  ngOnDestroy() {
    document.body.classList.remove('sidebar-toggled');
  }
}
