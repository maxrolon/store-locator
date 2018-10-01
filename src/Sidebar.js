import {
  clearElement,
  show,
  pd,
  select,
  on,
  off
} from './lib/utils'

function Sidebar ({elements, templates}, bus) {
  this.bus = bus
  this.templates = templates
  this.sidebar = select(elements.sidebar)
  this.filters = select(elements.filter, document, true) || []
  this.geolocation = select(elements.geolocation, document, true) || []
  this.geolocationFeedback = select(elements.geolocationFeedback, document, true) || []
  this.onGeolocationClick = this.onGeolocationClick.bind(this)
  this.onFilterChange = this.onFilterChange.bind(this)
  this.onResponse = this.onResponse.bind(this)

  if (!this.sidebar) {
    return
  }

  this.geolocation.length && this.geolocation.map(el => {
    on(el, 'click', this.onGeolocationClick)
  })

  this.filters.length && this.filters.map(el => {
    on(el, 'change', this.onFilterChange)
  })

  bus.on('response', this.onResponse)
  bus.addAction('Sidebar/getFilters', this.getFilters, this)
  bus.addAction('Sidebar/geolocation', this.askForGeolocation, this)
}

Sidebar.prototype.onGeolocationClick = function onGeolocationClick (e) {
  e && pd(e)
  // show(this.geofeedback)
  this.bus.emit('request', this.bus.applyFilter('Sidebar/onGeolocationClick/request', [
    'Form/getValues',
    'Pagination/pageSize',
    'Pagination/getCurrentPage',
    'Sidebar/geolocation',
    'Sidebar/getFilters',
    'Map/Geocode'
  ]))
}

Sidebar.prototype.onFilterChange = function onFilterChange (e) {
  e && pd(e)
  this.bus.emit('request', this.bus.applyFilter('Sidebar/onFilterChange/request', [
    'Form/getValues',
    'Sidebar/getFilters',
    'Pagination/pageSize',
    'Map/Geocode'
  ]))
}

Sidebar.prototype.onResponse = function onResponse (req, res) {
  clearElement(this.sidebar)
  this.addToSidebar(res)
}

Sidebar.prototype.addToSidebar = function addToSidebar (response) {
  if (!response.locations.length) {
    return this.noResults()
  }

  this.sidebar.scrollTop = 0

  response.locations.map((location, i) => {
    const item = document.createElement('div')
    on(item, 'click', e => this.showMarker(e, i))
    item.innerHTML = this.templates.sidebar(location)
    this.sidebar.appendChild(item)
  })
}

Sidebar.prototype.showMarker = function showMarker (e, i) {
  if (e.target.getAttribute('href')) {
    return
  }
  e && pd(e)
  this.bus.emit('focus-on-marker', i, e)
}

Sidebar.prototype.noResults = function noResults () {
  this.sidebar.innerHTML = this.templates.empty()
}

Sidebar.prototype.getFilters = function getFilters (request, next) {
  let vals = this.filters.reduce((obj, el) => {
    let attr = el.getAttribute('name')
    if (!el.checked) return obj
    if (!obj[attr]) obj[attr] = []
    obj[el.getAttribute('name')].push(el.value)
    return obj
  }, {})

  if (Object.keys(vals).length) {
    next(Object.assign(request, vals))
  } else {
    next(request)
  }
}

Sidebar.prototype.askForGeolocation = function askForGeolocation (request, next) {
  if (this.geolocation.length) {
    this.geolocation.forEach(el => {
      el.style.display = 'none'
    })
  }
  if (this.geolocationFeedback.length) {
    this.geolocationFeedback.forEach(el => show(el))
  }
  navigator.geolocation.getCurrentPosition(res => {
    next(Object.assign(request, {
      lat: res.coords.latitude,
      lng: res.coords.longitude
    }))
  })
}

Sidebar.prototype.destroy = function destroy () {
  this.geolocation.length && this.geolocation.map(el => {
    off(el, 'click', this.onGeolocationClick)
  })

  this.filters.length && this.filters.map(el => {
    off(el, 'change', this.onFilterChange)
  })
}

export default Sidebar
