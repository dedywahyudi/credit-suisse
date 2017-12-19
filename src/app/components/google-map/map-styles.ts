// Map styling objects

// map icons
export const icons = {
  cluster: {
    normal: '/assets/img/clusterer-icon.png',
    active: '/assets/img/clusterer-icon-active.png',
  },
};

// customize the map to look flat
export const mapStyles = [{
  elementType: 'geometry',
  stylers: [{ color: '#cccccc' }],
}, {
  elementType: 'labels',
  stylers: [{ visibility: 'off' }],
}, {
  elementType: 'labels.icon',
  stylers: [{ visibility: 'off' }],
}, {
  featureType: 'administrative',
  elementType: 'geometry',
  stylers: [{ visibility: 'off' }],
}, {
  featureType: 'administrative.land_parcel',
  stylers: [{ visibility: 'off' }],
}, {
  featureType: 'administrative.neighborhood',
  stylers: [{ visibility: 'off' }],
}, {
  featureType: 'poi',
  stylers: [{ visibility: 'off' }],
}, {
  featureType: 'road',
  stylers: [{ visibility: 'off' }],
}, {
  featureType: 'road',
  elementType: 'labels.icon',
  stylers: [{ visibility: 'off' }],
}, {
  featureType: 'transit',
  stylers: [{ visibility: 'off' }],
}, {
  featureType: 'water',
  elementType: 'geometry',
  stylers: [{ color: '#ffffff' }],
}, {
  featureType: 'water',
  elementType: 'labels.text.fill',
  stylers: [{ color: '#ffffff' }],
}];

// styling for the clusters
export const clusterStyles = [{
  textColor: 'white',
  url: icons.cluster.normal,
  height: 30,
  width: 30,
  textSize: 14,
  fontFamily: 'inherit'
}];
