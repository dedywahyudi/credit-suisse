import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input() tabs = [];
  @Input() public activeTab: any = null;
  @Output() activeTabChange: EventEmitter<string> = new EventEmitter;

  /**
   * select Select the passed tab
   * @param {string} tab Tab name
   */
  select(tab: string) {
    this.activeTabChange.emit(tab);
  }
}
