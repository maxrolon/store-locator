## Store Locator

This module allows a developer to quickly whip up a store locator module on a website. The package is about ~3.68kb gzipped.

#### Install
```bash
npm i store-locator --save
```

#### Configuration
``` javascript
import StoreLocator from 'store-locator'

const locator = new StoreLocator({

  /**
   * Lookup () {}
   * @param {object} request A simple object carrying request information
   * @param {function} done A callback function to fire when done
   * 
   * This method is used to request locations from
   * whatever backend service you are using. The function
   * is provided with a request object that contains
   * latitude and longitude coordinates, pagination 
   * information and any other values attributed to form
   * elements. Eg:
   * 
   * <form class="js-form">
   *   <input name="address" type="text" value="D.O.C. Wine Bar" />
   *   <select name="distance">
   *     <option value="10" selected>10 miles</select>
   *     <option value="20">20 miles</select>
   *   </select>
   *   <select name="product">
   *     <option value="zinfandel" selected>Zinfandel</select>
   *     <option value="pinot-noir">Pinot Noir</select>
   *   </select>
   * </form>
   * 
   * Equates to the following request:
   * 
   * {
   *   "address": "D.O.C. Wine Bar",
   *   "lat": 40.7197628,
   *   "lng": -73.9625802,
   *   "distance": "20",
   *   "product": "zinfandel",
   *   "page": 1
   * }
   * 
   * Once the request to the backend endpoint has been completed,
   * call the "done" function with an object that honors the following
   * format: 
   * 
   * {
   *   "locations": [
   *     {  
   *        "name": "Shelter",
   *        "lat": 40.7197628,
   *        "lng": -73.9625802,
   *        ...And anything else
   *     }
   *   ],
   *   "pageCount": 10,
   *   "page": 1
   * }
   * 
   * Note: The pagination properties are optional.
   * 
   * 
   */
  lookup (request, done) {
    window.fetch('https://locations.json', {
      method: 'POST',
      body: JSON.stringify(request)
    }).then(data => done(data))
  },

  settings: {
    
    /* Google Maps API key */
    key: '',
    
    /* Default Google Map language */
    lang: 'en',
    
    /* Default Google Map region */
    region: 'US',
    
    /* Google Map initial center point */
    center: {lat: 40.7190658, lng: -73.9969894},
    
    /* Google Map initial zoom level */
    zoom: 15,  // 
    
    /* Google Maps custom style JSON */
    styles: { /* json.. */ },
    
    /* Show Google Map zoom control? */
    zoomControl: true,
    
    /* Google Maps "disableDefaultUI" setting
     * See: https://developers.google.com/maps/documentation/javascript/examples/control-disableUI */
    disableDefaultUI: true,
    
    /* Google Maps "gestureHandling" setting 
     * See: https://developers.google.com/maps/documentation/javascript/examples/interaction-cooperative */
    gestureHandling: 'cooperative',
    
    /* Return the icon file you would like to use for each location */
    icon (location) {
      return '//icon.png'
    },
    
    /* Return the icon size you would like to use for each location */
    iconSize (location, currentMapZoomAmount) {
      return zoom * 1.5
    },

    /* Turns pagination off */
    paginate: true,

    /* Sets the page size sent to the endpoint */
    pageSize: 50,
    
    /* Sets the page size sent to the endpoint on window 
     * widths below the mobileBreakpoint */
    mobilePageSize: 5,

    /* The breakpoint that switches the pagination page size */
    mobileBreakpoint: 768
  },

  /**
   * These are the DOM element selectors that are
   * used to reference different HTML nodes with-in the module. 
   * The elements must exist in the DOM prior to the instantiation of this
   * module. These can be any type of selector supported by
   * "document.querySelector"
   */
  elements: {
    
    /* A selector for an empty element that will hold the Google map */ 
    map: '.js-map',
    
    /* A selector for an element that will hold the list of locations */
    sidebar: '.js-sidebar',
    
    /* A selector for a form that contains inputs whose values will be added to the 
     * request. This form element, in most usecases, should hold at least a 
     * text input with [name="address"], and a submit button.
     */
    form: '.js-form',
    
    /* A selector for an element that will hold next and previous links
     * to navigate between pages of results (optional). 
     */
    pagination: '.js-pagination',

    /* A selector for the element that retrieves the next page
     * of paginated results (optional). 
     */
    nextPage: '.js-next',

    /* A selector for the element that retrieves the previous page
     * of paginated results (optional). 
     */
    prevPage: '.js-prev',

    /* An selector that can be used to reference checkboxes
     * that act as filters. The module will look at the element.value
     * of any of these elements and add them to the request (optional).
     */
    filter: '.js-filter',

    /* A selector for an element that is visible when the map's center 
     * has been changed. This element can be used to prompt 
     * the user to 'redo' their search using the map's new center (optional).
     */
    redo: '.js-redo',

    /* A selector for an element that, when clicked, prompts the user
     * to allow your website to use their geolocation services. If the user
     * accepts, this will trigger a request containing the user's current
     * latitude and longitude (optional).
     */
    geolocation: '.js-trigger',

    /* A selector for an element that shows a loading state while
     * the user's geolocation is being fetched.
     */
    geolocationFeedback: '.js-geolocation-feedback'
  },

  /**
   * These template functions render HTML in the dynamic 
   * aspects of the module.
   */
  templates: {

    /* This is used to render each location in the sidebar */
    sidebar (location) {
      return `<li>${location.name}</li>`
    },

    /* This is used to render the marker info window on the map
     * (This info window is shown when the marker is clicked) */
    marker (location) {
      return `<div>${location.name}</div>`
    },

    /* This is shown in the sidebar when there are no results */
    empty () {
      return `<p>No Results Found</p>`
    }
  }
})
```

#### A simple HTML example
```html
<form class="js-form">
  <input name="address" type="text" placeholder="Enter an address.." />
  <select name="distance">
    <option value="10" selected>10 miles</select>
    <option value="20">20 miles</select>
  </select>
  <select name="product">
    <option value="zinfandel" selected>Zinfandel</select>
    <option value="pinot-noir">Pinot Noir</select>
  </select>
</form>
<div>
  <div>
    <form>
      <input type="checkbox" name="package" value="bottle" checked />
      <input type="checkbox" name="package" value="box" />
    </form>
    <div class="js-sidebar">
      <a class="js-geolocation">Use My Location</a>
      <!-- The list of locations will be rendered here -->
    </div>
    <div class="js-pagination">
      <button class="js-prev"></button>
      <button class="js-next"></button>
  </div>
  <div class="js-map">
    <!-- The map will be rendered here -->
  </div>
</div>
```

#### A simple Javascript example
```js
import StoreLocator from 'store-locator'
import jsonp from 'jsonp'

const endpoint = 'https://stockist.co/api/v1/<account-id>/locations/search'

function convertToQuery (request) {
  return Object.keys(request).map(key => (
    `${key}=${encodeURIComponent(request[key])}`
  )).join('&')
}

const locator = new StoreLocator({
  lookup (request, next) {
    const query = convertToQuery(request)

    jsonp(`${endpoint}?${query}`, {
      param: 'callback'
    }, (err, {locations = []}) => {
      if (err) {
        throw new Error(':( Oh no!')
      }
      
      locations = locations
        .map(({latitude, longitude, ...location}) => ({
          lat: latitude,
          lng: longitude,
          ...location
        }))
      
      next({locations})
    })
  },
  settings: {
    key: '<google-maps-key>',
  }
})
```

#### Events
```js
import StoreLocator from 'store-locator'

const locator = new StoreLocator({
  // Configuration
})

/**
 * This event is fired when an action triggers
 * a new request for locations. This event will fire 
 * immediately when the triggering action happens in the DOM, 
 * like the submission of the form, or the clicking of a 
 * "Use My Location" button (.js-geolocation).
 */
locator.on('request', () => {})

/**
 * This event is fired when the lookup 'done' method
 * is called and the request for locations has
 * been completed.
 */
locator.on('response', () => {})
```

#### API
```js
import StoreLocator from 'store-locator'

const locator = new StoreLocator({
  // Configuration
})

/**
 * Hook into the 'request' or 'response' events.
 */
locator.on(event, fn)

/**
 * Remove an existing hook for 'request' or 'response' events.
 */
locator.off(event, fn)

/**
 * Destroy all event listeners and unload the map.
 */
locator.destroy()
```

#### Examples in use

- Moscot: https://moscot.com/pages/locations
- Austin Eastciders: https://austineastciders.com/pages/store-locator
