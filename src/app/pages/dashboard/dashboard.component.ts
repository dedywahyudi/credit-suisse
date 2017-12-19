import { Component, OnInit, ViewChild } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardPageComponent implements OnInit {
  @ViewChild('mapsModal') mapsModal;

  locations = [];
  regulators = [];
  organizations = [];
  upcomingEvents = [];
  savedDocuments = {count: 0, docs: []};

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private modalService: NgbModal
  ) {}

  // fetch page data on init
  ngOnInit() {
    // take only the first 3 events/documents
    this.api.getUpcomingEvents().toPromise()
      .then(events => this.upcomingEvents = events.slice(0, 3));

    this.api.getDocuments().toPromise().then(docs => (
      this.savedDocuments.docs = docs.slice(0, 3)));

    this.api.getRegulators().toPromise()
      .then(regulators => this.regulators = regulators);

    this.api.getRegulations().toPromise()
      .then(organizations => this.organizations = organizations);

    this.api.getMapData().toPromise()
      .then(locations => this.locations = locations);

    // get the saved documents for the logged user
    this.auth.me().then(user => this.savedDocuments.count = user.savedDocuments);
  }

  /**
   * toggleModal Toggle the maps modal
   */
  toggleModal = () => {
    this.modalService.open(this.mapsModal, {
      container: '#dashboard-content-inner',
      windowClass: 'map-modal-window'
    });
  }
}
