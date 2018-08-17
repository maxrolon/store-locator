import Emitter from './lib/bus'
import {
  hasClass,
  pd,
  select,
  on
} from './lib/utils'
import Request from './Request'

class Pagination {
  constructor ({PAGINATION}) {
    this.pagination = select(PAGINATION)
    this.left = select('[data-dir="prev"]', this.pagination)
    this.right = select('[data-dir="next"]', this.pagination)
    this.page = 1

    if (this.pagination) {
      on(this.pagination, 'click', e => {
        pd(e)
        this.incrementPage(e) !== false && Emitter.emit('request', [
          'Request/getPreviousRequest',
          'Pagination/pageSize',
          'Pagination/getCurrentPage'
        ])
      })
    }

    Emitter.on('request-complete', (req, res) => {
      this.updatePagination(res)
      this.updateDOM()
    })

    Request.addAction('Pagination/getCurrentPage', this.getCurrentPage, this)
    Request.addAction('Pagination/pageSize', this.addPageSizeToRequest, this)
  }

  incrementPage (e) {
    let el = e.target

    if (!hasClass(el, 'is-active')) {
      return false
    }

    if (hasClass(el, 'js-prev')) {
      return (this.page--)
    }

    if (hasClass(e.target, 'js-next')) {
      return (this.page++)
    }

    return false
  }

  updatePagination (request) {
    this.first = Number(request.first)
    this.pageCount = Math.round(Number(request.total) / this.pageSize())
    this.page = (Math.round(Number(request.end) / this.pageSize()) - 1)
  }

  pageSize () {
    return window.innerWidth < 1000 ? 5 : 50
  }

  addPageSizeToRequest (request, next) {
    Object.assign(request, {pagesize: this.pageSize()})
    next(request)
  }

  updateDOM () {
    this.pagination.classList.add('is-active')
    this.left.classList[ this.hasPrevPage() ? 'add' : 'remove' ]('is-active')
    this.right.classList[ this.hasNextPage() ? 'add' : 'remove' ]('is-active')
  }

  hasPrevPage () {
    return this.page > 0
  }

  hasNextPage () {
    return this.page + 1 < this.pageCount
  }

  getCurrentPage (request, next) {
    next((request['page'] = this.page, request))
  }
}

export default Pagination
