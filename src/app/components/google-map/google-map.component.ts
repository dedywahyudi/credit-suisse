import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { isEqual, isEmpty, flatten } from 'lodash';

declare const google: any;
declare const MarkerClusterer: any;
declare const InfoBox: any;

import {
  mapConfig,
  getPoint,
  getMarkerIcon,
  icons,
  clusterStyles,
  tooltipConfig,
} from './map-utils';

import { GoogleMapsLoader } from '../../services/google-maps-loader.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit, OnChanges {
  @ViewChild('mapEl') mapEl: ElementRef;
  @ViewChild('mapControls') mapControls: ElementRef;

  @ViewChild('infowindow') infowindow$: ElementRef;

  @Input() items = [];

  mapConfig = { ...mapConfig };
  map: any;
  activeMarker: any = {};
  hoverMarker: any = {};
  waitApiInit: Promise<any>;
  markers = [];
  cluster: any;
  tooltip: any;
  infowindow: any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    // wait for maps sdk to load
    this.waitApiInit = GoogleMapsLoader.load()
    .then(GoogleMapsLoader.loadUtilityLib)
    .then(
      this.initMap, err => {
        console.log('Maps failed to load!', err);
        return Promise.reject({});
      }
    );
  }

  ngOnChanges(changes) {
    if(!this.waitApiInit) {
      return;
    }

    // wait for api to be ready, then attach the passed markers
    this.waitApiInit.then(this.addMarkers.bind(this)).catch(e => {});
  }

  // initialize the map
  initMap = () => {
    // create the map
    this.map = new google.maps.Map(this.mapEl.nativeElement, {
      ...mapConfig,
      mapTypeId: google.maps.MapTypeId[mapConfig.mapTypeId],
    });

    // add map custom controlls to map
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(
      this.mapControls.nativeElement);

    // add the map markers & clusters
    this.addMarkers();

    // on map zoom, trigger a change detection
    // so to sincronize the range slider
    this.map.addListener('zoom_changed', () => this.changeDetectorRef.detectChanges());
  }

  /**
   * addMarkers Create the map markers
   */
  addMarkers() {
    // remove old markers and clusters
    if(this.cluster) {
      this.cluster.clearMarkers();
    }

    this.markers = this.items.map(this.getMarker.bind(this));
    // add the map clusters
    this.addMarkerCluster(this.markers);

    const tooltipOpt = {
      ...tooltipConfig(),
      boxClass: 'marker-tooltip',
    };

    const infowindowOpt = {
      ...tooltipConfig(),
      boxClass: 'marker-infowindow-wrap',
      content: this.infowindow$.nativeElement,
    };

    this.tooltip = new InfoBox(tooltipOpt);
    this.infowindow = new InfoBox(infowindowOpt);
  }

  /**
   * getMarker Create a maps marker for the provided data
   * @param {any} item
   */
  getMarker(item) {
    const marker = new google.maps.Marker({
      item: { ...item },
      position: item.location,
      icon: getMarkerIcon(),
    });

    // Add marker events for info window
    marker.addListener('click', this.onMarkerClick.bind(this, marker));

    // // Add marker events for tooltip
    marker.addListener('mouseover', this.onMarkerHover.bind(this, marker, true));
    return marker;
  }

  // get the map zoom level, return config zoom if map isn't ready
  get mapZoom() {
    if (!this.map) {
      return mapConfig.zoom;
    }

    return this.map.getZoom();
  }

  /**
   * setMapZoom Set specified zoom lvl for maps
   * @param {any} zoom
   */
  setMapZoom(zoom) {
    this.map.setZoom(parseFloat(zoom));
  }

  /**
   * addMarkerCluster Add a marker clusterer to manage the markers.
   * @param {Array<map.Marker>} markers
   */
  addMarkerCluster(markers) {
    this.cluster = new MarkerClusterer(
      this.map,
      markers,
      { styles: clusterStyles }
    );

    // Add events for tooltip
    this.cluster.addListener('mouseover', this.showClusterTooltip.bind(this));
    this.cluster.addListener('mouseout', this.hideClusterTooltip.bind(this));
    this.cluster.addListener('click', this.hideClusterTooltip.bind(this));
  }

  /**
   * openOverlay Open the passed overlay (tooltip)
   * @param {map.Marker} marker
   * @param {ElementRef} el
   */
  openOverlay(marker, el) {
    marker.setIcon(getMarkerIcon(true));
    el.open(this.map, marker);
  }

  /**
   * closeOverlay Close the marker tooltip
   * @param {map.Marker} marker
   * @param {ElementRef} el
   * @param {boolean} state = false
   */
  closeOverlay(marker, el, state = false) {
    if (!state) {
      marker.setIcon(getMarkerIcon());
    }
    el.close();
  }

  /**
   * closeInfoWindow Close the info window tooltip
   */
  closeInfoWindow() {
    this.closeOverlay(this.activeMarker, this.infowindow);
    this.activeMarker = {};
  }

  /**
   * onMarkerClick Handler for marker click
   * @param {map.Marker} marker
   */
  onMarkerClick(marker) {
    // if activeMarker isn't empty, set default state
    if (!isEmpty(this.activeMarker)) {
      this.activeMarker.setIcon(getMarkerIcon());
    }

    // activate marker & open tooltip for it
    this.activeMarker = marker;
    this.openOverlay(marker, this.infowindow);
    this.closeOverlay(marker, this.tooltip, true);
  }

  /**
   * onMarkerHover Marker hover handler
   *   Toggles the info tooltip
   * @param {map.Marker} marker
   * @param {boolean} mouseover Indicates that mouse is over
   */
  onMarkerHover(marker, mouseover) {
    if (!mouseover) {
      if (!isEqual(marker, this.activeMarker)) {
        marker.setIcon(getMarkerIcon());
      }

      this.tooltip.close();
      this.hoverMarker = null;
      google.maps.event.clearListeners(marker, 'mouseout');
    }

    if (mouseover && !isEqual(marker, this.activeMarker) && !isEqual(marker, this.hoverMarker)) {
      this.tooltip.setContent(marker.item.country);
      this.openOverlay(marker, this.tooltip);
      this.hoverMarker = marker;
      setTimeout(() => {
        marker.addListener('mouseout', this.onMarkerHover.bind(this, marker, false));
      }, 60);
    }
  }

  /**
   * showClusterTooltip Show the info tooltip for clusters
   */
  showClusterTooltip(cluster) {
    const content = cluster.getMarkers().map(el => el.item.country).join('<br>');
    this.tooltip.setContent(content);
    this.tooltip.open(this.map, cluster.getMarkers()[0]);

    cluster.clusterIcon_.div_.firstChild.src = icons.cluster.active;
  }

  /**
   * hideClusterTooltip Hide the info tooltip for clusters
   */
  hideClusterTooltip(cluster) {
    this.tooltip.close();
    cluster.clusterIcon_.div_.firstChild.src = icons.cluster.normal;
  }
}
