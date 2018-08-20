import test from 'ava'
import StoreLocater from '../src/'
import {
  createDocument,
  bodyWithForm,
  bodyWitNoElements
} from './helpers/mock-env'

test.before(t => {
  createDocument()
})

test('Form select value is captured', t => {
  createDocument(bodyWithForm)
  const instance = new StoreLocater({
    lookup (req, next) {
      t.true(req.distance === '20')
    }
  })
  instance.form.onSubmit()
})

test('Form address value is honored if no geocoding', t => {
  createDocument(bodyWithForm)
  const instance = new StoreLocater({
    lookup (req, next) {
      t.true(req.address === '197 Grand St')
    }
  })
  instance.form.onSubmit()
})

test('Not having a form does not cause error', t => {
  createDocument(bodyWitNoElements)
  const instance = new StoreLocater({})
  instance.form.onSubmit()
  t.pass()
})
