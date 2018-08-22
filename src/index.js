import Bus from './lib/bus'
import defaults from './lib/defaults'

import Request from './Request'
import Map from './Map'
import Form from './Form'
import Sidebar from './Sidebar'
import Pagination from './Pagination'

function StoreLocator (opts = {}) {
  const {settings, elements} = opts
  this.settings = {
    lookup: (opts.lookup || defaults.lookup),
    settings: Object.assign({}, defaults.settings, settings),
    elements: Object.assign({}, defaults.elements, elements)
  }
  const templates = Object.assign({}, defaults.templates, opts.templates)
  Object.keys(templates).map(key => {
    templates[key] = templates[key].bind(this)
  })
  this.settings['templates'] = templates
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
  this.bus.destroy()
  this.map.destroy()
  this.form.destroy()
  this.sidebar.destroy()
  this.pagination.destroy()
  this.bus = null
  this.map = null
  this.form = null
  this.sidebar = null
  this.pagination = null
}

export default StoreLocator
