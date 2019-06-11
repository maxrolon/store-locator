import test from 'ava'
import {
  formatGeocodingPayload
} from './../src/lib/utils'

const payloads = [
  {
    region: 'es',
    address: '46005',
    check (obj) {
      return typeof obj['componentRestrictions'] !== 'undefined'
    }
  },
  {
    region: 'uk',
    address: 'SK9 7DY',
    check (obj) {
      return typeof obj['componentRestrictions'] !== 'undefined'
    }
  },
  {
    region: 'au',
    address: '2008',
    check (obj) {
      return typeof obj['componentRestrictions'] !== 'undefined'
    }
  },
  {
    region: 'us',
    address: '11249',
    check (obj) {
      return typeof obj['componentRestrictions'] !== 'undefined'
    }
  },
  {
    region: 'fr',
    address: '17000',
    check (obj) {
      return typeof obj['componentRestrictions'] !== 'undefined'
    }
  },
  {
    region: 'it',
    address: '47521',
    check (obj) {
      return typeof obj['componentRestrictions'] !== 'undefined'
    }
  },
  {
    region: 'ca',
    address: 'M5S 1M2',
    check (obj) {
      return typeof obj['componentRestrictions'] !== 'undefined'
    }
  },
  {
    region: 'de',
    address: '63450',
    check (obj) {
      return typeof obj['componentRestrictions'] !== 'undefined'
    }
  },
  {
    region: 'au',
    address: 'Robertson NSW',
    check (obj) {
      return typeof obj['address'] !== 'undefined'
    }
  },
  {
    region: 'BARREL LLC NY',
    address: '',
    check (obj) {
      return typeof obj['address'] !== 'undefined'
    }
  },
  {
    lat: 'something',
    lng: 'something',
    check (obj) {
      return typeof obj['location'] !== 'undefined'
    }
  }
]

test('Tests the successful Geocode object formatting of varying addresses', t => {
  const passed = payloads.every(payload => {
    const {check, ...address} = payload
    const response = formatGeocodingPayload(address)
    return check(response)
  })

  t.true(passed)
})
