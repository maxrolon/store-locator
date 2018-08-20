## Store Locator

This module allows a developer to quickly whip up a store locator module on a website. The package is about ~3.68kb gzipped.

#### Install
```bash
npm i store-locator --save
```

#### API (More information to come)
``` javascript
import StoreLocator from 'store-locator'

const locator = new StoreLocator({

  /**
   * The method that returns locations
   * based on the properties in 'request'
   *
   * @param {object} request
   * @param {function} done
   */
  lookup (request, done) {
    window.fetch('https://locations.json', {
      method: 'POST',
      body: JSON.stringify(request)
    }).then(data => done(data))
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
      return '//icon.png'
    },
    iconSize (location, zoom) {
      return zoom * 1.5
    }
  },

  elements: {
    map: '.js-map',
    sidebar: '.js-sidebar',
    form: '.js-form',
    pagination: '.js-pagination',
    filter: '.js-filter',
    redo: '.js-redo',
    geolocation: '.js-trigger'
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
})
```
