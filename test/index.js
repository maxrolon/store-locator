import test from 'ava'
import sinon from 'sinon'
import {} from './helpers/mocks.js'
import StoreLocater, { Components } from '../src/'
import { fakeMap } from './helpers/mocks'

test( 'StoreLocater is singleton', t => {
	let storelocater1 = new StoreLocater()
	let storelocater2 = new StoreLocater()
	t.true( storelocater1 === storelocater2 )
} )

test( 'Components can be added in', t => {
  StoreLocater.reset()
  let spy = sinon.spy()
  StoreLocater.attachComponent( 'Map', fakeMap )
  new StoreLocater( { spy: spy } )
	t.true( spy.called )
} )

test( 'Handler method can be added in', t => {
  StoreLocater.reset()
  let spy = sinon.spy()
  StoreLocater.attachAjaxHandler( spy )
  Components.Request.ajaxHandler()()
	t.true( spy.called )
} )

test( 'request event firing triggers async queue execution', t => {
  StoreLocater.reset()
  let spy = sinon.spy()
  StoreLocater.attachAjaxHandler( spy )
  Components.Emitter.emit( 'request', [], {foo: 'foo'} )
	t.true( spy.called )
} )

test( 'action is called when request is triggered', t => {
  StoreLocater.reset()
  let spy = sinon.spy()
  Components.Request.addAction( 'Test/spy', spy, null )
  Components.Emitter.emit( 'request', ['Test/spy'], {foo: 'foo'} )
	t.true( spy.called )
} )

test( 'Handler is fired after action is added in', t => {
  StoreLocater.reset()
  let spy = sinon.spy()
  StoreLocater.attachAjaxHandler( spy )
  Components.Request.addAction( 'Test/spy', ( request, next ) => (
    request['bar'] = 'bar', next( request )
  ), null )
  Components.Emitter.emit( 'request', ['Test/spy'], {foo: 'foo'} )
  let request = spy.getCall(0).args[0]
	t.true( spy.called )
	t.true( request.bar == 'bar' )
} )
