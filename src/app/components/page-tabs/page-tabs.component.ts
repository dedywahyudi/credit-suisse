import { Component, OnChanges, Input, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-page-tabs',
  templateUrl: './page-tabs.component.html',
  styleUrls: ['./page-tabs.component.scss']
})
export class PageTabsComponent implements OnChanges {
  @Input() tabNames = [];
  @Input() tabsData = {};

  @Input() activeTab;

  // ViewChildren need explicit selector when building for production,
  // we can't use tabs.join() to achieve the selector, or it will break in aot
  @ViewChildren('Documents,Milestones,QuickGuide,ImplementationGuide,Contacts,Links') refs;
  public templateRefs = {};

  ngOnChanges(changes) {
    // select first tab by default
    if (changes.tabsData || this.activeTab === undefined) {
      this.activeTab = this.tabNames[0];
    }
  }

  /**
   * getTmplRef Get template reference for tab
   * @param {string} tab Tab name
   */
  getTmplRef(tab) {
    const tabName = tab.replace(/\ /g, '');

    if (this.templateRefs[tabName]) {
      return this.templateRefs[tabName];
    }

    return this.refs.find(r => r._def.references[tabName]);
  }
}
