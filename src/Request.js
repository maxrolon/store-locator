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
function Request ({lookup}, actions = [], request = {}, bus) {
  this.bus = bus
  this.lookup = lookup
  this.createQueue(request, actions)()
}

/**
 * Creates a queue of functions that are
 * called one after another
 *
 * @param {Object} request
 * @param {Array} queue
 */
Request.prototype.createQueue = function createQueue (request, queue) {
  if (!queue.length) {
    this.lookup(request, this.endQueue.bind(this, res))
    return noop
  }

  queue.push((request) => {
    ajaxHandler(request, res => (
      this.validateResponse(request, res)
    ))
  })

  return queue.reverse().reduce((a, b) => {
    return this.bus.actions[b].fn.bind(this.bus.actions[b].ctx, request, a)
  })
}

/**
 * A function that triggers the end of the queue
 * and hydrates any listening modules
 */
Request.prototype.endQueue = function endQueue () {
  this.bus.previousRequest = Object.assign({}, req)
  this.bus.emit('request-complete', req, res)
}

export default Request
