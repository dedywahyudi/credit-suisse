import { Component, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidepanel',
  templateUrl: './sidepanel.component.html',
  styleUrls: ['./sidepanel.component.scss']
})
export class SidepanelComponent implements OnChanges {
  @Input() collapsible;
  @Input() isHidden = false;

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
  }
}
