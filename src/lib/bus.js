import Emitter from 'event-emitter'

function Bus () {
  this.emitter = new Emitter()
  this.actions = []
}

Bus.prototype.addAction = function addAction (name, fn, ctx) {
  this.actions[name] = {
    ctx: ctx,
    fn: fn
  }
}

Bus.prototype.addListener = function addListener () {
  this.emitter.on.apply(this.emitter, arguments)
}

Bus.prototype.removeListener = function removeListener () {
  this.emitter.off.apply(this.emitter, arguments)
}

Bus.prototype.emit = function emit () {
  this.emitter.emit.apply(this.emitter, arguments)
}

export default Bus
