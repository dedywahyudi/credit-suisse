import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isEqual } from 'lodash';

// filter types
const FILTERS = {
  regulator: '',
  regulation: '',
  year: '',
  document: ''
};

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  exportAs: 'filters',
})
export class SearchFiltersComponent {
  @Input() savedFilters: Array<any> = [];

  // outputs onApply events
  @Output() onApply: EventEmitter<any> = new EventEmitter;

  filters: any = { ...FILTERS };
  activeFilters: any = { ...FILTERS };

  /**
   * applyFilter Apply the specified filters
   * @param {any} filtersToApply
   */
  applyFilter(filtersToApply) {
    if (isEqual(filtersToApply, FILTERS)) {
      return;
    }

    this.filters = { ...FILTERS };
    this.activeFilters = { ...filtersToApply };
    this.onFilterApply();
  }

  /**
   * clearFilters Clear all filters or the specified filter
   * @param {string} filter
   */
  clearFilters(filter?: string) {
    if (typeof filter !== 'string') {
      this.activeFilters = { ...FILTERS };
    } else {
      this.filters[filter] = FILTERS[filter];
      this.activeFilters[filter] = FILTERS[filter];
    }

    this.onFilterApply();
  }

  /**
   * onFilterApply Trigger event when applying filters
   */
  onFilterApply() {
    this.onApply.emit({ ...this.activeFilters });
  }
}
