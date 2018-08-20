import test from 'ava'
import StoreLocater from '../src/'

test('Lookup gets called', t => {
  let triggered = false
  const instance = new StoreLocater({
    lookup () {
      triggered = true
    }
  })
  instance.bus.emit('request')

  t.true(triggered)
})

test('Queue gets called in proper order', t => {
  let calls = []
  const instance = new StoreLocater()
  const action1 = function action1 (request, next) {
    calls.push('ACTION1')
    next()
  }
  const action2 = function action2 (request, next) {
    calls.push('ACTION2')
    next()
  }
  instance.addAction('ACTION1', action1, this)
  instance.addAction('ACTION2', action2, this)
  instance.bus.emit('request', ['ACTION1', 'ACTION2'])
  t.true(calls[0] === 'ACTION1')
  t.true(calls[1] === 'ACTION2')
})

test('Queue passes on request object', t => {
  const instance = new StoreLocater()
  const action1 = function action1 (request, next) {
    request['ACTION1'] = true
    next()
  }
  const action2 = function action2 (request, next) {
    request['ACTION2'] = true
    next()
  }
  instance.addAction('ACTION1', action1, this)
  instance.addAction('ACTION2', action2, this)
  instance.bus.on('response', (request, response) => {
    t.true(request['ACTION1'])
    t.true(request['ACTION2'])
  })
  instance.bus.emit('request', ['ACTION1', 'ACTION2'])
})

test('Missing actions are skipped', t => {
  const instance = new StoreLocater()
  instance.bus.emit('request', ['ACTION1'])
  // Just need to make sure this test doesn't throw an error
  t.true(true)
})

test('applyFilters overrides default actions array', t => {
  let called = false
  const instance = new StoreLocater()
  instance.bus.addFilter('Form/onSubmit/request', function () {
    called = true
  })
  instance.form.onSubmit()
  t.true(called)
})
