import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Document card component
// Renders a card for the provided document item

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.scss']
})
export class DocumentCardComponent {
  @Input() data: any = {};

  constructor(private modalService: NgbModal) {}

  // open the document modal
  openDocumentModal(content) {
    this.modalService.open(content);
  }
}
