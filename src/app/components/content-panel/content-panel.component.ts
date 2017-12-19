import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-content-panel',
  templateUrl: './content-panel.component.html',
  styleUrls: ['./content-panel.component.scss']
})
export class ContentPanelComponent implements OnInit {
  @Input() minimizable = false;
  @Input() maximizable = false;
  @Input() allowSearch = false;
  @Input() allowFullScreen = false;

  @Input() collapsed = false;
  @Input() searchEntries: Array<any>;
  @Input() isFullscreen = false;

  public searchQuery = '';
  public searchToggled = false;

  @Output() onSearch: EventEmitter<any> = new EventEmitter;
  @Output() toggleFullscreen: EventEmitter<any> = new EventEmitter;

  // make sure there are items provided if search is enabled
  ngOnInit() {
    if (this.allowSearch !== false && !Array.isArray(this.searchEntries)) {
      throw new Error('You must provide a list with the result entries!');
    }
  }

  // toggle the search input
  toggleSearch(toggle?) {
    this.searchToggled = toggle !== undefined ? toggle : !this.searchToggled;
  }

  // execute a query on the provided items
  query = (text$: Observable<string>) => {
    return text$
      .debounceTime(200)
      .map(term => term === '' ? [] : this.searchEntries.filter(e => (
        this.value(e).toLowerCase().indexOf(term.toLowerCase()) > -1)
      ).slice(0, 10));
  }

  // get the string value from a passed item
  value(val) {
    return typeof val === 'string' ? val : (val.name + val.country);
  }

  // emit search event when we get a result
  onSearchResult = ({ item }) => {
    this.toggleSearch(false);
    this.onSearch.emit(item);
  }

  // we don't need the selected item to show up as "result"
  // provide a function that "removes" the result from the input
  inputFormatter = (item) => '';
}
