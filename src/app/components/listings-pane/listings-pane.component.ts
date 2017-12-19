import { Component, Input } from '@angular/core';

// listing pane component used to show user a custom list like in regulations/contacts
@Component({
  selector: 'app-listings-pane',
  templateUrl: './listings-pane.component.html',
  styleUrls: ['./listings-pane.component.scss']
})
export class ListingsPaneComponent {
  @Input() listTitle = '';
  @Input() items = [];
}
