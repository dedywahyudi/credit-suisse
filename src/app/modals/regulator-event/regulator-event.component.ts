import { Component, Input } from '@angular/core';

/**
 * Modal for displaying details for a regulator related event/milestone
 */
@Component({
  selector: 'app-regulator-event',
  templateUrl: './regulator-event.component.html',
  styleUrls: ['./regulator-event.component.scss']
})
export class RegulatorEventComponent {
  @Input() data;
  @Input() close;
}
