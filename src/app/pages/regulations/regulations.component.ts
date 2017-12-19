import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../services/api.service';

// The tabs to be rendered
const tabs = [
  'Documents',
  'Milestones',
  'Quick Guide',
  'Implementation Guide',
  'Contacts',
  'Links',
];

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss']
})
export class RegulationsPageComponent implements OnInit {
  public tabs = [...tabs];

  public organizations: any = [];
  public selected: any = {};
  public sortBy = 'recent';

  // observers which resolves to regulation details
  public tabsData: Observable<any>;

  constructor(private api: ApiService) {}

  // fetch organizations
  // select by default the first item
  ngOnInit() {
    this.api.getRegulations().toPromise()
      .then((organizations) => {
        this.select(organizations[0].regulations[0]);
        this.organizations = organizations;
      });
  }

  /**
   * select Select the passed regulation and fetch data for it
   * @param {any} regulation
   */
  select(regulation) {
    this.selected = regulation;

    this.tabsData = this.api.getRegulationData(regulation).share();
    window.scrollTo(0, 0);
  }
}
