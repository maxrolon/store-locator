/**
 * Empty Fn
 */
function noop () {}

/**
 *
 * @param {Object} settings
 * @param {Array} actions String of fn names to call
 * @param {Object} request
 * @param {Class} bus
 */
function Request ({lookup}, actions = [], bus) {
  this.bus = bus
  this.lookup = lookup
  const queue = this.createQueue(actions)
  queue()
}

/**
 * Creates a queue of functions that are
 * called one after another
 *
 * @param {Object} request
 * @param {Array} queue
 */
Request.prototype.createQueue = function createQueue (actions, request = {}) {
  if (!actions.length) {
    this.lookup(request, (response) => {
      this.endQueue(request, response)
    })
    return noop
  }

  actions = actions.filter(name => this.bus.actions[name])

  actions.push(() => {
    this.lookup(request, (response) => {
      this.endQueue(request, response)
    })
  })

  return actions.reverse().reduce((a, b) => {
    return this.bus.actions[b].fn.bind(this.bus.actions[b].ctx, request, a)
  })
}

/**
 * A function that triggers the end of the queue
 * and hydrates any listening modules
 */
Request.prototype.endQueue = function endQueue (req, res) {
  this.bus.previousRequest = Object.assign({}, req)
  this.bus.emit('response', req, res)
}

export default Request
