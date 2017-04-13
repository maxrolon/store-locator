import Request from './Request'
import Map from './Map'
import Form from './Form'
import Sidebar from './Sidebar'
import Pagination from './Pagination'

import Emitter from './lib/emitter'

import * as Defaults from './lib/constants'
import * as Templates from './lib/templates'

let instance = null
let components = { Map, Form, Sidebar, Pagination }

class StoreLocator {

  static Components() {
    return components
  }

  constructor( opts ) {
    if ( instance ) {
      return instance
    } else {
      instance = this
    }

    opts = Object.assign( {}, Defaults, Templates, opts )

    Object.keys( components ).map( key => {
      this[ key ] = new components[ key ]( opts )
    } )

    return instance
  }

  static attachComponent( name, component ) {
    components[name] = component
  }

  static attachAjaxHandler( fn ) {
    Request.attachAjaxHandler( fn )
  }

  static reset() {
    instance = null
  }
}

Emitter.on( 'request', ( actions, req ) => {
  return new Request( actions, req )
} )

export const Components = { Map, Form, Request, Sidebar, Emitter, Pagination }

export default StoreLocator
