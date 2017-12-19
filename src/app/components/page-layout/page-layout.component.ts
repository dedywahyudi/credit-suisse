import { Component, OnInit, Input } from '@angular/core';
import 'rxjs/add/operator/share';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss']
})
export class PageLayoutComponent implements OnInit {
  @Input() pageTitle;
  public user = {};
  public notifications: Observable<Array<any>>;
  public messages: Observable<Array<any>>;

  constructor(private auth: AuthService, private api: ApiService) {}

  ngOnInit() {
    // fetch user and store it for subcomponents to use it
    this.auth.me().then(user => this.user = user);

    // fetch user notifications & messages
    this.notifications = this.api.getNotifications().share();
    this.messages = this.api.getMessages().share();
  }
}
