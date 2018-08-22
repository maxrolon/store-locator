import test from 'ava'
import StoreLocater from '../src/'
import {
  createDocument
} from './helpers/mock-env'

test.before(t => {
  createDocument()
})

test('Destructs without error', t => {
  const instance = new StoreLocater()
  instance.destroy()
  t.pass()
})

test('Re-initiates without error', t => {
  let instance = new StoreLocater()
  instance.destroy()
  instance = null
  instance = new StoreLocater({
    lookup (request, done) {
      t.pass()
    }
  })
  instance.form.onSubmit()
})
