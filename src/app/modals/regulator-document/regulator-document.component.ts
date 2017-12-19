import { Component, Input } from '@angular/core';

/**
 * Modal for displaying details for a regulator related document
 */
@Component({
  selector: 'app-regulator-document',
  templateUrl: './regulator-document.component.html',
  styleUrls: ['./regulator-document.component.scss']
})
export class RegulatorDocumentComponent {
  @Input() data;
  @Input() close;
}
