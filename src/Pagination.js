import {
  hasClass,
  pd,
  select,
  on,
  off
} from './lib/utils'

function Pagination ({elements}, bus) {
  this.bus = bus
  this.pagination = select(elements.pagination)
  this.left = select('[data-dir="prev"]', this.pagination)
  this.right = select('[data-dir="next"]', this.pagination)
  this.page = 1

  this.onClick = this.onClick.bind(this)

  on(this.pagination, 'click', this.onClick)

  bus.on('response', this.onResponse)
  bus.addAction('Pagination/getCurrentPage', this.getCurrentPage, this)
  bus.addAction('Pagination/pageSize', this.addPageSizeToRequest, this)
}

Pagination.prototype.onClick = function onClick (e) {
  e && pd(e)
  this.incrementPage(e) !== false && this.bus.emit('request', [
    'Request/getPreviousRequest',
    'Pagination/pageSize',
    'Pagination/getCurrentPage'
  ])
}

Pagination.prototype.onResponse = function onResponse (req, res) {
  this.updatePagination(res)
  this.updateDOM()
}

Pagination.prototype.destroy = function destroy () {
  off(this.pagination, 'click', this.onClick)
}

Pagination.prototype.incrementPage = function incrementPage (e) {
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

Pagination.prototype.updatePagination = function updatePagination (request) {
  this.first = Number(request.first)
  this.pageCount = Math.round(Number(request.total) / this.pageSize())
  this.page = (Math.round(Number(request.end) / this.pageSize()) - 1)
}

Pagination.prototype.pageSize = function pageSize () {
  return window.innerWidth < 1000 ? 5 : 50
}

Pagination.prototype.addPageSizeToRequest = function addPageSizeToRequest (request, next) {
  Object.assign(request, {pagesize: this.pageSize()})
  next(request)
}

Pagination.prototype.updateDOM = function updateDOM () {
  this.pagination.classList.add('is-active')
  this.left.classList[ this.hasPrevPage() ? 'add' : 'remove' ]('is-active')
  this.right.classList[ this.hasNextPage() ? 'add' : 'remove' ]('is-active')
}

Pagination.prototype.hasPrevPage = function hasPrevPage () {
  return this.page > 0
}

Pagination.prototype.hasNextPage = function hasNextPage () {
  return this.page + 1 < this.pageCount
}

Pagination.prototype.getCurrentPage = function getCurrentPage (request, next) {
  next((request['page'] = this.page, request))
}

export default Pagination
