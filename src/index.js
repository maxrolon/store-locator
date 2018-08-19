import Bus from './lib/bus'
import defaults from './lib/defaults'

import Request from './Request'
import Map from './Map'
import Form from './Form'
import Sidebar from './Sidebar'
import Pagination from './Pagination'

function StoreLocator (settings = {}) {
  this.settings = Object.assign({}, defaults, settings)

  this.bus = new Bus()
  this.map = new Map(this.settings, this.bus)
  this.form = new Form(this.settings, this.bus)
  this.sidebar = new Sidebar(this.settings, this.bus)
  this.pagination = new Pagination(this.settings, this.bus)

  this.on('request', this.triggerRequest.bind(this))
}

StoreLocator.prototype.triggerRequest = function triggerRequest (actions) {
  return new Request(this.settings, actions, this.bus)
}

StoreLocator.prototype.on = function on () {
  this.bus.on.apply(this.bus, arguments)
}

StoreLocator.prototype.off = function off () {
  this.bus.off.apply(this.bus, arguments)
}

StoreLocator.prototype.addAction = function addAction () {
  this.bus.addAction.apply(this.bus, arguments)
}

StoreLocator.prototype.removeAction = function addAction () {
  this.bus.removeAction.apply(this.bus, arguments)
}

StoreLocator.prototype.destroy = function destroy () {
  this.map.destroy()
}

export default StoreLocator
