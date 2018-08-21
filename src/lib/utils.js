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
