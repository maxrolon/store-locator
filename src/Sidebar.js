import {
  clearElement,
  hasClass,
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
  this.filters = select(elements.filters) || []
  this.geolocation = select(elements.geolocation) || []
  this.onGeolocationClick = this.onGeolocationClick.bind(this)
  this.onFilterChange = this.onFilterChange.bind(this)

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

Sidebar.prototype.onResponse = function onResponse (req, res) {
  clearElement(this.sidebar)
  this.addToSidebar(res)
}

Sidebar.prototype.onGeolocationClick = function onGeolocationClick (e) {
  e && pd(e)
  // show(this.geofeedback)
  this.bus.emit('request', [
    'Form/getValues',
    'Pagination/pageSize',
    'Sidebar/geolocation',
    'Sidebar/getFilters',
    'Map/Geocode'
  ])
}

Sidebar.prototype.onFilterChange = function onFilterChange (e) {
  e && pd(e)
  this.bus.emit('request', [
    'Form/getValues',
    'Sidebar/getFilters',
    'Pagination/pageSize',
    'Map/Geocode'
  ])
}

Sidebar.prototype.addToSidebar = function addToSidebar (response) {
  if (!response.locations.length) {
    return this.noResults()
  }

  this.sidebar.scrollTop = 0

  response.locations.map(location => {
    const item = document.createElement('div')
    on(item, 'click', e => this.showMarker(e, location))
    item.innerHTML = this.templates.sidebar(location)
    this.sidebar.appendChild(item)
  })
}

Sidebar.prototype.showMarker = function showMarker (e, location) {
  hasClass(e.target, 'js-show-marker') && e && pd(e)
  this.bus.emit('focus-on-marker', location.name, e)
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

  if (request.address || (request.lng && request.lat)) {
    next(Object.assign(request, vals))
  }
}

Sidebar.prototype.askForGeolocation = function askForGeolocation (request, next) {
  this.geofeedback.style.display = 'block'
  this.geotrigger.forEach(el => {
    el.style.display = 'none'
  })
  navigator.geolocation.getCurrentPosition(res => {
    next(Object.assign(request, {
      lat: res.coords.latitude,
      lng: res.coords.longitude
    }))
  })
}

export default Sidebar
