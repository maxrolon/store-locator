import {
  hasClass,
  pd,
  select,
  on,
  off
} from './lib/utils'

function Pagination ({elements, settings}, bus) {
  this.bus = bus
  this.settings = settings
  this.elements = elements
  this.paginate = settings.paginate
  this.pagination = select(elements.pagination)
  if (this.pagination) {
    this.left = select(elements.prevPage, this.pagination)
    this.right = select(elements.nextPage, this.pagination)
  }

  this.page = 0

  this.onClick = this.onClick.bind(this)
  this.onResponse = this.onResponse.bind(this)
  this.pageSize = this.pageSize.bind(this)
  if (this.paginate && this.pagination) {
    on(this.pagination, 'click', this.onClick)
  }
  if (this.paginate) {
    bus.on('response', this.onResponse)
    bus.addAction('Pagination/pageSize', this.addPageSizeToRequest, this)
    bus.addAction('Pagination/getCurrentPage', this.getCurrentPage, this)
  }
}

Pagination.prototype.onClick = function onClick (e) {
  e && pd(e)
  if (this.incrementPage(e) !== false) {
    this.bus.emit('request', this.bus.applyFilter('Pagination/onClick/request', [
      'Bus/getPreviousRequest',
      'Pagination/pageSize',
      'Pagination/getCurrentPage'
    ]))
  }
}

Pagination.prototype.onResponse = function onResponse (req, res) {
  this.updatePagination(res)
  this.updateDOM()
}

Pagination.prototype.incrementPage = function incrementPage (e) {
  let el = e.target
  const prevClass = this.elements.prevPage.replace('.', '')
  const nextClass = this.elements.nextPage.replace('.', '')
  if (!hasClass(el, 'is-active')) {
    return false
  }
  if (hasClass(el, prevClass)) {
    return (this.page--)
  }

  if (hasClass(e.target, nextClass)) {
    return (this.page++)
  }

  return false
}

Pagination.prototype.updatePagination = function updatePagination (response) {
  this.pageCount = Number(response.pageCount)
  this.page = Number(response.page)
}

Pagination.prototype.addPageSizeToRequest = function addPageSizeToRequest (request, next) {
  Object.assign(request, {
    pageSize: this.pageSize()
  })
  next(request)
}

Pagination.prototype.pageSize = function pageSize () {
  let pageSize = this.settings.pageSize
  if (
    window.innerWidth < this.settings.mobileBreakpoint &&
    this.settings.mobilePageSize
  ) {
    this.pageSize = this.settings.mobilePageSize
  }
  return pageSize
}

Pagination.prototype.getCurrentPage = function getCurrentPage (request, next) {
  next(
    (request['page'] = this.page, request)
  )
}

Pagination.prototype.updateDOM = function updateDOM () {
  if (this.pagination && this.pageCount > 1) {
    this.pagination.classList.add('is-active')
  }
  if (this.left) {
    this.left.classList[ this.hasPrevPage() ? 'add' : 'remove' ]('is-active')
  }
  if (this.right) {
    this.right.classList[ this.hasNextPage() ? 'add' : 'remove' ]('is-active')
  }
}

Pagination.prototype.hasPrevPage = function hasPrevPage () {
  return this.page >= 1
}

Pagination.prototype.hasNextPage = function hasNextPage () {
  return (this.page + 1) < this.pageCount
}

Pagination.prototype.destroy = function destroy () {
  if (this.pagination) {
    off(this.pagination, 'click', this.onClick)
  }
}

export default Pagination
