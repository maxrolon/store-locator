import Request from './Request'
import Map from './Map'
import Form from './Form'
import Sidebar from './Sidebar'
import Pagination from './Pagination'
import Bus from './lib/bus'
import defaults from './lib/defaults'

function StoreLocator (settings) {
  this.settings = Object.assign({}, defaults, settings)

  this.bus = new Bus()
  this.map = new Map(this.settings, this.bus)
  this.form = new Form(this.settings, this.bus)
  this.sidebar = new Sidebar(this.settings, this.bus)
  this.pagination = new Pagination(this.settings,this.bus)

  this.bus.on('request', this.triggerRequest)
}

StoreLocator.prototype.triggerRequest = function triggerRequest (actions, req) {
  return new Request(this.settings, actions, req, this.bus)
}

StoreLocator.prototype.on = function on (event, fn) {
  this.bus.addListener(event, fn)
}

StoreLocator.prototype.off = function off (event, fn) {
  this.bus.removeListener(event, fn)
}

StoreLocator.prototype.destroy = function destroy () {
  // Destroy everything!
}

export default StoreLocator
