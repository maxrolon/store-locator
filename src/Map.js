import Loader from 'google-maps'
import {
  endpointError,
  hide,
  show,
  pd,
  select,
  on,
  off
} from './lib/utils'

function Map ({settings, elements, templates}, bus) {
  this.bus = bus
  this.settings = settings
  this.elements = elements
  this.templates = templates
  this.markers = []
  this.google = {}

  this.map = select(elements.map)
  this.redo = select(elements.redo)

  this.updateMap = this.updateMap.bind(this)
  this.focusOnMarker = this.focusOnMarker.bind(this)
  this.updateIcons = this.updateIcons.bind(this)
  this.showCenterButton = this.showCenterButton.bind(this)
  this.onRedo = this.onRedo.bind(this)

  bus.on('response', this.updateMap)
  bus.on('focus-on-marker', this.focusOnMarker)
  bus.on('zoom-changed', this.updateIcons)
  bus.on('dragend', this.showCenterButton)

  bus.addAction('Map/Geocode', this.geocode, this)
  bus.addAction('Map/getCenter', this.getCenter, this)
  bus.addAction('Map/hideCenterButton', this.hideCenterButton, this)

  if (this.redo) {
    on(this.redo, 'click', this.onRedo)
  }

  Loader.LIBRARIES = ['geometry', 'places']
  Loader.KEY = settings.key
  Loader.LANGUAGE = settings.lang
  Loader.REGION = settings.region

  Loader.load(this.googleHasLoaded.bind(this))
}

Map.prototype.googleHasLoaded = function googleHasLoaded (Google) {
  this.google.core = Google
  this.google.geocoder = new Google.maps.Geocoder()
  const {
    center,
    zoom,
    styles,
    disableDefaultUI,
    zoomControl,
    gestureHandling
  } = this.settings
  this.google.map = new Google.maps.Map(this.map, {
    center,
    zoom,
    styles,
    disableDefaultUI,
    zoomControl,
    gestureHandling
  })
  this.google.map.addListener('dragend', () => this.bus.emit('dragend'))
  this.google.map.addListener('zoom_changed', () => this.bus.emit('zoom-changed'))
}

Map.prototype.onRedo = function onRedo (e) {
  e && pd(e)
  e && e.target && hide(e.target)
  this.bus.emit('request', this.bus.applyFilter('Map/onRedo/request', [
    'Form/validate',
    'Form/getValues',
    'Map/hideCenterButton',
    'Map/getCenter',
    'Sidebar/getFilters',
    'Pagination/pageSize',
    'Pagination/getCurrentPage',
    'Map/Geocode'
  ]))
}

Map.prototype.updateMap = function updateMap (req, res) {
  const middle = {
    lat: Number(req.lat),
    lng: Number(req.lng)
  }
  this.resetCenter(middle)
  this.removeMarkers()
  this.addMarker({...middle, center: true}, 0, false, true)
  this.addMarkers(req, res)
}

Map.prototype.resetCenter = function resetCenter (newPosition) {
  this.google.map.setCenter(newPosition)
}

Map.prototype.removeMarkers = function removeMarkers () {
  this.markers.forEach(({marker}) => marker.setMap(null))
  this.markers = []
}

Map.prototype.addMarkers = function addMarkers (req, res) {
  let {locations = []} = res

  if (locations.length === []) {
    return
  }

  locations.map((location, i) => {
    this.addMarker(location, (i + 1))
  })
}

Map.prototype.addMarker = function addMarker (location, i, marker = false, center = false) {
  let size = this.settings.iconSize(location, this.google.map.getZoom())
  marker = new this.google.core.maps.Marker({
    position: {
      lat: Number(location.lat),
      lng: Number(location.lng)
    },
    icon: {
      url: this.settings.icon(location),
      scaledSize: new this.google.core.maps.Size(size, size)
    },
    zIndex: i,
    map: this.google.map
  })

  if (!center) {
    marker.html = this.createMarkerHTML(location)
    marker.addListener('click', this.showModal.bind(this, marker))
    marker.name = location.name
  } else {
    marker.name = 'center'
  }
  this.markers.push({location, marker})
}

Map.prototype.showModal = function showModal (marker) {
  if (!this.InfoWindow) {
    this.InfoWindow = new this.google.core.maps.InfoWindow({
      map: this.google.map
    })
  }
  this.InfoWindow.setContent(marker.html)
  this.InfoWindow.open(this.google.map, marker)
}

Map.prototype.createMarkerHTML = function createMarkerHTML (data) {
  return this.templates.marker(data)
}

Map.prototype.focusOnMarker = function focusOnMarker (index) {
  // +1 takes into account the first center marker
  let marker = this.markers.map(({marker}) => marker)[index + 1]
  this.resetCenter(marker.getPosition())
  this.showModal(marker)
}

Map.prototype.updateIcons = function updateIcons () {
  this.markers.forEach(({location, marker}) => {
    let size = this.settings.iconSize(location, this.google.map.getZoom())
    marker.setIcon({
      url: this.settings.icon(location),
      scaledSize: new this.google.core.maps.Size(size, size)
    })
  })
}

Map.prototype.showCenterButton = function showCenterButton () {
  if (this.redo) {
    show(this.redo)
  }
}

Map.prototype.geocode = function geocode (request, next) {
  let geocodeReq = {}
  let address = false
  if (request.lat && request.lng) {
    geocodeReq['location'] = {
      lat: request.lat,
      lng: request.lng
    }
  } else {
    geocodeReq['address'] = request.address
    address = true
  }
  if (request['region']) {
    geocodeReq['region'] = request.region
  }
  this.google.geocoder.geocode(geocodeReq, (res, status) => {
    if (status === 'OK') {
      let location = res[0] || {}
      request['address'] = location.formatted_address || request.address
      if (address) {
        request['lat'] = location.geometry.location.lat()
        request['lng'] = location.geometry.location.lng()
      }
      next(request)
    } else {
      endpointError('geocode error')
    }
  })
}

Map.prototype.getCenter = function getCenter (request, next) {
  let center = this.google.map.getCenter()
  Object.assign(request, {
    lat: center.lat(),
    lng: center.lng(),
    address: false
  })
  next(request)
}

Map.prototype.hideCenterButton = function hideCenterButton (request, next) {
  hide(this.redo)
  next(request)
}

Map.prototype.destroy = function destroy () {
  off(this.redo, 'click', this.onRedo)
  Loader.release()
}

export default Map
