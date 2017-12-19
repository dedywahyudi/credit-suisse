import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})

export class EventCardComponent implements OnInit {
  @Input() data: any = {};

  date = new Date;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    // convert date string to Date object
    this.date = new Date(this.data.date);
  }

  // open the event modal window
  openEventModal(content) {
    this.modalService.open(content);
  }
}
