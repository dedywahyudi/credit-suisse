import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent implements OnInit {
  @Input() title = '';
  @Input() data: any = [];

  public activeTab;

  constructor() { }

  ngOnInit() {
    // activate first tab by default
    this.activeTab = (this.data || [])[0];
  }

  /**
   * activate Activate a tab
   * @param {any} tab
   */
  activate(tab) {
    // if a tab has no sections, this can't be activated
    if (!(tab.sections && tab.sections.length)) {
      return;
    }

    this.activeTab = tab;
  }
}
