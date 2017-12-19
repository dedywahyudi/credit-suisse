import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../services/api.service';

// The tabs to be rendered
const tabs = [
  'Documents',
  'Milestones',
];

@Component({
  selector: 'app-regulators',
  templateUrl: './regulators.component.html',
  styleUrls: ['./regulators.component.scss']
})
export class RegulatorsPageComponent implements OnInit {
  public tabs = [...tabs];

  public regByCountry: any = [];
  public selected: any = {};
  public sortBy = 'recent';

  // observers which resolves to regulation details
  public tabsData: Observable<any>;

  constructor(private api: ApiService) {}

  // fetch regulators
  // select by default the first item
  ngOnInit() {
    this.api.getRegulators().toPromise()
      .then(regulators => {
        // group the regulators by country
        // put first the ones with no country
        const map = regulators.reduce((groups, regulator) => {
          const country = (regulator.country || '_').toLowerCase();

          groups[country] = groups[country] || {country, regulators: []};
          groups[country].regulators.push(regulator);
          return groups;
        }, {});

        this.regByCountry = Object.keys(map).sort().map(c => map[c]);
        this.select(this.regByCountry[0].regulators[0]);
      });
  }

  /**
   * select Select the passed regulator and fetch data for it
   * @param {any} regulator
   */
  select(regulator) {
    this.selected = regulator;

    this.tabsData = this.api.getRegulatorData(regulator).share();
    window.scrollTo(0, 0);
  }
}
