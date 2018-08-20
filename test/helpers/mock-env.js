const jsdom = require('jsdom')
const { JSDOM } = jsdom

const defaultBody = `
  <div class="js-form"></div>
  <div class="js-redo"></div>
  <div class="js-pagination"></div>
  <div class="js-sidebar"></div>
  <div class="js-geolocation"></div>
`

export const bodyWithFilters = `
  <div class="js-form"></div>
  <div class="js-redo"></div>
  <div class="js-pagination"></div>
  <div class="js-sidebar"></div>
  <div class="js-geolocation"></div>
  <input class="js-filter" type="checkbox" name="filter" value="OPTION1" checked>
  <input class="js-filter" type="checkbox" name="filter" value="OPTION2>
`

export const bodyWithGeoFeedback = `
  <div class="js-form"></div>
  <div class="js-redo"></div>
  <div class="js-pagination"></div>
  <div class="js-sidebar"></div>
  <div class="js-geolocation"></div>
  <div class="js-geolocation-feedback"></div>
`

export const bodyWithForm = `
  <form class="js-form">
    <input type="text" name="address" value="197 Grand St" />
    <select type="text" name="distance">
      <option value="10">10 Miles</option>
      <option value="20" selected>20 Miles</option>
    </select>
  </form>
  <div class="js-redo"></div>
  <div class="js-pagination"></div>
  <div class="js-sidebar"></div>
  <div class="js-geolocation"></div>
  <div class="js-geolocation-feedback"></div>
`

export const bodyWithPagination = `
  <form class="js-form"></form>
  <div class="js-redo"></div>
  <div class="js-pagination">
    <i class="js-prev"></i>
    <i class="js-next"></i>
  </div>
  <div class="js-sidebar"></div>
`

export const bodyWitNoPagination = `
  <form class="js-form"></form>
  <div class="js-sidebar"></div>
`

export const bodyWitNoElements = ``

export const createDocument = (body = defaultBody) => {
  const doc = new JSDOM(`
    <body>${body}</body>
  `)
  global.jsdom = doc
  global.document = doc.window.document
  global.window = doc.window
  global.navigator = doc.window.navigator
  global.navigator.geolocation = {
    getCurrentPosition (next) {
      next({
        coords: {
          latitude: 1,
          longitude: 0
        }
      })
    }
  }
}

createDocument()
