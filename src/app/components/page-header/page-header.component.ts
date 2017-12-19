import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements AfterViewInit {
  @ViewChild('popover') popover;
  @Input() pageTitle;
  @Input() user;
  @Input() notifications = [];
  @Input() messages = [];

  ngAfterViewInit() {
    // when showing popover
    // create a listener to hide it when clicking outside
    this.popover.shown.subscribe(ev => {
      this.unbindPopover();
      setTimeout(() => document.addEventListener('click', this.hidePopover, false));
    });
  }

  /**
   * hidePopover Hides the profile popover
   */
  hidePopover = () => {
    this.popover.close();
    this.unbindPopover();
  }

  /**
   * unbindPopover Stop listening for popover hide
   */
  unbindPopover() {
    document.removeEventListener('click', this.hidePopover);
  }

  /**
   * getNotifications Get user unread notifications
   */
  getNotifications() {
    const notifications = this.notifications || [];
    return notifications.filter(n => n.unread).length;
  }

  /**
   * getMessages Get user's unread messages
   */
  getMessages() {
    const messages = this.messages || [];
    return messages.filter(m => m.unread).length;
  }
}
