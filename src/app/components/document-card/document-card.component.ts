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

  /**
   * src Returns the right path for the icon of the given type of document
   * @param {string} t Type of document
   * @param {number} x PixelDensity
   */
  src(t, x?) {
    return `/assets/img/${t}-doc-icon${!x ? '' : `@${x}x`}.png`;
  }

  /**
   * srcSet Returns the srcset for the icons of the given type of document
   * @param {string} t Type of document
   */
  srcSet(t) {
    return `${this.src(t)} 1x, ${this.src(t, 2)} 2x`;
  }
}
