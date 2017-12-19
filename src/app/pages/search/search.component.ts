import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { isEmpty } from 'lodash';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { SearchFiltersComponent } from '../../components/search-filters/search-filters.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchPageComponent implements OnInit {
  filters: SearchFiltersComponent;
  activeFilters: any = {};

  savedFilters = [];
  saveFilterModal: any;
  modalFilters: any = {};

  searchQuery = '';
  public tabsData: Observable<any>;
  public resultsCount: Observable<any>;
  collapsed = false;

  get isQuickSearch() {
    return this.searchQuery !== undefined;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private auth: AuthService,
    private api: ApiService
  ) {}

  ngOnInit() {
     this.api.searchRegulartors('');

    this.api.getSavedFilters().toPromise()
      .then(savedFilters => this.savedFilters = savedFilters);

    const quickSearch = this.route.queryParams
      .map(params => params.query);

    this.tabsData = quickSearch.flatMap(
      this.api.searchRegulartors.bind(this.api));

    quickSearch.subscribe(query => {
      this.searchQuery = query;
      this.activeFilters = {};
    });

    this.resultsCount = this.tabsData.map(r => (
      Object.keys(r).reduce((sum, k) => sum + r[k].length, 0)));
  }

  /**
   * hasActiveFilters Check if search has any active filters
   */
  hasActiveFilters() {
    return ['regulator', 'regulation', 'year', 'document'].some(k => this.activeFilters[k]);
  }

  /**
   * openSaveFilterModal Show the modal to save current search filters
   * @param {any} content The modal template
   */
  openSaveFilterModal(content) {
    this.modalService.open(content);
  }

  /**
   * saveFilter Save the passed filters with the passed filtername
   * Calls the callback when done
   * @param {string} filtername
   * @param {Array<any>} savedFilters
   * @param {function} callback
   */
  saveFilter = (filterName, savedFilters, callback) => {
    const name = filterName || (
      `Untitled Save ${this.savedFilters.length + 1}`);

    this.savedFilters.push({ ...savedFilters, name });
    callback();
  }

  /**
   * search Apply the passed filters
   * @param {Array<any>} filters Filters to be applied
   */
  search(filters) {
    this.router.navigate(['search']);

    this.activeFilters = { ...filters };
    this.modalFilters = { ...filters };
  }
}
