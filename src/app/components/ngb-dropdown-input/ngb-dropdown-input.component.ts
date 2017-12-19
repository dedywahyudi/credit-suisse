import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ngb-dropdown-input',
  templateUrl: './ngb-dropdown-input.component.html',
  styleUrls: ['./ngb-dropdown-input.component.scss']
})
export class NgbDropdownInputComponent {
  @Input() placeholder = 'Select';
  @Input() options = [];
  @Input() ngModel;
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter;

  change(value: string) {
    this.ngModelChange.emit(this.ngModel = value);
  }
}
