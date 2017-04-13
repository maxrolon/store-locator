import StoreLocator from '../src/'
import nanoajax from 'nanoajax'
import mock from './helpers/mock-request'

let storeLocator = new StoreLocator()

const APIENDPOINT = 'https://fpq6p90dm9.execute-api.us-west-2.amazonaws.com/prod/vip-store-locator-request'

const convertToQueryString = data => (
  Object.keys( data ).map( key => `${key}=${data[key]}` ).join( '&' )
)

const cleanupResponse = ( request, response ) => {
  if ( !response.locations ) {
    response.locations = []
    return response
  }

  response.locations.map( val => {
    Object.keys( val ).map( key => {
      if ( key === 'otherBrands' ) {
        let carries = ( val[ key ][ 0 ].otherBrand || [] ).concat( request.brand || [] )
        val[ 'carries' ] = Object.keys( carries.reduce( ( obj, val ) => {
          obj[ val ] = 1
          return obj
        }, {} ) ).join( ', ' )
      } else if ( key === 'dba' ) {
        val[ 'name' ] = val[ key ][ 0 ]
      } else if ( key === 'long' ) {
        val[ 'lng' ] = val[ key ][ 0 ]
      } else if ( typeof val[ key ][ 0 ] === 'string' ) {
        val[ key ] = val[ key ][ 0 ]
      }
    } )

    delete val.otherBrands
    delete val.packageSizes
    delete val.packageTypes
    delete val.packages
  } )

  return response
}

StoreLocator.attachAjaxHandler( ( request, next ) => {
  let qs = convertToQueryString( Object.keys( request ).reduce( ( obj, key ) => {
    if ( key === 'lng' ) {
      obj[ 'long' ] = request[ key ]
    } else if ( key !== 'address' ) {
      obj[ key ] = request[ key ]
    }
    return obj
  }, {} ) )

  nanoajax.ajax( { url: `${APIENDPOINT}?${qs}` }, ( code, text ) => {
    if ( code === 200 ) {
      let res = cleanupResponse( request, JSON.parse( text ) )
      next( res )
    } else {
      console.error( code )
    }
  } )

} )
