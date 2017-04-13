/*eslint-disable */
export const select = ( selector, parent, all = false ) => {
  parent || ( parent = document )
  if ( all ) {
    return Array.prototype.slice.call( parent.querySelectorAll( selector ) )
  } else {
    return parent.querySelector( selector )
  }
}

export const on = ( element, event, callback, capture ) => {
  !element.addEventListener && ( event = 'on' + event );
  ( element.addEventListener || element.attachEvent ).call( element, event, callback, capture )
  return callback;
}

export const off = ( element, event, callback, capture ) => {
  !element.removeEventListener && ( event = 'on' + event );
  ( element.removeEventListener || element.detachEvent ).call( element, event, callback, capture )
  return callback;
}
/*eslint-enable */
