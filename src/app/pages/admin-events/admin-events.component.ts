import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/share';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsPageComponent implements OnInit {
  admin_overview = [];
  tableCategory = [];
  errorMessage = '';
  shownBoxItemList = [];
  organizations = [];

  // table Category
  selectedCategory = '';
  selectedCategoryIcon = '';
  selectedTabletList = [];

  constructor(private api: ApiService) {}

  // fetch the events on component init
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

    const admin_overview_temp = this.admin_overview;
    let shownBoxItem_temp = [];
    let selectedCategory_temp = '';
    let selectedCategoryIcon_temp = '';
    let selectedTabletList_temp = [];

    // set table content
    this.tableCategory.forEach(function(categoryItem, categoryIndex) {
      if (categoryItem.selected) {
        selectedCategory_temp = categoryItem.categoryName;
        selectedCategoryIcon_temp = categoryItem.categoryIcon;
        selectedTabletList_temp = categoryItem.tableList;
      }
      categoryItem.tableList.forEach(function(tableItem, tableIndex) {
        if (tableItem.selected === true) {
          const title = tableItem.title;
          admin_overview_temp.forEach(function(item, index) {
            if (item.title === title) {
              shownBoxItem_temp = item;
            }
          });
        }
      });
    });

    this.selectedCategory = selectedCategory_temp;
    this.selectedCategoryIcon = selectedCategoryIcon_temp;
    this.selectedTabletList = selectedTabletList_temp;

    this.shownBoxItemList = [];
    this.shownBoxItemList.push(shownBoxItem_temp);
  }

  // change category dropdown
  changeDropdown(optionItem) {
    let shownBoxItem_temp = [];
    const admin_overview_temp = this.admin_overview;

    this.tableCategory.forEach(function(categoryItem, categoryIndex) {
      categoryItem.selected = false;
    });

    optionItem.tableList.forEach(function (tableItem, tableIndex) {
      if (tableIndex === 0) {
        tableItem.selected = true;
        const title = tableItem.title;
        admin_overview_temp.forEach(function(item, index) {
          if (item.title === title) {
            shownBoxItem_temp = item;
          }
        });
      } else {
        tableItem.selected = false;
      }
    });

    optionItem.selected = true;
    this.selectedCategory = optionItem.categoryName;
    this.selectedCategoryIcon = optionItem.categoryIcon;
    this.selectedTabletList = optionItem.tableList;

    this.shownBoxItemList = [];
    this.shownBoxItemList.push(shownBoxItem_temp);

    window['tableCategory'] = this.tableCategory;
  }

  // select Nav Item
  selectNavItem(navItem) {
    const admin_overview_temp = this.admin_overview;
    let shownBoxItem_temp = [];

    this.tableCategory.forEach(function(categoryItem, categoryIndex) {
      categoryItem.tableList.forEach(function(tableItem, tableIndex) {
        tableItem.selected = false;

        if (tableItem.title === navItem.title) {
          const title = tableItem.title;
          admin_overview_temp.forEach(function(item, index) {
            if (item.title === title) {
              shownBoxItem_temp = item;
            }
          });
        }
      });
    });
    navItem.selected = true;

    this.shownBoxItemList = [];
    this.shownBoxItemList.push(shownBoxItem_temp);

    window['tableCategory'] = this.tableCategory;
  }
}
