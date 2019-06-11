export const clearElement = el => {
  if (!el) return
  el.innerHTML = ''
}

export const endpointError = text => console.error(text)

export const show = el => el.classList.add('is-visible')

export const hide = el => el.classList.remove('is-visible')

export const hasClass = (el, str) => el.classList.contains(str)

export const pd = e => e.preventDefault()

export const noop = function noop () {}

export const select = (selector, parent = document, all = false) => {
  return (all
    ? [].slice.call(parent.querySelectorAll(selector))
    : parent.querySelector(selector)
  )
}

export const on = (element, event, callback, capture) => {
  if (!element.addEventListener) {
    event = 'on' + event
  }
  const method = element.addEventListener || element.attachEvent
  method.call(element, event, callback, capture)
  return callback
}

export const off = (element, event, callback, capture) => {
  if (!element.removeEventListener) {
    event = 'on' + event
  }
  const method = element.removeEventListener || element.detachEvent
  method.call(element, event, callback, capture)
  return callback
}

export const getInternationalZipCode = (countryCode) => {
  const patternPerCountry = {
    us: /^\d{5}([\-]?\d{4})?$/,
    uk: /^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/,
    de: /^\b((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:[4][0-24-9]\d{3})|(?:[6][013-9]\d{3}))\b$/,
    ca: /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]) {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/,
    fr: /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/,
    it: /^(V-|I-)?[0-9]{5}$/,
    au: /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/,
    nl: /^[1-9][0-9]{3}\s?([a-zA-Z]{2})?$/,
    es: /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/,
    dk: /^([D|d][K|k]( |-))?[1-9]{1}[0-9]{3}$/,
    se: /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/,
    be: /^[1-9]{1}[0-9]{3}$/,
    in: /^\d{6}$/
  }

  if (typeof patternPerCountry[countryCode] !== 'undefined') {
    return patternPerCountry[countryCode]
  }
  return false
}

/**
 * The payload that we send to Google geocoding services
 * can come in a variety of different formats depending
 * on what address the user inserts.
 *
 * @param {Object} request The "request" object
 */
export const formatGeocodingPayload = (request = {}) => {
  // If there are already lat and long coords
  // then it's nice and easy
  if (request.lat && request.lng) {
    return {
      location: {
        lat: request.lat,
        lng: request.lng
      }
    }
  } else {
    // If not, we see if we have a zip code or
    // else we do a regular address look up
    if (
      getInternationalZipCode(request.region) &&
      getInternationalZipCode(request.region).test(request.address)
    ) {
      return {
        componentRestrictions: {
          country: request.region,
          postalCode: request.address
        }
      }
    } else {
      return {
        address: request.address,
        ...(request.region ? {
          region: request.region
        } : {})
      }
    }
  }
}
