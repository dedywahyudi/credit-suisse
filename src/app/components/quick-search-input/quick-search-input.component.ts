import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-search-input',
  templateUrl: './quick-search-input.component.html',
  styleUrls: ['./quick-search-input.component.scss']
})
export class QuickSearchInputComponent {
  @Input() query = '';
  @Input() clear = false;
  @Input() noRedirect = false;
  @Input() placeholder = 'Search';

  // outputs onSearch events
  @Output() onSearch: EventEmitter<string> = new EventEmitter;

  constructor(private router: Router) {}

  /**
   * search Handle search events
   */
  search() {
    // if noRedirect is passed, trigger search event
    if (this.noRedirect !== false) {
      return this.onSearch.emit(this.query);
    }

    // redirect
    this.router.navigate(['search'], { queryParams: { query: this.query } });

    // clear input
    if (this.clear !== false) {
      this.query = '';
    }
  }
}
