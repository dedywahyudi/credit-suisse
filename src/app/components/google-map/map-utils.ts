// export the map styling for reference
export * from './map-styles';
import { mapStyles } from './map-styles';

declare const google: any;

// map configs
export const mapConfig = {
  center: { lat: 0, lng: 0 },
  zoom: 2,
  minZoom: 1,
  maxZoom: 6,
  mapTypeControl: false,
  mapTypeId: 'ROADMAP',
  streetViewControl: false,
  disableDefaultUI: true,
  styles: mapStyles,
};

/**
 * getPoint Get dom coordinates for the passed map coordinates
 * @return maps.Point
 */
export const getPoint = (map, coords) => {
  const projection = map.getProjection();
  const bounds = map.getBounds();

  const topRight = projection.fromLatLngToPoint(bounds.getNorthEast());
  const bottomLeft = projection.fromLatLngToPoint(bounds.getSouthWest());
  const worldPoint = projection.fromLatLngToPoint(coords);

  const scale = Math.pow(2, map.getZoom());

  return new google.maps.Point(
    (worldPoint.x - bottomLeft.x) * scale,
    (worldPoint.y - topRight.y) * scale
  );
};

/**
 * getMarkerIcon Get a stylized marker icon
 *   with active state if needed
 */
export const getMarkerIcon = (active = false) => {
  const color = active === true ? '#970e2b' : '#1f6cae';

  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: color,
    fillOpacity: 1,
    strokeColor: '#ffffff',
    strokeWeight : 2,
    scale: 6,
    optimized: false
  };
};

// styling for tooltips
export const tooltipConfig = () => ({
  content: '',
  disableAutoPan: false,
  maxWidth: 0,
  pixelOffset: new google.maps.Size(12, 0),
  zIndex: null,
  boxClass: '',
  infoBoxClearance: new google.maps.Size(1, 1),
  pane: 'floatPane',
  enableEventPropagation: false,
});
