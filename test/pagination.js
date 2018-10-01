import test from 'ava'
import StoreLocater from '../src/'
import {
  createDocument,
  bodyWithPagination,
  bodyWitNoPagination
} from './helpers/mock-env'

test.before(t => {
  createDocument()
})

test('Pagesize and current page are added to request', t => {
  const instance = new StoreLocater({
    lookup (req, next) {
      t.true(req.page === 0)
      t.true(req.pageSize === 52)
    },
    settings: {
      pageSize: 52
    }
  })
  instance.form.onSubmit()
})

test('Pagination is properly de-activated', t => {
  const instance = new StoreLocater({
    lookup (req, next) {
      t.true(!req.page)
      t.true(!req.pageSize)
    },
    settings: {
      paginate: false
    }
  })
  instance.form.onSubmit()
})

test('Pagination is properly incremented', t => {
  const instance = new StoreLocater({
    lookup (req, next) {
      next({
        pageCount: 40,
        page: 2,
        locations: []
      })
    }
  })
  instance.form.onSubmit()
  t.true(instance.pagination.page === 2)
})

test('Pagination properly add class', t => {
  createDocument(bodyWithPagination)
  const instance = new StoreLocater({
    lookup (req, next) {
      next({
        pageCount: 40,
        page: 2,
        locations: []
      })
    }
  })
  instance.form.onSubmit()
  const el = document.querySelector('.js-next')
  t.true(el.classList.contains('is-active'))
})

test('Pagination properly removes class', t => {
  createDocument(bodyWithPagination)
  const instance = new StoreLocater({
    lookup (req, next) {
      next({
        pageCount: 3,
        page: 3,
        locations: []
      })
    }
  })
  instance.form.onSubmit()
  const el = document.querySelector('.js-next')
  t.true(!el.classList.contains('is-active'))
})

test('Not having pagination does not cause error if no dom elements can be found', t => {
  createDocument(bodyWitNoPagination)
  const instance = new StoreLocater({
    lookup (req, next) {
      next({
        locations: []
      })
    }
  })
  t.pass()
})

test('A pagination button click without is-active does not fire a request', t => {
  createDocument(bodyWithPagination)
  let called = false
  const instance = new StoreLocater({
    lookup (req, next) {
      called = true
      next({
        locations: []
      })
    }
  })
  const el = document.querySelector('.js-next')
  instance.pagination.onClick({target: el, preventDefault () {}})
  t.true(!called)
})

test('A pagination button click with is-active does fire a request', t => {
  createDocument(bodyWithPagination)
  const el = document.querySelector('.js-next')
  el.classList.add('is-active')
  const instance = new StoreLocater({
    lookup (req, next) {
      t.true(req.page === 1)
      next({
        locations: []
      })
    }
  })

  instance.pagination.onClick({
    target: el,
    preventDefault () {}
  })
})
