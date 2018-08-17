export default {
  settings: {
    key: '',
    lang: 'en',
    region: 'US',
    center: {lat: 40.7190658, lng: -73.9969894},
    zoom: 15,
    styles: { /* json.. */ },
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: 'cooperative',
    icon (location) {
      return '//image.png'
    },
    iconSize (location, zoom) {
      return zoom * 1.5
    }
  },
  elements: {
    map: '.js-map',
    sidebar: '.js-list',
    form: '.js-form',
    pagination: '.js-pagination',
    filter: '.js-location-filter',
    redo: '.js-redo',
    geolocation: '.js-geo-trigger'
  },
  templates: {
    sidebar (location) {
      return `<li>${location.name}</li>`
    },
    marker (location) {
      return `<div>${location.name}</div>`
    }
  }
}
