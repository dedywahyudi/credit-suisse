import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/share';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsPageComponent implements OnInit {
  public notifications: Observable<Array<any>>;

  constructor(private api: ApiService) {}

  // fetch the notifications on component init
  ngOnInit() {
    this.notifications = this.api.getNotifications().share();
  }
}
