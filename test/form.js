import test from 'ava'
import StoreLocater from '../src/'

test('Skip: Dummy form test', t => {
  const instance = new StoreLocater()
  t.true(!!instance.form.validate)
})
