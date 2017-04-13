import {select, on} from './lib/dom'
import Emitter from './lib/emitter'
import {
  clearElement,
  hasClass,
  show,
  pd,
} from './lib/utils'
import Request from './Request'

class Sidebar {
  constructor( { SIDEBAR, GEO_TRIGGER, GEO_FEEDBACK, FILTERS, SIDEBAR_TEMPLATE } ) {

    this.SIDEBAR_TEMPLATE = SIDEBAR_TEMPLATE

    this.sidebar = select( SIDEBAR )
    this.geotrigger = select( GEO_TRIGGER )
    this.geofeedback = select( GEO_FEEDBACK )
    this.filters = select( FILTERS, document.body, true )

    Emitter.on( 'request-complete', ( req, res ) => {
      clearElement( this.sidebar )
      this.addToSidebar( res )
    } )

    if ( this.geotrigger ) {
      on( this.geotrigger, 'click', e => {
        pd( e )
        show( this.geofeedback )
        Emitter.emit( 'request', [
          'Form/getValues',
          'Pagination/pageSize',
          'Sidebar/geolocation',
          'Sidebar/getFilters',
          'Map/Geocode',
        ] )
      } )
    }

    if ( this.filters.length ) {
      this.filters.map( el => {
        on( el, 'change', e => {
          pd( e )
          Emitter.emit( 'request', [
            'Form/getValues',
            'Sidebar/getFilters',
            'Pagination/pageSize',
            'Map/Geocode',
          ] )
        } )
      } )
    }

    Request.addAction( 'Sidebar/getFilters', this.getFilters, this )
    Request.addAction( 'Sidebar/geolocation', this.geolocation, this )
  }

  addToSidebar( response ) {
    if ( !response.locations.length ) {
      return this.noResults()
    }

    this.sidebar.scrollTop = 0

    response.locations.map( location => {
      let HTML = this.SIDEBAR_TEMPLATE( location )
      let item = document.createElement( 'div' )

      on( item, 'click', e => {
        if ( hasClass( e.target, 'js-show-marker' ) ) {
          pd( e )
        }
        Emitter.emit( 'focus-on-marker', location.name, e )
      } )

      item.innerHTML = HTML
      this.sidebar.appendChild( item )
    } )
  }

  noResults() {
    this.sidebar.innerHTML = `
    <p class="h6 c-gold mxa mt1">No Results Found</p>
    <p class="mxa">Please enter a zip code to find a store near you.</p>`
  }

  getFilters( request, next ) {
    let vals = this.filters.reduce( ( obj, el ) => {
      let attr = el.getAttribute( 'name' )
      if ( !el.checked ) return obj
      if ( !obj[ attr ] ) obj[ attr ] = []
      obj[ el.getAttribute( 'name' ) ].push( el.value )
      return obj
    }, {} )

    if ( request.address || ( request.lng && request.lat ) ) {
      next( Object.assign( request, vals ) )
    }
  }

  geolocation( request, next ) {
    this.geofeedback.style.display = 'block'

    navigator.geolocation.getCurrentPosition( res => {
      next( Object.assign( request, {
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      } ) )
    } )
  }
}

export default Sidebar
