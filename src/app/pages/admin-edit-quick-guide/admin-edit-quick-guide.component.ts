import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

import 'rxjs/add/operator/share';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-edit-quick-guide',
  templateUrl: './admin-edit-quick-guide.component.html',
  styleUrls: ['../admin-edit-event/admin-edit-event.component.scss']
})
export class AdminEditQuickGuidePageComponent implements OnInit {
  admin_edit_quick_guide = {
                            'sectionData': {
                              'currentItem': [],
                              'list': []
                            },
                            'impactData': {
                              'currentItem': [],
                              'list': []
                            },
                            'glossaryData': {
                              'currentItem': [],
                              'list': []
                            }
                          };

  errorMessage = '';

  constructor(private api: ApiService, private _location: Location) {}

  // fetch the edit quick guide on component init
  ngOnInit() {
    this.api.getAdminEditQuickGuideData()
      .subscribe(
        admin_edit_quick_guide => this.admin_edit_quick_guide = admin_edit_quick_guide,
        error => this.errorMessage = <any>error,
        () => this.initData()
      );
  }

  // init the data
  initData() {
    let sectionCurrentItem_temp = [];
    let impactCurrentItem_temp = [];
    let glossaryCurrentItem_temp = [];

    this.admin_edit_quick_guide.sectionData.list.forEach(function(item, index) {
      if (item.isCurrent) {
        sectionCurrentItem_temp = item;
      }
      item.descriptionLength = item.description.length;
    });

    this.admin_edit_quick_guide.impactData.list.forEach(function(item, index) {
      if (item.isCurrent) {
        impactCurrentItem_temp = item;
      }
      item.descriptionLength = item.description.length;
    });

    this.admin_edit_quick_guide.glossaryData.list.forEach(function(item, index) {
      if (item.isCurrent) {
        glossaryCurrentItem_temp = item;
      }
      item.descriptionLength = item.description.length;
    });

    this.admin_edit_quick_guide.sectionData.currentItem = sectionCurrentItem_temp;
    this.admin_edit_quick_guide.impactData.currentItem = impactCurrentItem_temp;
    this.admin_edit_quick_guide.glossaryData.currentItem = glossaryCurrentItem_temp;
  }

  // click on list item
  clickListItem(listData, listItem) {
    listData.list.forEach(function(item, index) {
      item.isCurrent = false;
    });

    listData.currentItem = listItem;
    listItem.isCurrent = true;
  }

  // click Cancel button
  clickCancel() {
    this._location.back();
  }

  // click Save Change button
  clickSaveChange() {
    this._location.back();
  }
}
