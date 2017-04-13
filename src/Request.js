import Emitter from './lib/emitter'

let actions = {}
let ajaxHandler = () => {}
let previousRequest = {}

class Request {

  constructor( actions = [], request = {} ) {
    if ( !this.validateRequest( request ) ) {
      console.log( 'error' )
    }

    let q = this.createAsyncQueue( request, actions )()
  }

  createAsyncQueue( request, queue ) {
    if ( !queue.length ) {
      ajaxHandler( request, res => (
        Request.validateResponse( request, res )
      ) )
      return () => {}
    }

    queue.push( ( request ) => {
      ajaxHandler( request, res => (
        Request.validateResponse( request, res )
      ) )
    } )

    return queue.reverse().reduce( ( a, b ) => {
      return actions[ b ].fn.bind( actions[ b ].ctx, request, a )
    } )
  }

  validateRequest( request ) {
    return true
  }

  static ajaxHandler() {
    return ajaxHandler
  }

  static attachAjaxHandler( fn ) {
    ajaxHandler = fn
  }

  static validateResponse( req, res ) {
    previousRequest = Object.assign( {}, req )
    Emitter.emit( 'request-complete', req, res )
  }

  static addAction( name, fn, ctx ) {
    actions[ name ] = {
      ctx: ctx,
      fn: fn,
    }
  }

  static getPreviousRequest( request, next ) {
    Object.assign( request, previousRequest )
    next( request )
  }

}

Request.addAction( 'Request/getPreviousRequest', Request.getPreviousRequest, Request )

export default Request
