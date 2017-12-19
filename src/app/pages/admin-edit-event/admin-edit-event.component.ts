import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

import 'rxjs/add/operator/share';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-edit-event',
  templateUrl: './admin-edit-event.component.html',
  styleUrls: ['./admin-edit-event.component.scss']
})
export class AdminEditEventPageComponent implements OnInit {
  public admin_edit_event: Observable<Array<any>>;
  // filter types
  filters = {
    regulator: '',
    regulation: '',
    documentType: '',
    eventType: '',
    year: ''
  };

  constructor(private api: ApiService, private _location: Location) {}

  // fetch the edit event on component init
  ngOnInit() {
    this.admin_edit_event = this.api.getNotifications().share();
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
