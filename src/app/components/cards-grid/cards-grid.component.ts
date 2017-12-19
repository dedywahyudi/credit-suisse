import { Component, Input } from '@angular/core';

// Grid component
// renders as responsive grid a set of items wit the provided display

@Component({
  selector: 'app-cards-grid',
  templateUrl: './cards-grid.component.html',
  styleUrls: ['./cards-grid.component.scss']
})
export class CardsGridComponent {
  @Input() items;
  @Input() tmpl;
}
