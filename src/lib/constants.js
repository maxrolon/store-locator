import styles from './map-styles'

export const MAP = '.js-locator-map'
export const SIDEBAR = '.js-locator-list'
export const FORM = '.js-locator-form'
export const PAGINATION = '.js-locator-pagination'
export const FILTERS = '.js-locator-filter'
export const FETCH_LOCATIONS_FROM_CENTER = '.js-locator-redo'
export const GEO_TRIGGER = '.js-locator-geo-trigger'
export const GEO_FEEDBACK = '.js-locator-geo-feedback'
export const MAP_KEY = ''
export const MAP_LANG = 'en'
export const MAP_REGION = 'US'
export const ICON_PATH = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

export const MAP_DEFAULTS = {
  center: { lat: 30.267153, lng: -97.7430608 }, // Austin
  zoom: 15,
  styles: styles,
  disableDefaultUI: true,
  zoomControl: true,
  gestureHandling: 'cooperative',
}
