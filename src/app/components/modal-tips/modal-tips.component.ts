import { Component, Input } from '@angular/core';

// Grid component
// renders as responsive grid a set of items wit the provided display

@Component({
  selector: 'app-modal-tips',
  templateUrl: './modal-tips.component.html',
  styleUrls: ['./modal-tips.component.scss']
})
export class ModalTipsComponent {
  @Input() items = [];

  // remove tip item
  removeItem(index) {
    this.items.splice(index, 1);
  }
}
