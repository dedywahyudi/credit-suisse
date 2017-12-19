import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/share';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss']
})
export class AdminOverviewPageComponent implements OnInit {
  public admin_modal_tips: Observable<Array<any>>;
  admin_overview = [];
  tableCategory = [];
  admin_overview_filtered = [];
  errorMessage = '';
  organizations = [];
  showManagePopup = false;

  constructor(private api: ApiService) {}

  // fetch the overview on component init
  ngOnInit() {
    this.api.getAdminOverviewData()
      .subscribe(
        admin_overview => {
          this.admin_overview = admin_overview.tableListData;
          this.tableCategory = admin_overview.tableCategoryData;
        },
        error => this.errorMessage = <any>error,
        () => this.initData()
      );

    this.api.getAdminModalTipsData().toPromise()
      .then(admin_modal_tips => this.admin_modal_tips = admin_modal_tips);
  }

  // init the data
  initData() {
    if (window['tableCategory'] !== undefined) {
      // set tableCategory data
      this.tableCategory = window['tableCategory'];
    } else {
      // init tableCategory data
      window['tableCategory'] = this.tableCategory;
    }

    const admin_overview_filtered_temp = [];
    this.admin_overview.forEach(function(item, index){
      if (item.isShow) {
        admin_overview_filtered_temp.push(item);
      }
    });

    this.admin_overview_filtered = admin_overview_filtered_temp;
  }

  // click Manage box items
  clickManageBox(boxItem) {
    boxItem.isShow = !boxItem.isShow;
    this.initData();
  }
}
