import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public dashboard: any = {};
  public notifications: any = {};
  public user: any = {};

  constructor(private auth: AuthService) {}

  // get logged user
  getUser() {
    return this.auth.me();
  }

  // fetch dashboard data
  ngOnInit() {
    return this.getUser().then(user => {
      this.user = user;
      this.dashboard = user.settings.dashboard;
      this.notifications = user.settings.notifications;
    });
  }
}
