import Loader from 'google-maps'
import Emitter from './lib/bus'
import {
  endpointError,
  hide,
  show,
  iconSize,
  pd,
  select,
  on
} from './lib/utils'
import Request from './Request'

class Map {
  constructor ({MAP_KEY, MAP_LANG, MAP_REGION, MAP, MAP_DEFAULTS, ICON_PATH, ICON_SIZE, MARKER_TEMPLATE, FETCH_LOCATIONS_FROM_CENTER}) {
    this.markers = []
    this.map = select(MAP)

    this.iconPath = (location) => {
      if (typeof ICON_PATH.bind === 'undefined') {
        return ICON_PATH
      }
      return ICON_PATH(location)
    }

    this.iconSize = (location, zoom) => {
      if (ICON_SIZE) {
        return ICON_SIZE(location, zoom)
      }
      return iconSize(zoom)
    }

    this.markerTemplate = MARKER_TEMPLATE
    this.fetchFromCenter = select(FETCH_LOCATIONS_FROM_CENTER)

    Loader.LIBRARIES = ['geometry', 'places']
    Loader.KEY = MAP_KEY
    Loader.LANGUAGE = MAP_LANG
    Loader.REGION = MAP_REGION

    Emitter.on('request-complete', (req, res) => this.updateMap(req, res))
    Emitter.on('focus-on-marker', name => this.focusOnMarker(name))
    Emitter.on('zoom-changed', () => this.updateIcons())
    Emitter.on('dragend', () => this.showCenterButton())

    Loader.load(Google => {
      this.Google = Google
      this.Map = new Google.maps.Map(this.map, MAP_DEFAULTS)
      this.Geocoder = new Google.maps.Geocoder()

      this.Map.addListener('dragend', () => Emitter.emit('dragend'))
      this.Map.addListener('zoom_changed', () => Emitter.emit('zoom-changed'))
    })

    if (this.fetchFromCenter) {
      on(this.fetchFromCenter, 'click', e => {
        hide(e.target)
        pd(e)
        Emitter.emit('request', [
          'Form/validate',
          'Form/getValues',
          'Map/hideCenterButton',
          'Map/getCenter',
          'Sidebar/getFilters',
          'Pagination/pageSize',
          'Map/Geocode'
        ])
      })
    }

    Request.addAction('Map/Geocode', this.geocode, this)
    Request.addAction('Map/getCenter', this.getCenter, this)
    Request.addAction('Map/hideCenterButton', this.hideCenterButton, this)
  }

  updateMap (req, res) {
    const middle = {
      lat: Number(req.lat),
      lng: Number(req.lng)
    }
    this.resetCenter(middle)
    this.removeMarkers()
    // this.addMarker({...middle, center: true}, 0, false, true)
    this.addMarkers(req, res)
  }

  removeMarkers () {
    this.markers.forEach(({marker}) => marker.setMap(null))
    this.markers = []
  }

  addMarkers (req, res) {
    let {locations = []} = res

    if (locations.length === []) {
      return
    }

    locations.map((location, i) => {
      this.addMarker(location, (i + 1))
    })
  }

  addMarker (location, i, marker = false, center = false) {
    let size = this.iconSize(location, this.Map.getZoom())

    marker = new this.Google.maps.Marker({
      position: {
        lat: Number(location.lat),
        lng: Number(location.lng)
      },
      icon: {
        url: this.iconPath(location),
        scaledSize: new this.Google.maps.Size(size, size)
      },
      zIndex: i,
      map: this.Map
    })

    if (!center) {
      marker.html = this.createMarkerHTML(location)
      marker.addListener('click', () => this.showModal(marker))
      marker.name = location.name
    } else {
      marker.name = 'center'
    }
    this.markers.push({location, marker})
  }

  focusOnMarker (name) {
    let marker = this.markers
      .map(({marker}) => marker)
      .reduce((a, b) => b.name === name ? b : a)
    this.resetCenter(marker.getPosition())
    this.showModal(marker)
  }

  resetCenter (newPosition) {
    this.Map.setCenter(newPosition)
  }

  getCenter (request, next) {
    let center = this.Map.getCenter()
    Object.assign(request, {
      lat: center.lat(),
      lng: center.lng(),
      address: false
    })
    next(request)
  }

  showModal (marker) {
    if (!this.InfoWindow) {
      this.InfoWindow = new this.Google.maps.InfoWindow({
        map: this.Map
      })
    }
    this.InfoWindow.setContent(marker.html)
    this.InfoWindow.open(this.Map, marker)
  }

  updateIcons () {
    this.markers.forEach(({location, marker}) => {
      let size = this.iconSize(location, this.Map.getZoom())
      marker.setIcon({
        url: this.iconPath(location),
        scaledSize: new this.Google.maps.Size(size, size)
      })
    })
  }

  geocode (request, next) {
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
    this.Geocoder.geocode(geocodeReq, (res, status) => {
      if (status === 'OK') {
        let location = res[0] || {}
        request['address'] = location.formatted_address || ''
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

  createMarkerHTML (data) {
    return this.markerTemplate(data)
  }

  showCenterButton () {
    show(this.fetchFromCenter)
  }

  hideCenterButton (request, next) {
    hide(this.fetchFromCenter)
    next(request)
  }
}

export default Map
