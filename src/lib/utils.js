import {select, on} from './dom'

export const scrollToTop = el => el.scrollTop = 0

export const clearElement = el => el.innerHTML = ''

export const formatNumber = text => ( text.length === 10 ? text.replace( /^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3' ) : text )

export const toTitleCase = str => (
  str.replace( /\w\S*/g, text => text.charAt( 0 ).toUpperCase() + text.substr( 1 ).toLowerCase() )
)

export const endpointError = text => console.error( text )

export const clearVal = el => el.value = ''

export const addVal = ( str, el ) => el.value = str

export const show = el => el.classList.add( 'is-visible' )

export const hide = el => el.classList.remove( 'is-visible' )

export const hasClass = ( el, str ) => el.classList.contains( str )

export const iconSize = zoom => zoom * 1.3

export const pd = e => e.preventDefault()
