import Emitter from 'event-emitter'

function Bus () {
  this.emitter = new Emitter()
  this.actions = {}
  this.filters = {}
  this.previousRequest = {}
  this.addAction('Bus/getPreviousRequest', this.getPreviousRequest, this)
}

Bus.prototype.addAction = function addAction (name, fn, ctx) {
  this.actions[name] = {
    ctx: ctx,
    fn: fn
  }
}

Bus.prototype.removeAction = function removeAction (name) {
  delete this.actions[name]
}

Bus.prototype.on = function on () {
  this.emitter.on.apply(this.emitter, arguments)
}

Bus.prototype.off = function off () {
  this.emitter.off.apply(this.emitter, arguments)
}

Bus.prototype.emit = function emit () {
  this.emitter.emit.apply(this.emitter, arguments)
}

Bus.prototype.applyFilter = function applyFilter (name, data) {
  const filter = this.filters[name]
  if (filter && filter.fn && filter.fn.bind) {
    return filter.fn(data)
  }
  return data
}

Bus.prototype.addFilter = function addFilter (name, fn, ctx = false) {
  this.filters[name] = {
    ctx: ctx,
    fn: fn
  }
}

Bus.prototype.destroy = function destroy () {
  this.emitter = null
}

Bus.prototype.getPreviousRequest = function getPreviousRequest (request, next) {
  Object.assign(request, this.previousRequest)
  next(request)
}

export default Bus
