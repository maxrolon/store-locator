import { addHook } from 'pirates'

global.infoWindowOpened = false
global.googleMapSettings = false
global.geocodeRequest = false

function matcher (filename) {
  return !!~filename.indexOf('google-maps')
}

function mutate (code, filename) {
  return `
  const happenings = []
  const latLng = {
    lat () {
      return 1
    },
    lng () {
      return 0
    }
  }
  function Geocoder () {}
  function InfoWindow () {}
  InfoWindow.prototype.setContent = function setContent () {}
  InfoWindow.prototype.open = function open () {
    global.infoWindowOpened = true
  }
  Geocoder.prototype.geocode = function geocode (req, fn) {
    global.geocodeRequest = req
    fn([{
      formatted_address: '',
      geometry: {
        location: latLng
      }
    }], 'OK')
  }
  function Map (el, settings) {
    global.googleMapSettings = settings
  }
  Map.prototype.addListener = function addListener (action, fn) {
    happenings.push({name: action, fn})
  }
  Map.prototype.getCenter = function getCenter () {
    return latLng
  }
  Map.prototype.getZoom = function getZoom () {}
  function Marker () {}
  Marker.prototype.addListener = function addListener (action, fn) {
    happenings.push({name: action, fn})
  }
  Marker.prototype.getPosition = function getPosition () {
    return latLng
  }
  function Size () {}
  Map.prototype.setCenter = function setCenter () {}
  const Google = {
    maps: {
      Geocoder: Geocoder,
      Map: Map,
      Marker: Marker,
      Size: Size,
      InfoWindow: InfoWindow
    }
  }
  const Loader = {
    load: function load (callback) {
      callback(Google)
    },
    release: function release () {},
    happenings
  }

  module.exports = Loader`
}

addHook(mutate, {
  exts: ['.js'],
  ignoreNodeModules: false,
  matcher
})
