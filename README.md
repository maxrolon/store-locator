## Store Locator

------

This module provides a optimized, opinionated, front-end framework to render a store locator micro-app on a web page (think retail store locations, bar and restaurant locations). Mainly, it reacts to DOM events to eventually form a javascript object that can be sent to an API endpoint, providing latitude and longitude co-ordinates (ascertained using a browser's geolocation or the resulting co-ordinates from a geo-decoded address manually entered by a user), as well as filtration and pagination properties. 

In the future, this module may be accompanied with a server-side app to help create a user-friendly store location management system, with an open endpoint to accept the set of arguments provided by this module. In the meantime, this module could help a developer who needs to add a store locator app on a website, pulling locations from an API.

#### Install
```bash
npm i store-locator --save
```

#### Get started 
``` javascript
import StoreLocator from 'store-locator'
import nanoajax from 'nanoajax'

let storeLocator = new StoreLocator()

const APIENDPOINT = 'https://api-endpoint.com'

const convertToQueryString = data => (
  Object.keys( data ).map( key => `${key}=${data[key]}` ).join( '&' )
)

StoreLocator.attachAjaxHandler( ( request, next ) => {
  let qs = convertToQueryString( request )

  nanoajax.ajax( { url: `${APIENDPOINT}?${qs}` }, ( code, text ) => {
    if ( code === 200 ) {
      next( res )
    } else {
      console.error( code )
    }
  } )
} )

```

### Options
``` javascript
let storeLocator = new StoreLocator( {
  SIDEBAR: '.js-locator-list',
  FORM:'.js-locator-form',
  PAGINATION: '.js-locator-pagination',
  FILTERS: '.js-locator-filter',
  FETCH_LOCATIONS_FROM_CENTER: '.js-locator-redo',
  GEO_TRIGGER: '.js-locator-geo-trigger' ,
  GEO_FEEDBACK: '.js-locator-geo-feedback',
  MAP: '.js-locator-map',
  MAP_KEY: /* A Valid Google Maps API Key */,
  MAP_LANG: 'en',
  MAP_REGION: 'US',
  ICON_PATH: /* Local Image Path */,
  MAP_DEFAULTS: { 
    center: { lat: 30.267153, lng: -97.7430608 }, // Austin
    zoom: 15,
    styles: [ /* Defaults to a grayscale map */ ],
    disableDefaultUI: true,
    zoomControl: true,
    gestureHandling: 'cooperative',
  },
  
} )
```

- ``SIDEBAR`` A selector string for the DOM Node to hold a list of locations in a sidebar (see example).

- ``FORM`` A selector string for the ``<Form>`` DOM Node wrapper that will hold text inputs, such as the address text input. 

- ``PAGINATION`` A selector string for the DOM Node to hold the next/prev arrows used to paginate the locations shown to the user.

- ``FILTERS`` A selector string for the form checkbox DOM Nodes to be used as filters (See example).

- ``FETCH_LOCATIONS_FROM_CENTER`` A selector string for the button DOM Node to be used to generate new results, using latitude and longitude coordinates from the middle of the map.

- ``GEO_TRIGGER`` A selector string for the button DOM Node to trigger a request to use the browser's geolocation functionality. If permission is granted by the user, the latitude and longitude coordinates will be used to generate new results.

- ``GEO_FEEDBACK`` A selector string for the DOM Node to show while geolocation data is getting gathered (i.e. a loading animation).

- ``MAP`` A selector string for the DOM Node to hold the Google map.

- ``MAP_KEY`` should reference a valid Google Maps API key. See https://developers.google.com/maps/documentation/javascript/get-api-key to create your own.

- ``MAP_LANG`` Google Maps language setting (See https://developers.google.com/maps/documentation/javascript/localization).

- ``MAP_REGION`` Google Maps region setting (See https://developers.google.com/maps/documentation/javascript/localization).

- ``ICON_PATH`` A URL or relative path to the icon image asset to use as a Google Maps Marker. 

- ``MAP_DEFAULTS`` an object that will be passed as arguments into the Google Maps Map Constructor. See https://developers.google.com/maps/documentation/javascript/tutorial#MapOptions for an explanation of the options available. 
