import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/combineLatest';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  private api = environment.api;

  constructor(private http: Http) {}

  /**
   * getEvents Get events or dashboard
   */
  getEvents() {
    return this.http.get(this.api.events).map((res: Response) => res.json())
      .catch(e => ([]));
  }

  /**
   * getUpcomingEvents Get the upcoming events
   */
  getUpcomingEvents() {
    const now = Date.now();

    return this.getEvents().map(events => (
      events.filter(e => +(new Date(e.date)) > now)));
  }

  /**
   * getDocuments Get the regulator/regulation documents
   */
  getDocuments() {
    return this.http.get(this.api.documents).map((res: Response) => res.json())
      .catch(e => ([]));
  }

  /**
   * getSavedFilters Get the user saved filters
   */
  getSavedFilters() {
    return this.http.get(this.api.savedFilters).map((res: Response) => res.json())
      .catch(e => ([]));
  }

  /**
   * getDocuments Get the list with all regulators
   */
  getRegulators() {
    return this.http.get(this.api.regulators).map((res: Response) => res.json())
      .catch(e => ([]));
  }

  /**
   * getRegulations Get the list with all regulations
   */
  getRegulations() {
    return this.http.get(this.api.regulations).map((res: Response) => res.json())
      .catch(e => ([]));
  }

  /**
   * getNotifications Get user notifications
   */
  getNotifications() {
    return this.http.get(this.api.notifications).map((res: Response) => res.json())
      .catch(e => ([]));
  }

  /**
   * getMessages Get user messages
   */
  getMessages() {
    return this.http.get(this.api.messages).map((res: Response) => res.json())
      .catch(e => ([]));
  }

  /**
   * getRegulatorData Get all details data for a regulator
   * @param {any} regulator
   */
  getRegulatorData(regulator) {
    // recreate the resource url
    const url = this.api.regulatorsData.replace('{id}', regulator.id);

    // Just for demo purpose, we have a single specific resoruce file,
    // and another one for backup.
    // If the specific resource request fails, just pull the default data
    return this.http.get(url).map((res: Response) => res.json())
      .catch(e => ([]));
  }

  /**
   * getRegulatorData Get all details data for a regulation
   * @param {any} regulation
   */
  getRegulationData(regulation) {
    // recreate the resource url
    const url = this.api.regulationsData.replace('{id}', regulation.id);

    // Just for demo purpose, we have a single specific resoruce file,
    // and another one for backup.
    // If the specific resource request fails, just pull the default data
    return this.http.get(url).map((res: Response) => res.json())
      .catch(e => ([]));
  }

  /**
   * searchRegulartors Search for regulators/regulations
   * @param {string} query
   */
  searchRegulartors(query) {
    return this.getEvents().combineLatest(
      this.getDocuments(),
      (milestones, documents) => ({milestones, documents})
    );
  }

  /**
   * getMapData Get points to display on maps
   */
  getMapData() {
    return this.http.get(this.api.mapLocations).map((res: Response) => res.json())
      .catch(e => ([]));
  }
}
