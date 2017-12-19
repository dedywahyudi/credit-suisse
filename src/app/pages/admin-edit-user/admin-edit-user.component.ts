import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

import 'rxjs/add/operator/share';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['../admin-edit-event/admin-edit-event.component.scss']
})
export class AdminEditUserPageComponent implements OnInit {
  public admin_edit_user: Observable<Array<any>>;

  switchEnabled = true;
  switchList = [
    {
      'title': 'Administrator',
      'checked': false
    },
    {
      'title': 'BusinessApprover',
      'checked': false
    },
    {
      'title': 'BusinessUser',
      'checked': false
    },
    {
      'title': 'CCRO/APAG Approver',
      'checked': false
    },
    {
      'title': 'CCRO/APAG User',
      'checked': false
    },
    {
      'title': 'Change Approver',
      'checked': false
    },
    {
      'title': 'Change User',
      'checked': false
    },
    {
      'title': 'Guest User',
      'checked': true
    },
    {
      'title': 'IT Approver',
      'checked': false
    },
    {
      'title': 'IT User',
      'checked': false
    }
  ];

  constructor(private api: ApiService, private _location: Location) {}

  // fetch the edit user on component init
  ngOnInit() {
    this.admin_edit_user = this.api.getNotifications().share();
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
