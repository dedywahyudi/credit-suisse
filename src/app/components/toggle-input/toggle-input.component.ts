import { Component, Input, Output, EventEmitter } from '@angular/core';

// Toggle input component
// Used in user profile/settings

@Component({
  selector: 'app-toggle-input',
  templateUrl: './toggle-input.component.html',
  styleUrls: ['./toggle-input.component.scss']
})
export class ToggleInputComponent {
  @Input() ngModel;
  // outputs ngModelChange events
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter;
}
