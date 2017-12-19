import { Component, Input } from '@angular/core';

/**
 * Modal that allows a user to save a custom search for later use
 */
@Component({
  selector: 'app-save-filter',
  templateUrl: './save-filter.component.html',
  styleUrls: ['./save-filter.component.scss'],
})
export class SaveFilterComponent {
  @Input() filters;
  @Input() close;
  @Input() save;

  public filterName = '';
}
