import {
  pd,
  select,
  on,
  off
} from './lib/utils'

function Form ({elements}, bus) {
  this.bus = bus
  this.form = select(elements.form)
  on(this.form, 'submit', this.onSubmit)

  bus.addAction('Form/validate', this.validate, this)
  bus.addAction('Form/getValues', this.getValues, this)
  bus.on('response', this.updateAddress.bind(this))
}

Form.prototype.onSubmit = function onSubmit (e) {
  e && pd(e)
  this.bus.emit('request', [
    'Form/validate',
    'Form/getValues',
    'Sidebar/getFilters',
    'Pagination/pageSize',
    'Map/Geocode'
  ])
}

Form.prototype.validate = function validate (request, next) {
  // this can be filled out..
  next()
}

Form.prototype.getValues = function getValues (request, next) {
  let els = select('[name]', this.form, true)
  els.map(el => {
    if (el.value) {
      request[ el.getAttribute('name') ] = el.value
    }
  })
  next(request)
}

Form.prototype.updateAddress = function updateAddress (request, response) {
  const el = select('[name="address"]', this.form)
  el && (el.value = request.address)
}

Form.prototype.destroy = function destroy () {
  off(this.form, 'submit', this.onSubmit)
}

export default Form
