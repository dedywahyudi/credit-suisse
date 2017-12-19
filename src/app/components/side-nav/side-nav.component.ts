import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() notifications = [];
  public toggled = false;

  constructor(private el: ElementRef) {}

  /**
   * toggle Toggle the sidenav
   */
  toggle() {
    this.toggled = !this.toggled;

    this.unbind();
    if (this.toggled) {
      setTimeout(() => (
        document.addEventListener('click', this.close, false)));
    }
  }

  /**
   * close Close the sidenav
   */
  close = (ev) => {
    if (this.el.nativeElement.contains(ev.target)) {
      return;
    }

    this.toggled = false;
    this.unbind();
  }

  /**
   * unbind Remove the click listeners
   */
  unbind() {
    document.removeEventListener('click', this.close);
  }

  /**
   * getNotifications Get user unread notifications count
   */
  getNotifications() {
    const notifications = this.notifications || [];
    return notifications.filter(n => n.unread).length;
  }
}
