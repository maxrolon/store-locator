import test from 'ava'
import Loader from 'google-maps'
import StoreLocater from '../src/'

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
