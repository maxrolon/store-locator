import StoreLocater, { Components } from '../../src/'

export class fakeMap extends Components.Map {
  constructor( opts ) {
    super( opts )
    if ( opts.spy ) opts.spy()
  }
}

