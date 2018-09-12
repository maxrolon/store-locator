import test from 'ava'
import Loader from 'google-maps'
import StoreLocater from '../src/'
import {
  createDocument,
  bodyWithRegion
} from './helpers/mock-env'

test.before(t => {
  geocodeRequest = false //eslint-disable-line
})

test('Test registering of map event handlers', t => {
  new StoreLocater() //eslint-disable-line
  t.true(!!Loader.happenings.find(({name}) => name === 'dragend'))
  t.true(!!Loader.happenings.find(({name}) => name === 'zoom_changed'))
})

test('Redo event handler starts queue', t => {
  const instance = new StoreLocater()
  instance.addAction('Form/validate', function (request, next) {
    t.true(true)
  }, this)
  instance.map.onRedo()
})

test('Redo event handler ends queue', t => {
  const instance = new StoreLocater()
  instance.on('response', (request, response) => {
    t.true(true)
  })
  instance.map.onRedo()
})

test('First marker to be rendered is center', t => {
  const instance = new StoreLocater({
    lookup (request, next) {
      next({
        locations: [{
          name: 'Testing'
        }]
      })
    }
  })
  instance.map.onRedo()
  const markers = instance.map.markers
  t.true(markers[0].location.center)
})

test('Google map is provided with correct settings', t => {
  new StoreLocater()  //eslint-disable-line
  const needed = [
    'center',
    'zoom',
    'styles',
    'disableDefaultUI',
    'zoomControl',
    'gestureHandling'
  ]
  const allExist = needed.every(key => googleMapSettings[key]) //eslint-disable-line
  t.true(allExist)
  googleMapSettings = false //eslint-disable-line
})

test('Region gets passed to geocoder', t => {
  createDocument(bodyWithRegion)
  const instance = new StoreLocater()
  instance.form.onSubmit()
  t.true(geocodeRequest.region === 'fr') //eslint-disable-line
})
