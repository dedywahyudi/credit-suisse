import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';

import 'rxjs/add/operator/share';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-edit-glossary',
  templateUrl: './admin-edit-glossary.component.html',
  styleUrls: ['../admin-edit-event/admin-edit-event.component.scss']
})
export class AdminEditGlossaryPageComponent implements OnInit {
  public admin_edit_glossary: Observable<Array<any>>;

  constructor(private api: ApiService, private _location: Location) {}

  // fetch the edit glossary on component init
  ngOnInit() {
    this.admin_edit_glossary = this.api.getNotifications().share();
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
