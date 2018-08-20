export default {
  lookup: function lookup (request, done) {
    done({locations: []})
  },
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
    },
    paginate: true,
    pageSize: 50,
    mobilePageSize: 5,
    mobileBreakpoint: 1000
  },
  elements: {
    map: '.js-map',
    sidebar: '.js-sidebar',
    form: '.js-form',
    pagination: '.js-pagination',
    nextPage: '.js-next',
    prevPage: '.js-prev',
    filter: '.js-filter',
    redo: '.js-redo',
    geolocation: '.js-geolocation',
    geolocationFeedback: '.js-geolocation-feedback'
  },
  templates: {
    sidebar (location) {
      return `<li>${location.name}</li>`
    },
    marker (location) {
      return `<div>${location.name}</div>`
    },
    empty () {
      return `<p>No Results Found</p>`
    }
  }
}
