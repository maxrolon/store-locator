const jsdom = require('jsdom')
const { JSDOM } = jsdom
const doc = new JSDOM(`
  <body>
    <div class="js-form"></div>
    <div class="js-redo"></div>
    <div class="js-pagination"></div>
    <div class="js-sidebar"></div>
    <div class="js-geolocation"></div>
  </body>
`)
global.document = doc.window.document
global.window = doc.window
// global.navigator = global.window.navigator
