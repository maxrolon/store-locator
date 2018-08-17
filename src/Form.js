import Emitter from './lib/emitter'
import Request from './Request'
import {
  pd,
  select,
  on
} from './lib/utils'

class Form {
  constructor ({FORM}) {
    this.form = select(FORM)

    if (this.form) {
      on(this.form, 'submit', e => {
        pd(e)
        Emitter.emit('request', [
          'Form/validate',
          'Form/getValues',
          'Sidebar/getFilters',
          'Pagination/pageSize',
          'Map/Geocode'
        ])
      })
    }

    Request.addAction('Form/validate', this.validate, this)
    Request.addAction('Form/getValues', this.getValues, this)

    Emitter.on('request-complete', (req, res) => this.updateAddress(req, res))
  }

  validate (request, next) {
    next(request)
  }

  getValues (request, next) {
    let els = select('[name]', this.form, true)
    els.map(el => {
      if (el.value) {
        request[ el.getAttribute('name') ] = el.value
      }
    })
    next(request)
  }

  updateAddress (req, res) {
    select('[name="address"]', this.form).value = req.address
  }
}

export default Form
