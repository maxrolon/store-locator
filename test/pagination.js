import test from 'ava'
import StoreLocater from '../src/'

test('Pagination test', t => {
  const instance = new StoreLocater()
  t.true(!!instance.form.validate)
})
