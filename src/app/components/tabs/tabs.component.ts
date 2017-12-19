import { Component, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnChanges {
  @ViewChild('tabsWrap') tabsWrap;

  @Input() tabs = [];
  @Input() public activeTab: any = null;
  @Output() activeTabChange: EventEmitter<string> = new EventEmitter;

  ngOnChanges() {
    const index = this.tabs.indexOf(this.activeTab);

    // reset tabs scroll when activating first tab
    if (!index) {
      this.tabsWrap.nativeElement.scroll(0, 0);
    }
  }

  /**
   * select Select the passed tab
   * @param {string} tab Tab name
   */
  select(tab: string) {
    this.activeTabChange.emit(tab);
  }
}
