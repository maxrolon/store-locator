import test from 'ava'
import StoreLocater from '../src/'
import {
  createDocument,
  bodyWithFilters,
  bodyWithGeoFeedback
} from './helpers/mock-env'

test.before(t => {
  createDocument()
})

test('Geolocation event handler triggers action queue', t => {
  let called = false
  const instance = new StoreLocater()
  instance.bus.addAction('Test', (req, next) => {
    called = true
    next(req)
  })
  instance.bus.addFilter('Sidebar/onGeolocationClick/request', data => {
    data.push('Test')
    return data
  })
  instance.sidebar.onGeolocationClick()
  t.true(called)
})

test('Filter change does not result in error', t => {
  createDocument(bodyWithFilters)
  const instance = new StoreLocater({
    lookup (request, next) {
      t.true(!!request.filter.length)
    }
  })
  instance.sidebar.onFilterChange()
})

test('Sidebar gets populated', t => {
  const instance = new StoreLocater({
    lookup (request, next) {
      next({
        locations: [{
          name: 'TEST'
        }]
      })
    },
    elements: {
      sidebar: '.js-sidebar'
    },
    templates: {
      sidebar ({name}) {
        return `<p>${name}</p>`
      }
    }
  })
  instance.sidebar.onGeolocationClick()
  const el = document.querySelector('.js-sidebar')
  t.true(el.innerHTML === `<div><p>TEST</p></div>`)
})

test('Geo Feedback gets shown', t => {
  createDocument(bodyWithGeoFeedback)
  const instance = new StoreLocater({
    elements: {
      geolocationFeedback: '.js-geolocation-feedback'
    }
  })
  instance.sidebar.onGeolocationClick()
  const el = document.querySelector('.js-geolocation-feedback')
  t.true(el.classList.contains('is-visible'))
})
