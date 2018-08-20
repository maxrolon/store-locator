import test from 'ava'
import StoreLocater from '../src/'

test('Defaults get overridden', t => {
  const instance1 = new StoreLocater({
    templates: {
      sidebar () {
        return 'TEST'
      }
    }
  })

  const instance2 = new StoreLocater({
    templates: {
      sidebar () {
        return 'TEST'
      }
    }
  })

  t.true(instance1.settings.templates.sidebar() === 'TEST')
  t.true(instance2.settings.elements.map === '.js-map')
})

test('Template functions maintain context', t => {
  let ctx = false
  const instance = new StoreLocater({
    templates: {
      sidebar () {
        ctx = this
        return 'TEST'
      }
    }
  })
  instance.settings.templates.sidebar()
  t.true(ctx === instance)
})
