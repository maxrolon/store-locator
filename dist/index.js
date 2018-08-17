function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Emitter = _interopDefault(require('event-emitter'));
var Loader = _interopDefault(require('google-maps'));

var emitter = Emitter();


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtaXR0ZXIuanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYTtBQUVwQixLQUFBLENBQU0sVUFBVSxPQUFBO0FBRWhCLGVBQWU7QUFKZiIsImZpbGUiOiJlbWl0dGVyLmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbWl0dGVyIGZyb20gJ2V2ZW50LWVtaXR0ZXInXG5cbmNvbnN0IGVtaXR0ZXIgPSBFbWl0dGVyKClcblxuZXhwb3J0IGRlZmF1bHQgZW1pdHRlclxuIl19

var actions = {};
var ajaxHandler = function () {};
var previousRequest = {};
var Request = function Request(actions, request) {
    if ( actions === void 0 ) actions = [];
    if ( request === void 0 ) request = {};

    if (!this.validateRequest(request)) {
        console.log('error');
    }
    this.createAsyncQueue(request, actions)();
};
Request.prototype.createAsyncQueue = function createAsyncQueue (request, queue) {
    if (!queue.length) {
        ajaxHandler(request, function (res) { return Request.validateResponse(request, res); });
        return function () {};
    }
    queue.push(function (request) {
        ajaxHandler(request, function (res) { return Request.validateResponse(request, res); });
    });
    return queue.reverse().reduce(function (a, b) { return actions[b].fn.bind(actions[b].ctx, request, a); });
};
Request.prototype.validateRequest = function validateRequest (request) {
    return true;
};
Request.ajaxHandler = function ajaxHandler$1 () {
    return ajaxHandler;
};
Request.attachAjaxHandler = function attachAjaxHandler (fn) {
    ajaxHandler = fn;
};
Request.validateResponse = function validateResponse (req, res) {
    previousRequest = Object.assign({}, req);
    emitter.emit('request-complete', req, res);
};
Request.addAction = function addAction (name, fn, ctx) {
    actions[name] = {
        ctx: ctx,
        fn: fn
    };
};
Request.getPreviousRequest = function getPreviousRequest (request, next) {
    Object.assign(request, previousRequest);
    next(request);
};
Request.addAction('Request/getPreviousRequest', Request.getPreviousRequest, Request);


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVlc3QuanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYTtBQUVwQixHQUFBLENBQUksVUFBVTtBQUNkLEdBQUEsQ0FBSSxpQkFBYyxHQUFNLENBQXhCO0FBQ0EsR0FBQSxDQUFJLGtCQUFrQjtBQUV0QixNQUFNLFFBQVE7SUFDWixZQUFhLE9BQUEsR0FBVSxFQUFJLEVBQUEsT0FBQSxHQUFVLElBQUk7UUFDdkMsSUFBSSxDQUFDLElBQUEsQ0FBSyxlQUFMLENBQXFCLFVBQVU7WUFDbEMsT0FBQSxDQUFRLEdBQVIsQ0FBWTtRQUNsQjtRQUVJLElBQUEsQ0FBSyxnQkFBTCxDQUFzQixTQUFTLFFBQS9CO0lBQ0o7SUFFRSxpQkFBa0IsT0FBUyxFQUFBLE9BQU87UUFDaEMsSUFBSSxDQUFDLEtBQUEsQ0FBTSxRQUFRO1lBQ2pCLFdBQUEsQ0FBWSxTQUFTLEdBQUEsSUFDbkIsT0FBQSxDQUFRLGdCQUFSLENBQXlCLFNBQVM7WUFFcEMsVUFBTyxHQUFNLENBQW5CO1FBQ0E7UUFFSSxLQUFBLENBQU0sSUFBTixDQUFZLE9BQUQsSUFBYTtZQUN0QixXQUFBLENBQVksU0FBUyxHQUFBLElBQ25CLE9BQUEsQ0FBUSxnQkFBUixDQUF5QixTQUFTO1FBRTFDO1FBRUksT0FBTyxLQUFBLENBQU0sT0FBTixFQUFBLENBQWdCLE1BQWhCLEVBQXdCLENBQUcsRUFBQSxHQUFKLEdBQ3JCLE9BQUEsQ0FBUyxFQUFULENBQWEsRUFBYixDQUFnQixJQUFoQixDQUFxQixPQUFBLENBQVMsRUFBVCxDQUFhLEtBQUssU0FBUztJQUU3RDtJQUVFLGdCQUFpQixTQUFTO1FBQ3hCLE9BQU87SUFDWDtJQUVFLE9BQU8sY0FBZTtRQUNwQixPQUFPO0lBQ1g7SUFFRSxPQUFPLGtCQUFtQixJQUFJO1FBQzVCLFdBQUEsQ0FBQSxDQUFBLENBQWM7SUFDbEI7SUFFRSxPQUFPLGlCQUFrQixHQUFLLEVBQUEsS0FBSztRQUNqQyxlQUFBLENBQUEsQ0FBQSxDQUFrQixNQUFBLENBQU8sTUFBUCxDQUFjLElBQUk7UUFDcEMsT0FBQSxDQUFRLElBQVIsQ0FBYSxvQkFBb0IsS0FBSztJQUMxQztJQUVFLE9BQU8sVUFBVyxJQUFNLEVBQUEsRUFBSSxFQUFBLEtBQUs7UUFDL0IsT0FBQSxDQUFTLEtBQVQsQ0FBQSxDQUFBLENBQWtCO1lBQ2hCLEtBQUssR0FEVyxDQUFBO1lBRWhCLElBQUk7O0lBRVY7SUFFRSxPQUFPLG1CQUFvQixPQUFTLEVBQUEsTUFBTTtRQUN4QyxNQUFBLENBQU8sTUFBUCxDQUFjLFNBQVM7UUFDdkIsSUFBQSxDQUFLO0lBQ1Q7QUFDQTtBQUVBLE9BQUEsQ0FBUSxTQUFSLENBQWtCLDhCQUE4QixPQUFBLENBQVEsb0JBQW9CO0FBRTVFLGVBQWU7QUFsRWYiLCJmaWxlIjoiUmVxdWVzdC5qcyhvcmlnaW5hbCkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRW1pdHRlciBmcm9tICcuL2xpYi9lbWl0dGVyJ1xuXG5sZXQgYWN0aW9ucyA9IHt9XG5sZXQgYWpheEhhbmRsZXIgPSAoKSA9PiB7fVxubGV0IHByZXZpb3VzUmVxdWVzdCA9IHt9XG5cbmNsYXNzIFJlcXVlc3Qge1xuICBjb25zdHJ1Y3RvciAoYWN0aW9ucyA9IFtdLCByZXF1ZXN0ID0ge30pIHtcbiAgICBpZiAoIXRoaXMudmFsaWRhdGVSZXF1ZXN0KHJlcXVlc3QpKSB7XG4gICAgICBjb25zb2xlLmxvZygnZXJyb3InKVxuICAgIH1cblxuICAgIHRoaXMuY3JlYXRlQXN5bmNRdWV1ZShyZXF1ZXN0LCBhY3Rpb25zKSgpXG4gIH1cblxuICBjcmVhdGVBc3luY1F1ZXVlIChyZXF1ZXN0LCBxdWV1ZSkge1xuICAgIGlmICghcXVldWUubGVuZ3RoKSB7XG4gICAgICBhamF4SGFuZGxlcihyZXF1ZXN0LCByZXMgPT4gKFxuICAgICAgICBSZXF1ZXN0LnZhbGlkYXRlUmVzcG9uc2UocmVxdWVzdCwgcmVzKVxuICAgICAgKSlcbiAgICAgIHJldHVybiAoKSA9PiB7fVxuICAgIH1cblxuICAgIHF1ZXVlLnB1c2goKHJlcXVlc3QpID0+IHtcbiAgICAgIGFqYXhIYW5kbGVyKHJlcXVlc3QsIHJlcyA9PiAoXG4gICAgICAgIFJlcXVlc3QudmFsaWRhdGVSZXNwb25zZShyZXF1ZXN0LCByZXMpXG4gICAgICApKVxuICAgIH0pXG5cbiAgICByZXR1cm4gcXVldWUucmV2ZXJzZSgpLnJlZHVjZSgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGFjdGlvbnNbIGIgXS5mbi5iaW5kKGFjdGlvbnNbIGIgXS5jdHgsIHJlcXVlc3QsIGEpXG4gICAgfSlcbiAgfVxuXG4gIHZhbGlkYXRlUmVxdWVzdCAocmVxdWVzdCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBzdGF0aWMgYWpheEhhbmRsZXIgKCkge1xuICAgIHJldHVybiBhamF4SGFuZGxlclxuICB9XG5cbiAgc3RhdGljIGF0dGFjaEFqYXhIYW5kbGVyIChmbikge1xuICAgIGFqYXhIYW5kbGVyID0gZm5cbiAgfVxuXG4gIHN0YXRpYyB2YWxpZGF0ZVJlc3BvbnNlIChyZXEsIHJlcykge1xuICAgIHByZXZpb3VzUmVxdWVzdCA9IE9iamVjdC5hc3NpZ24oe30sIHJlcSlcbiAgICBFbWl0dGVyLmVtaXQoJ3JlcXVlc3QtY29tcGxldGUnLCByZXEsIHJlcylcbiAgfVxuXG4gIHN0YXRpYyBhZGRBY3Rpb24gKG5hbWUsIGZuLCBjdHgpIHtcbiAgICBhY3Rpb25zWyBuYW1lIF0gPSB7XG4gICAgICBjdHg6IGN0eCxcbiAgICAgIGZuOiBmblxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRQcmV2aW91c1JlcXVlc3QgKHJlcXVlc3QsIG5leHQpIHtcbiAgICBPYmplY3QuYXNzaWduKHJlcXVlc3QsIHByZXZpb3VzUmVxdWVzdClcbiAgICBuZXh0KHJlcXVlc3QpXG4gIH1cbn1cblxuUmVxdWVzdC5hZGRBY3Rpb24oJ1JlcXVlc3QvZ2V0UHJldmlvdXNSZXF1ZXN0JywgUmVxdWVzdC5nZXRQcmV2aW91c1JlcXVlc3QsIFJlcXVlc3QpXG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVlc3RcbiJdfQ==

var clearElement = function (el) { return el.innerHTML = ''; };
var endpointError = function (text) { return console.error(text); };
var show = function (el) { return el.classList.add('is-visible'); };
var hide = function (el) { return el.classList.remove('is-visible'); };
var hasClass = function (el, str) { return el.classList.contains(str); };
var iconSize = function (zoom) { return zoom * 1.3; };
var pd = function (e) { return e.preventDefault(); };
var select = function (selector, parent, all) {
    if ( parent === void 0 ) parent = document;
    if ( all === void 0 ) all = false;

    return all ? [].slice.call(parent.querySelectorAll(selector)) : parent.querySelector(selector);
};
var on = function (element, event, callback, capture) {
    if (!element.addEventListener) {
        event = 'on' + event;
    }
    var method = element.addEventListener || element.attachEvent;
    method.call(element, event, callback, capture);
    return callback;
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUEsQ0FBTSxjQUFjLEVBQUEsSUFBTyxFQUFBLENBQUcsU0FBSCxDQUFBLENBQUEsQ0FBZTtBQUVqRCxPQUFPLEtBQUEsQ0FBTSxlQUFlLEVBQUEsSUFBTyxFQUFBLENBQUcsU0FBSCxDQUFBLENBQUEsQ0FBZTtBQUVsRCxPQUFPLEtBQUEsQ0FBTSxlQUFlLElBQUEsSUFBUyxJQUFBLENBQUssTUFBTCxDQUFBLEdBQUEsQ0FBZ0IsRUFBaEIsR0FBcUIsSUFBQSxDQUFLLE9BQUwsQ0FBYSwyQkFBMkIsY0FBYztBQUVoSCxPQUFPLEtBQUEsQ0FBTSxjQUFjLEdBQUEsSUFDekIsR0FBQSxDQUFJLE9BQUosQ0FBWSxVQUFVLElBQUEsSUFBUSxJQUFBLENBQUssTUFBTCxDQUFZLEVBQVosQ0FBZSxXQUFmLEVBQUEsQ0FBQSxDQUFBLENBQStCLElBQUEsQ0FBSyxNQUFMLENBQVksRUFBWixDQUFlLFdBQWY7QUFHL0QsT0FBTyxLQUFBLENBQU0sZ0JBQWdCLElBQUEsSUFBUSxPQUFBLENBQVEsS0FBUixDQUFjO0FBRW5ELE9BQU8sS0FBQSxDQUFNLFdBQVcsRUFBQSxJQUFPLEVBQUEsQ0FBRyxLQUFILENBQUEsQ0FBQSxDQUFXO0FBRTFDLE9BQU8sS0FBQSxDQUFNLFVBQVUsR0FBSyxFQUFBLElBQU4sR0FBYyxFQUFBLENBQUcsS0FBSCxDQUFBLENBQUEsQ0FBVztBQUUvQyxPQUFPLEtBQUEsQ0FBTSxPQUFPLEVBQUEsSUFBTSxFQUFBLENBQUcsU0FBSCxDQUFhLEdBQWIsQ0FBaUI7QUFFM0MsT0FBTyxLQUFBLENBQU0sT0FBTyxFQUFBLElBQU0sRUFBQSxDQUFHLFNBQUgsQ0FBYSxNQUFiLENBQW9CO0FBRTlDLE9BQU8sS0FBQSxDQUFNLFlBQVksRUFBSSxFQUFBLEtBQUwsR0FBYSxFQUFBLENBQUcsU0FBSCxDQUFhLFFBQWIsQ0FBc0I7QUFFM0QsT0FBTyxLQUFBLENBQU0sV0FBVyxJQUFBLElBQVEsSUFBQSxDQUFBLENBQUEsQ0FBTztBQUV2QyxPQUFPLEtBQUEsQ0FBTSxLQUFLLENBQUEsSUFBSyxDQUFBLENBQUUsY0FBRjtBQUV2QixPQUFPLEtBQUEsQ0FBTSxVQUFVLFFBQVUsRUFBQSxNQUFBLEdBQVMsUUFBVSxFQUFBLEdBQUEsR0FBTSxPQUFwQyxHQUNaLEdBQUEsR0FDSixFQUFBLENBQUcsS0FBSCxDQUFTLElBQVQsQ0FBYyxNQUFBLENBQU8sZ0JBQVAsQ0FBd0IsYUFDdEMsTUFBQSxDQUFPLGFBQVAsQ0FBcUI7QUFJM0IsT0FBTyxLQUFBLENBQU0sTUFBTSxPQUFTLEVBQUEsS0FBTyxFQUFBLFFBQVUsRUFBQSxTQUEzQixHQUF1QztJQUN2RCxJQUFJLENBQUMsT0FBQSxDQUFRLGtCQUFrQjtRQUM3QixLQUFBLENBQUEsQ0FBQSxDQUFRLElBQUEsQ0FBQSxDQUFBLENBQU87SUFDbkI7SUFDRSxLQUFBLENBQU0sU0FBUyxPQUFBLENBQVEsZ0JBQVIsQ0FBQSxFQUFBLENBQTRCLE9BQUEsQ0FBUTtJQUNuRCxNQUFBLENBQU8sSUFBUCxDQUFZLFNBQVMsT0FBTyxVQUFVO0lBQ3RDLE9BQU87QUFDVDtBQUVBLE9BQU8sS0FBQSxDQUFNLE9BQU8sT0FBUyxFQUFBLEtBQU8sRUFBQSxRQUFVLEVBQUEsU0FBM0IsR0FBdUM7SUFDeEQsSUFBSSxDQUFDLE9BQUEsQ0FBUSxxQkFBcUI7UUFDaEMsS0FBQSxDQUFBLENBQUEsQ0FBUSxJQUFBLENBQUEsQ0FBQSxDQUFPO0lBQ25CO0lBQ0UsS0FBQSxDQUFNLFNBQVMsT0FBQSxDQUFRLG1CQUFSLENBQUEsRUFBQSxDQUErQixPQUFBLENBQVE7SUFDdEQsTUFBQSxDQUFPLElBQVAsQ0FBWSxTQUFTLE9BQU8sVUFBVTtJQUN0QyxPQUFPO0FBQ1Q7QUFqREEiLCJmaWxlIjoidXRpbHMuanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHNjcm9sbFRvVG9wID0gZWwgPT4gKGVsLnNjcm9sbFRvcCA9IDApXG5cbmV4cG9ydCBjb25zdCBjbGVhckVsZW1lbnQgPSBlbCA9PiAoZWwuaW5uZXJIVE1MID0gJycpXG5cbmV4cG9ydCBjb25zdCBmb3JtYXROdW1iZXIgPSB0ZXh0ID0+ICh0ZXh0Lmxlbmd0aCA9PT0gMTAgPyB0ZXh0LnJlcGxhY2UoL14oXFxkezN9KShcXGR7M30pKFxcZHs0fSkkLywgJyQxLSQyLSQzJykgOiB0ZXh0KVxuXG5leHBvcnQgY29uc3QgdG9UaXRsZUNhc2UgPSBzdHIgPT4gKFxuICBzdHIucmVwbGFjZSgvXFx3XFxTKi9nLCB0ZXh0ID0+IHRleHQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0ZXh0LnN1YnN0cigxKS50b0xvd2VyQ2FzZSgpKVxuKVxuXG5leHBvcnQgY29uc3QgZW5kcG9pbnRFcnJvciA9IHRleHQgPT4gY29uc29sZS5lcnJvcih0ZXh0KVxuXG5leHBvcnQgY29uc3QgY2xlYXJWYWwgPSBlbCA9PiAoZWwudmFsdWUgPSAnJylcblxuZXhwb3J0IGNvbnN0IGFkZFZhbCA9IChzdHIsIGVsKSA9PiAoZWwudmFsdWUgPSBzdHIpXG5cbmV4cG9ydCBjb25zdCBzaG93ID0gZWwgPT4gZWwuY2xhc3NMaXN0LmFkZCgnaXMtdmlzaWJsZScpXG5cbmV4cG9ydCBjb25zdCBoaWRlID0gZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpXG5cbmV4cG9ydCBjb25zdCBoYXNDbGFzcyA9IChlbCwgc3RyKSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMoc3RyKVxuXG5leHBvcnQgY29uc3QgaWNvblNpemUgPSB6b29tID0+IHpvb20gKiAxLjNcblxuZXhwb3J0IGNvbnN0IHBkID0gZSA9PiBlLnByZXZlbnREZWZhdWx0KClcblxuZXhwb3J0IGNvbnN0IHNlbGVjdCA9IChzZWxlY3RvciwgcGFyZW50ID0gZG9jdW1lbnQsIGFsbCA9IGZhbHNlKSA9PiB7XG4gIHJldHVybiAoYWxsXG4gICAgPyBbXS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgICA6IHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICApXG59XG5cbmV4cG9ydCBjb25zdCBvbiA9IChlbGVtZW50LCBldmVudCwgY2FsbGJhY2ssIGNhcHR1cmUpID0+IHtcbiAgaWYgKCFlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBldmVudCA9ICdvbicgKyBldmVudFxuICB9XG4gIGNvbnN0IG1ldGhvZCA9IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciB8fCBlbGVtZW50LmF0dGFjaEV2ZW50XG4gIG1ldGhvZC5jYWxsKGVsZW1lbnQsIGV2ZW50LCBjYWxsYmFjaywgY2FwdHVyZSlcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbmV4cG9ydCBjb25zdCBvZmYgPSAoZWxlbWVudCwgZXZlbnQsIGNhbGxiYWNrLCBjYXB0dXJlKSA9PiB7XG4gIGlmICghZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgZXZlbnQgPSAnb24nICsgZXZlbnRcbiAgfVxuICBjb25zdCBtZXRob2QgPSBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgfHwgZWxlbWVudC5kZXRhY2hFdmVudFxuICBtZXRob2QuY2FsbChlbGVtZW50LCBldmVudCwgY2FsbGJhY2ssIGNhcHR1cmUpXG4gIHJldHVybiBjYWxsYmFja1xufVxuIl19

var Map = function Map(ref) {
    var this$1 = this;
    var MAP_KEY = ref.MAP_KEY;
    var MAP_LANG = ref.MAP_LANG;
    var MAP_REGION = ref.MAP_REGION;
    var MAP = ref.MAP;
    var MAP_DEFAULTS = ref.MAP_DEFAULTS;
    var ICON_PATH = ref.ICON_PATH;
    var ICON_SIZE = ref.ICON_SIZE;
    var MARKER_TEMPLATE = ref.MARKER_TEMPLATE;
    var FETCH_LOCATIONS_FROM_CENTER = ref.FETCH_LOCATIONS_FROM_CENTER;

    this.markers = [];
    this.map = select(MAP);
    this.iconPath = (function (location) {
        if (typeof ICON_PATH.bind === 'undefined') {
            return ICON_PATH;
        }
        return ICON_PATH(location);
    });
    this.iconSize = (function (location, zoom) {
        if (ICON_SIZE) {
            return ICON_SIZE(location, zoom);
        }
        return iconSize(zoom);
    });
    this.markerTemplate = MARKER_TEMPLATE;
    this.fetchFromCenter = select(FETCH_LOCATIONS_FROM_CENTER);
    Loader.LIBRARIES = ['geometry','places'];
    Loader.KEY = MAP_KEY;
    Loader.LANGUAGE = MAP_LANG;
    Loader.REGION = MAP_REGION;
    emitter.on('request-complete', function (req, res) { return this$1.updateMap(req, res); });
    emitter.on('focus-on-marker', function (name) { return this$1.focusOnMarker(name); });
    emitter.on('zoom-changed', function () { return this$1.updateIcons(); });
    emitter.on('dragend', function () { return this$1.showCenterButton(); });
    Loader.load(function (Google) {
        this$1.Google = Google;
        this$1.Map = new Google.maps.Map(this$1.map, MAP_DEFAULTS);
        this$1.Geocoder = new Google.maps.Geocoder();
        this$1.Map.addListener('dragend', function () { return emitter.emit('dragend'); });
        this$1.Map.addListener('zoom_changed', function () { return emitter.emit('zoom-changed'); });
    });
    if (this.fetchFromCenter) {
        on(this.fetchFromCenter, 'click', function (e) {
            hide(e.target);
            pd(e);
            emitter.emit('request', ['Form/validate','Form/getValues','Map/hideCenterButton',
                'Map/getCenter','Sidebar/getFilters','Pagination/pageSize','Map/Geocode']);
        });
    }
    Request.addAction('Map/Geocode', this.geocode, this);
    Request.addAction('Map/getCenter', this.getCenter, this);
    Request.addAction('Map/hideCenterButton', this.hideCenterButton, this);
};
Map.prototype.updateMap = function updateMap (req, res) {
    var middle = {
        lat: Number(req.lat),
        lng: Number(req.lng)
    };
    this.resetCenter(middle);
    this.removeMarkers();
    this.addMarkers(req, res);
};
Map.prototype.removeMarkers = function removeMarkers () {
    this.markers.forEach(function (ref) {
            var marker = ref.marker;

            return marker.setMap(null);
        });
    this.markers = [];
};
Map.prototype.addMarkers = function addMarkers (req, res) {
        var this$1 = this;

    var locations = res.locations; if ( locations === void 0 ) locations = [];
    if (locations.length === []) {
        return;
    }
    locations.map(function (location, i) {
        this$1.addMarker(location, i + 1);
    });
};
Map.prototype.addMarker = function addMarker (location, i, marker, center) {
        var this$1 = this;
        if ( marker === void 0 ) marker = false;
        if ( center === void 0 ) center = false;

    var size = this.iconSize(location, this.Map.getZoom());
    marker = new this.Google.maps.Marker({
        position: {
            lat: Number(location.lat),
            lng: Number(location.lng)
        },
        icon: {
            url: this.iconPath(location),
            scaledSize: new this.Google.maps.Size(size, size)
        },
        zIndex: i,
        map: this.Map
    });
    if (!center) {
        marker.html = this.createMarkerHTML(location);
        marker.addListener('click', function () { return this$1.showModal(marker); });
        marker.name = location.name;
    } else {
        marker.name = 'center';
    }
    this.markers.push({
        location: location,
        marker: marker
    });
};
Map.prototype.focusOnMarker = function focusOnMarker (name) {
    var marker = this.markers.map(function (ref) {
            var marker = ref.marker;

            return marker;
        }).reduce(function (a, b) { return b.name === name ? b : a; });
    this.resetCenter(marker.getPosition());
    this.showModal(marker);
};
Map.prototype.resetCenter = function resetCenter (newPosition) {
    this.Map.setCenter(newPosition);
};
Map.prototype.getCenter = function getCenter (request, next) {
    var center = this.Map.getCenter();
    Object.assign(request, {
        lat: center.lat(),
        lng: center.lng(),
        address: false
    });
    next(request);
};
Map.prototype.showModal = function showModal (marker) {
    if (!this.InfoWindow) {
        this.InfoWindow = new this.Google.maps.InfoWindow({
            map: this.Map
        });
    }
    this.InfoWindow.setContent(marker.html);
    this.InfoWindow.open(this.Map, marker);
};
Map.prototype.updateIcons = function updateIcons () {
        var this$1 = this;

    this.markers.forEach(function (ref) {
            var location = ref.location;
            var marker = ref.marker;

        var size = this$1.iconSize(location, this$1.Map.getZoom());
        marker.setIcon({
            url: this$1.iconPath(location),
            scaledSize: new this$1.Google.maps.Size(size, size)
        });
    });
};
Map.prototype.geocode = function geocode (request, next) {
    var geocodeReq = {};
    var address = false;
    if (request.lat && request.lng) {
        geocodeReq['location'] = {
            lat: request.lat,
            lng: request.lng
        };
    } else {
        geocodeReq['address'] = request.address;
        address = true;
    }
    this.Geocoder.geocode(geocodeReq, function (res, status) {
        if (status === 'OK') {
            var location = res[0] || {};
            request['address'] = location.formatted_address || '';
            if (address) {
                request['lat'] = location.geometry.location.lat();
                request['lng'] = location.geometry.location.lng();
            }
            next(request);
        } else {
            endpointError('geocode error');
        }
    });
};
Map.prototype.createMarkerHTML = function createMarkerHTML (data) {
    return this.markerTemplate(data);
};
Map.prototype.showCenterButton = function showCenterButton () {
    show(this.fetchFromCenter);
};
Map.prototype.hideCenterButton = function hideCenterButton (request, next) {
    hide(this.fetchFromCenter);
    next(request);
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SyxRQUFMLENBQWMsT0FBZCxDQUFzQixhQUFhLEdBQUssRUFBQSxRQUFOLEdBQWlCO1lBQ2pELElBQUksTUFBQSxDQUFBLEdBQUEsQ0FBVyxNQUFNO2dCQUNuQixHQUFBLENBQUksV0FBVyxHQUFBLENBQUksRUFBSixDQUFBLEVBQUEsQ0FBVTtnQkFDekIsT0FBQSxDQUFRLFVBQVIsQ0FBQSxDQUFBLENBQXFCLFFBQUEsQ0FBUyxpQkFBVCxDQUFBLEVBQUEsQ0FBOEI7Z0JBQ25ELElBQUksU0FBUztvQkFDWCxPQUFBLENBQVEsTUFBUixDQUFBLENBQUEsQ0FBaUIsUUFBQSxDQUFTLFFBQVQsQ0FBa0IsUUFBbEIsQ0FBMkIsR0FBM0I7b0JBQ2pCLE9BQUEsQ0FBUSxNQUFSLENBQUEsQ0FBQSxDQUFpQixRQUFBLENBQVMsUUFBVCxDQUFrQixRQUFsQixDQUEyQixHQUEzQjtnQkFDM0I7Z0JBQ1EsSUFBQSxDQUFLO1lBQ2IsT0FBYTtnQkFDTCxhQUFBLENBQWM7WUFDdEI7UUFDQTtJQUNBO0lBRUUsaUJBQWtCLE1BQU07UUFDdEIsT0FBTyxJQUFBLENBQUssY0FBTCxDQUFvQjtJQUMvQjtJQUVFLG1CQUFvQjtRQUNsQixJQUFBLENBQUssSUFBQSxDQUFLO0lBQ2Q7SUFFRSxpQkFBa0IsT0FBUyxFQUFBLE1BQU07UUFDL0IsSUFBQSxDQUFLLElBQUEsQ0FBSztRQUNWLElBQUEsQ0FBSztJQUNUO0FBQ0E7QUFFQSxlQUFlO0FBcE5mIiwiZmlsZSI6Ik1hcC5qcyhvcmlnaW5hbCkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9hZGVyIGZyb20gJ2dvb2dsZS1tYXBzJ1xuaW1wb3J0IEVtaXR0ZXIgZnJvbSAnLi9saWIvZW1pdHRlcidcbmltcG9ydCB7XG4gIGVuZHBvaW50RXJyb3IsXG4gIGhpZGUsXG4gIHNob3csXG4gIGljb25TaXplLFxuICBwZCxcbiAgc2VsZWN0LFxuICBvblxufSBmcm9tICcuL2xpYi91dGlscydcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vUmVxdWVzdCdcblxuY2xhc3MgTWFwIHtcbiAgY29uc3RydWN0b3IgKHtNQVBfS0VZLCBNQVBfTEFORywgTUFQX1JFR0lPTiwgTUFQLCBNQVBfREVGQVVMVFMsIElDT05fUEFUSCwgSUNPTl9TSVpFLCBNQVJLRVJfVEVNUExBVEUsIEZFVENIX0xPQ0FUSU9OU19GUk9NX0NFTlRFUn0pIHtcbiAgICB0aGlzLm1hcmtlcnMgPSBbXVxuICAgIHRoaXMubWFwID0gc2VsZWN0KE1BUClcblxuICAgIHRoaXMuaWNvblBhdGggPSAobG9jYXRpb24pID0+IHtcbiAgICAgIGlmICh0eXBlb2YgSUNPTl9QQVRILmJpbmQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBJQ09OX1BBVEhcbiAgICAgIH1cbiAgICAgIHJldHVybiBJQ09OX1BBVEgobG9jYXRpb24pXG4gICAgfVxuXG4gICAgdGhpcy5pY29uU2l6ZSA9IChsb2NhdGlvbiwgem9vbSkgPT4ge1xuICAgICAgaWYgKElDT05fU0laRSkge1xuICAgICAgICByZXR1cm4gSUNPTl9TSVpFKGxvY2F0aW9uLCB6b29tKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGljb25TaXplKHpvb20pXG4gICAgfVxuXG4gICAgdGhpcy5tYXJrZXJUZW1wbGF0ZSA9IE1BUktFUl9URU1QTEFURVxuICAgIHRoaXMuZmV0Y2hGcm9tQ2VudGVyID0gc2VsZWN0KEZFVENIX0xPQ0FUSU9OU19GUk9NX0NFTlRFUilcblxuICAgIExvYWRlci5MSUJSQVJJRVMgPSBbJ2dlb21ldHJ5JywgJ3BsYWNlcyddXG4gICAgTG9hZGVyLktFWSA9IE1BUF9LRVlcbiAgICBMb2FkZXIuTEFOR1VBR0UgPSBNQVBfTEFOR1xuICAgIExvYWRlci5SRUdJT04gPSBNQVBfUkVHSU9OXG5cbiAgICBFbWl0dGVyLm9uKCdyZXF1ZXN0LWNvbXBsZXRlJywgKHJlcSwgcmVzKSA9PiB0aGlzLnVwZGF0ZU1hcChyZXEsIHJlcykpXG4gICAgRW1pdHRlci5vbignZm9jdXMtb24tbWFya2VyJywgbmFtZSA9PiB0aGlzLmZvY3VzT25NYXJrZXIobmFtZSkpXG4gICAgRW1pdHRlci5vbignem9vbS1jaGFuZ2VkJywgKCkgPT4gdGhpcy51cGRhdGVJY29ucygpKVxuICAgIEVtaXR0ZXIub24oJ2RyYWdlbmQnLCAoKSA9PiB0aGlzLnNob3dDZW50ZXJCdXR0b24oKSlcblxuICAgIExvYWRlci5sb2FkKEdvb2dsZSA9PiB7XG4gICAgICB0aGlzLkdvb2dsZSA9IEdvb2dsZVxuICAgICAgdGhpcy5NYXAgPSBuZXcgR29vZ2xlLm1hcHMuTWFwKHRoaXMubWFwLCBNQVBfREVGQVVMVFMpXG4gICAgICB0aGlzLkdlb2NvZGVyID0gbmV3IEdvb2dsZS5tYXBzLkdlb2NvZGVyKClcblxuICAgICAgdGhpcy5NYXAuYWRkTGlzdGVuZXIoJ2RyYWdlbmQnLCAoKSA9PiBFbWl0dGVyLmVtaXQoJ2RyYWdlbmQnKSlcbiAgICAgIHRoaXMuTWFwLmFkZExpc3RlbmVyKCd6b29tX2NoYW5nZWQnLCAoKSA9PiBFbWl0dGVyLmVtaXQoJ3pvb20tY2hhbmdlZCcpKVxuICAgIH0pXG5cbiAgICBpZiAodGhpcy5mZXRjaEZyb21DZW50ZXIpIHtcbiAgICAgIG9uKHRoaXMuZmV0Y2hGcm9tQ2VudGVyLCAnY2xpY2snLCBlID0+IHtcbiAgICAgICAgaGlkZShlLnRhcmdldClcbiAgICAgICAgcGQoZSlcbiAgICAgICAgRW1pdHRlci5lbWl0KCdyZXF1ZXN0JywgW1xuICAgICAgICAgICdGb3JtL3ZhbGlkYXRlJyxcbiAgICAgICAgICAnRm9ybS9nZXRWYWx1ZXMnLFxuICAgICAgICAgICdNYXAvaGlkZUNlbnRlckJ1dHRvbicsXG4gICAgICAgICAgJ01hcC9nZXRDZW50ZXInLFxuICAgICAgICAgICdTaWRlYmFyL2dldEZpbHRlcnMnLFxuICAgICAgICAgICdQYWdpbmF0aW9uL3BhZ2VTaXplJyxcbiAgICAgICAgICAnTWFwL0dlb2NvZGUnXG4gICAgICAgIF0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIFJlcXVlc3QuYWRkQWN0aW9uKCdNYXAvR2VvY29kZScsIHRoaXMuZ2VvY29kZSwgdGhpcylcbiAgICBSZXF1ZXN0LmFkZEFjdGlvbignTWFwL2dldENlbnRlcicsIHRoaXMuZ2V0Q2VudGVyLCB0aGlzKVxuICAgIFJlcXVlc3QuYWRkQWN0aW9uKCdNYXAvaGlkZUNlbnRlckJ1dHRvbicsIHRoaXMuaGlkZUNlbnRlckJ1dHRvbiwgdGhpcylcbiAgfVxuXG4gIHVwZGF0ZU1hcCAocmVxLCByZXMpIHtcbiAgICBjb25zdCBtaWRkbGUgPSB7XG4gICAgICBsYXQ6IE51bWJlcihyZXEubGF0KSxcbiAgICAgIGxuZzogTnVtYmVyKHJlcS5sbmcpXG4gICAgfVxuICAgIHRoaXMucmVzZXRDZW50ZXIobWlkZGxlKVxuICAgIHRoaXMucmVtb3ZlTWFya2VycygpXG4gICAgLy8gdGhpcy5hZGRNYXJrZXIoey4uLm1pZGRsZSwgY2VudGVyOiB0cnVlfSwgMCwgZmFsc2UsIHRydWUpXG4gICAgdGhpcy5hZGRNYXJrZXJzKHJlcSwgcmVzKVxuICB9XG5cbiAgcmVtb3ZlTWFya2VycyAoKSB7XG4gICAgdGhpcy5tYXJrZXJzLmZvckVhY2goKHttYXJrZXJ9KSA9PiBtYXJrZXIuc2V0TWFwKG51bGwpKVxuICAgIHRoaXMubWFya2VycyA9IFtdXG4gIH1cblxuICBhZGRNYXJrZXJzIChyZXEsIHJlcykge1xuICAgIGxldCB7bG9jYXRpb25zID0gW119ID0gcmVzXG5cbiAgICBpZiAobG9jYXRpb25zLmxlbmd0aCA9PT0gW10pIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxvY2F0aW9ucy5tYXAoKGxvY2F0aW9uLCBpKSA9PiB7XG4gICAgICB0aGlzLmFkZE1hcmtlcihsb2NhdGlvbiwgKGkgKyAxKSlcbiAgICB9KVxuICB9XG5cbiAgYWRkTWFya2VyIChsb2NhdGlvbiwgaSwgbWFya2VyID0gZmFsc2UsIGNlbnRlciA9IGZhbHNlKSB7XG4gICAgbGV0IHNpemUgPSB0aGlzLmljb25TaXplKGxvY2F0aW9uLCB0aGlzLk1hcC5nZXRab29tKCkpXG5cbiAgICBtYXJrZXIgPSBuZXcgdGhpcy5Hb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgbGF0OiBOdW1iZXIobG9jYXRpb24ubGF0KSxcbiAgICAgICAgbG5nOiBOdW1iZXIobG9jYXRpb24ubG5nKVxuICAgICAgfSxcbiAgICAgIGljb246IHtcbiAgICAgICAgdXJsOiB0aGlzLmljb25QYXRoKGxvY2F0aW9uKSxcbiAgICAgICAgc2NhbGVkU2l6ZTogbmV3IHRoaXMuR29vZ2xlLm1hcHMuU2l6ZShzaXplLCBzaXplKVxuICAgICAgfSxcbiAgICAgIHpJbmRleDogaSxcbiAgICAgIG1hcDogdGhpcy5NYXBcbiAgICB9KVxuXG4gICAgaWYgKCFjZW50ZXIpIHtcbiAgICAgIG1hcmtlci5odG1sID0gdGhpcy5jcmVhdGVNYXJrZXJIVE1MKGxvY2F0aW9uKVxuICAgICAgbWFya2VyLmFkZExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2hvd01vZGFsKG1hcmtlcikpXG4gICAgICBtYXJrZXIubmFtZSA9IGxvY2F0aW9uLm5hbWVcbiAgICB9IGVsc2Uge1xuICAgICAgbWFya2VyLm5hbWUgPSAnY2VudGVyJ1xuICAgIH1cbiAgICB0aGlzLm1hcmtlcnMucHVzaCh7bG9jYXRpb24sIG1hcmtlcn0pXG4gIH1cblxuICBmb2N1c09uTWFya2VyIChuYW1lKSB7XG4gICAgbGV0IG1hcmtlciA9IHRoaXMubWFya2Vyc1xuICAgICAgLm1hcCgoe21hcmtlcn0pID0+IG1hcmtlcilcbiAgICAgIC5yZWR1Y2UoKGEsIGIpID0+IGIubmFtZSA9PT0gbmFtZSA/IGIgOiBhKVxuICAgIHRoaXMucmVzZXRDZW50ZXIobWFya2VyLmdldFBvc2l0aW9uKCkpXG4gICAgdGhpcy5zaG93TW9kYWwobWFya2VyKVxuICB9XG5cbiAgcmVzZXRDZW50ZXIgKG5ld1Bvc2l0aW9uKSB7XG4gICAgdGhpcy5NYXAuc2V0Q2VudGVyKG5ld1Bvc2l0aW9uKVxuICB9XG5cbiAgZ2V0Q2VudGVyIChyZXF1ZXN0LCBuZXh0KSB7XG4gICAgbGV0IGNlbnRlciA9IHRoaXMuTWFwLmdldENlbnRlcigpXG4gICAgT2JqZWN0LmFzc2lnbihyZXF1ZXN0LCB7XG4gICAgICBsYXQ6IGNlbnRlci5sYXQoKSxcbiAgICAgIGxuZzogY2VudGVyLmxuZygpLFxuICAgICAgYWRkcmVzczogZmFsc2VcbiAgICB9KVxuICAgIG5leHQocmVxdWVzdClcbiAgfVxuXG4gIHNob3dNb2RhbCAobWFya2VyKSB7XG4gICAgaWYgKCF0aGlzLkluZm9XaW5kb3cpIHtcbiAgICAgIHRoaXMuSW5mb1dpbmRvdyA9IG5ldyB0aGlzLkdvb2dsZS5tYXBzLkluZm9XaW5kb3coe1xuICAgICAgICBtYXA6IHRoaXMuTWFwXG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLkluZm9XaW5kb3cuc2V0Q29udGVudChtYXJrZXIuaHRtbClcbiAgICB0aGlzLkluZm9XaW5kb3cub3Blbih0aGlzLk1hcCwgbWFya2VyKVxuICB9XG5cbiAgdXBkYXRlSWNvbnMgKCkge1xuICAgIHRoaXMubWFya2Vycy5mb3JFYWNoKCh7bG9jYXRpb24sIG1hcmtlcn0pID0+IHtcbiAgICAgIGxldCBzaXplID0gdGhpcy5pY29uU2l6ZShsb2NhdGlvbiwgdGhpcy5NYXAuZ2V0Wm9vbSgpKVxuICAgICAgbWFya2VyLnNldEljb24oe1xuICAgICAgICB1cmw6IHRoaXMuaWNvblBhdGgobG9jYXRpb24pLFxuICAgICAgICBzY2FsZWRTaXplOiBuZXcgdGhpcy5Hb29nbGUubWFwcy5TaXplKHNpemUsIHNpemUpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBnZW9jb2RlIChyZXF1ZXN0LCBuZXh0KSB7XG4gICAgbGV0IGdlb2NvZGVSZXEgPSB7fVxuICAgIGxldCBhZGRyZXNzID0gZmFsc2VcbiAgICBpZiAocmVxdWVzdC5sYXQgJiYgcmVxdWVzdC5sbmcpIHtcbiAgICAgIGdlb2NvZGVSZXFbJ2xvY2F0aW9uJ10gPSB7XG4gICAgICAgIGxhdDogcmVxdWVzdC5sYXQsXG4gICAgICAgIGxuZzogcmVxdWVzdC5sbmdcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZ2VvY29kZVJlcVsnYWRkcmVzcyddID0gcmVxdWVzdC5hZGRyZXNzXG4gICAgICBhZGRyZXNzID0gdHJ1ZVxuICAgIH1cbiAgICB0aGlzLkdlb2NvZGVyLmdlb2NvZGUoZ2VvY29kZVJlcSwgKHJlcywgc3RhdHVzKSA9PiB7XG4gICAgICBpZiAoc3RhdHVzID09PSAnT0snKSB7XG4gICAgICAgIGxldCBsb2NhdGlvbiA9IHJlc1swXSB8fCB7fVxuICAgICAgICByZXF1ZXN0WydhZGRyZXNzJ10gPSBsb2NhdGlvbi5mb3JtYXR0ZWRfYWRkcmVzcyB8fCAnJ1xuICAgICAgICBpZiAoYWRkcmVzcykge1xuICAgICAgICAgIHJlcXVlc3RbJ2xhdCddID0gbG9jYXRpb24uZ2VvbWV0cnkubG9jYXRpb24ubGF0KClcbiAgICAgICAgICByZXF1ZXN0WydsbmcnXSA9IGxvY2F0aW9uLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpXG4gICAgICAgIH1cbiAgICAgICAgbmV4dChyZXF1ZXN0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW5kcG9pbnRFcnJvcignZ2VvY29kZSBlcnJvcicpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNyZWF0ZU1hcmtlckhUTUwgKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5tYXJrZXJUZW1wbGF0ZShkYXRhKVxuICB9XG5cbiAgc2hvd0NlbnRlckJ1dHRvbiAoKSB7XG4gICAgc2hvdyh0aGlzLmZldGNoRnJvbUNlbnRlcilcbiAgfVxuXG4gIGhpZGVDZW50ZXJCdXR0b24gKHJlcXVlc3QsIG5leHQpIHtcbiAgICBoaWRlKHRoaXMuZmV0Y2hGcm9tQ2VudGVyKVxuICAgIG5leHQocmVxdWVzdClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYXBcbiJdfQ==

var Form = function Form(ref) {
    var this$1 = this;
    var FORM = ref.FORM;

    this.form = select(FORM);
    if (this.form) {
        on(this.form, 'submit', function (e) {
            pd(e);
            emitter.emit('request', ['Form/validate','Form/getValues','Sidebar/getFilters',
                'Pagination/pageSize','Map/Geocode']);
        });
    }
    Request.addAction('Form/validate', this.validate, this);
    Request.addAction('Form/getValues', this.getValues, this);
    emitter.on('request-complete', function (req, res) { return this$1.updateAddress(req, res); });
};
Form.prototype.validate = function validate (request, next) {
    next(request);
};
Form.prototype.getValues = function getValues (request, next) {
    var els = select('[name]', this.form, true);
    els.map(function (el) {
        if (el.value) {
            request[el.getAttribute('name')] = el.value;
        }
    });
    next(request);
};
Form.prototype.updateAddress = function updateAddress (req, res) {
    select('[name="address"]', this.form).value = req.address;
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcm0uanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYTtBQUNwQixPQUFPLGFBQWE7QUFDcEIsUUFDRSxJQUNBLFFBQ0EsU0FDSztBQUVQLE1BQU0sS0FBSztJQUNULFlBQWEsQ0FBQyxPQUFPO1FBQ25CLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZLE1BQUEsQ0FBTztRQUVuQixJQUFJLElBQUEsQ0FBSyxNQUFNO1lBQ2IsRUFBQSxDQUFHLElBQUEsQ0FBSyxNQUFNLFVBQVUsQ0FBQSxJQUFLO2dCQUMzQixFQUFBLENBQUc7Z0JBQ0gsT0FBQSxDQUFRLElBQVIsQ0FBYSxXQUFXLENBQ3RCLGdCQUNBLGlCQUNBO29CQUNBLHNCQUNBO1lBRVY7UUFDQTtRQUVJLE9BQUEsQ0FBUSxTQUFSLENBQWtCLGlCQUFpQixJQUFBLENBQUssVUFBVTtRQUNsRCxPQUFBLENBQVEsU0FBUixDQUFrQixrQkFBa0IsSUFBQSxDQUFLLFdBQVc7UUFFcEQsT0FBQSxDQUFRLEVBQVIsQ0FBVyxxQkFBcUIsR0FBSyxFQUFBLEtBQU4sR0FBYyxJQUFBLENBQUssYUFBTCxDQUFtQixLQUFLO0lBQ3pFO0lBRUUsU0FBVSxPQUFTLEVBQUEsTUFBTTtRQUN2QixJQUFBLENBQUs7SUFDVDtJQUVFLFVBQVcsT0FBUyxFQUFBLE1BQU07UUFDeEIsR0FBQSxDQUFJLE1BQU0sTUFBQSxDQUFPLFVBQVUsSUFBQSxDQUFLLE1BQU07UUFDdEMsR0FBQSxDQUFJLEdBQUosQ0FBUSxFQUFBLElBQU07WUFDWixJQUFJLEVBQUEsQ0FBRyxPQUFPO2dCQUNaLE9BQUEsQ0FBUyxFQUFBLENBQUcsWUFBSCxDQUFnQixRQUF6QixDQUFBLENBQUEsQ0FBcUMsRUFBQSxDQUFHO1lBQ2hEO1FBQ0E7UUFDSSxJQUFBLENBQUs7SUFDVDtJQUVFLGNBQWUsR0FBSyxFQUFBLEtBQUs7UUFDdkIsTUFBQSxDQUFPLG9CQUFvQixJQUFBLENBQUssS0FBaEMsQ0FBc0MsS0FBdEMsQ0FBQSxDQUFBLENBQThDLEdBQUEsQ0FBSTtJQUN0RDtBQUNBO0FBRUEsZUFBZTtBQWxEZiIsImZpbGUiOiJGb3JtLmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbWl0dGVyIGZyb20gJy4vbGliL2VtaXR0ZXInXG5pbXBvcnQgUmVxdWVzdCBmcm9tICcuL1JlcXVlc3QnXG5pbXBvcnQge1xuICBwZCxcbiAgc2VsZWN0LFxuICBvblxufSBmcm9tICcuL2xpYi91dGlscydcblxuY2xhc3MgRm9ybSB7XG4gIGNvbnN0cnVjdG9yICh7Rk9STX0pIHtcbiAgICB0aGlzLmZvcm0gPSBzZWxlY3QoRk9STSlcblxuICAgIGlmICh0aGlzLmZvcm0pIHtcbiAgICAgIG9uKHRoaXMuZm9ybSwgJ3N1Ym1pdCcsIGUgPT4ge1xuICAgICAgICBwZChlKVxuICAgICAgICBFbWl0dGVyLmVtaXQoJ3JlcXVlc3QnLCBbXG4gICAgICAgICAgJ0Zvcm0vdmFsaWRhdGUnLFxuICAgICAgICAgICdGb3JtL2dldFZhbHVlcycsXG4gICAgICAgICAgJ1NpZGViYXIvZ2V0RmlsdGVycycsXG4gICAgICAgICAgJ1BhZ2luYXRpb24vcGFnZVNpemUnLFxuICAgICAgICAgICdNYXAvR2VvY29kZSdcbiAgICAgICAgXSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgUmVxdWVzdC5hZGRBY3Rpb24oJ0Zvcm0vdmFsaWRhdGUnLCB0aGlzLnZhbGlkYXRlLCB0aGlzKVxuICAgIFJlcXVlc3QuYWRkQWN0aW9uKCdGb3JtL2dldFZhbHVlcycsIHRoaXMuZ2V0VmFsdWVzLCB0aGlzKVxuXG4gICAgRW1pdHRlci5vbigncmVxdWVzdC1jb21wbGV0ZScsIChyZXEsIHJlcykgPT4gdGhpcy51cGRhdGVBZGRyZXNzKHJlcSwgcmVzKSlcbiAgfVxuXG4gIHZhbGlkYXRlIChyZXF1ZXN0LCBuZXh0KSB7XG4gICAgbmV4dChyZXF1ZXN0KVxuICB9XG5cbiAgZ2V0VmFsdWVzIChyZXF1ZXN0LCBuZXh0KSB7XG4gICAgbGV0IGVscyA9IHNlbGVjdCgnW25hbWVdJywgdGhpcy5mb3JtLCB0cnVlKVxuICAgIGVscy5tYXAoZWwgPT4ge1xuICAgICAgaWYgKGVsLnZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RbIGVsLmdldEF0dHJpYnV0ZSgnbmFtZScpIF0gPSBlbC52YWx1ZVxuICAgICAgfVxuICAgIH0pXG4gICAgbmV4dChyZXF1ZXN0KVxuICB9XG5cbiAgdXBkYXRlQWRkcmVzcyAocmVxLCByZXMpIHtcbiAgICBzZWxlY3QoJ1tuYW1lPVwiYWRkcmVzc1wiXScsIHRoaXMuZm9ybSkudmFsdWUgPSByZXEuYWRkcmVzc1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1cbiJdfQ==

var Sidebar = function Sidebar(ref) {
    var this$1 = this;
    var SIDEBAR = ref.SIDEBAR;
    var GEO_TRIGGER = ref.GEO_TRIGGER;
    var GEO_FEEDBACK = ref.GEO_FEEDBACK;
    var FILTERS = ref.FILTERS;
    var SIDEBAR_TEMPLATE = ref.SIDEBAR_TEMPLATE;

    this.SIDEBAR_TEMPLATE = SIDEBAR_TEMPLATE;
    this.sidebar = select(SIDEBAR);
    this.geotrigger = select(GEO_TRIGGER, undefined, true);
    this.geofeedback = select(GEO_FEEDBACK);
    this.filters = select(FILTERS, document.body, true);
    emitter.on('request-complete', function (req, res) {
        clearElement(this$1.sidebar);
        this$1.addToSidebar(res);
    });
    if (this.geotrigger.length) {
        this.geotrigger.forEach(function (el) {
            on(el, 'click', function (e) {
                pd(e);
                show(this$1.geofeedback);
                emitter.emit('request', ['Form/getValues','Pagination/pageSize',
                    'Sidebar/geolocation','Sidebar/getFilters','Map/Geocode']);
            });
        });
    }
    if (this.filters.length) {
        this.filters.map(function (el) {
            on(el, 'change', function (e) {
                pd(e);
                emitter.emit('request', ['Form/getValues','Sidebar/getFilters',
                    'Pagination/pageSize','Map/Geocode']);
            });
        });
    }
    Request.addAction('Sidebar/getFilters', this.getFilters, this);
    Request.addAction('Sidebar/geolocation', this.geolocation, this);
};
Sidebar.prototype.addToSidebar = function addToSidebar (response) {
        var this$1 = this;

    if (!response.locations.length) {
        return this.noResults();
    }
    this.sidebar.scrollTop = 0;
    response.locations.map(function (location) {
        var HTML = this$1.SIDEBAR_TEMPLATE(location);
        var item = document.createElement('div');
        on(item, 'click', function (e) {
            if (hasClass(e.target, 'js-show-marker')) {
                pd(e);
            }
            emitter.emit('focus-on-marker', location.name, e);
        });
        item.innerHTML = HTML;
        this$1.sidebar.appendChild(item);
    });
};
Sidebar.prototype.noResults = function noResults () {
    this.sidebar.innerHTML = "\n    <p class=\"h6 c-gold mxa mt1\">No Results Found</p>\n    <p class=\"mxa\">Please enter a zip code to find a store near you.</p>";
};
Sidebar.prototype.getFilters = function getFilters (request, next) {
    var vals = this.filters.reduce(function (obj, el) {
        var attr = el.getAttribute('name');
        if (!el.checked) 
            { return obj; }
        if (!obj[attr]) 
            { obj[attr] = []; }
        obj[el.getAttribute('name')].push(el.value);
        return obj;
    }, {});
    if (request.address || request.lng && request.lat) {
        next(Object.assign(request, vals));
    }
};
Sidebar.prototype.geolocation = function geolocation (request, next) {
    this.geofeedback.style.display = 'block';
    this.geotrigger.forEach(function (el) {
        el.style.display = 'none';
    });
    navigator.geolocation.getCurrentPosition(function (res) {
        next(Object.assign(request, {
            lat: res.coords.latitude,
            lng: res.coords.longitude
        }));
    });
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpZGViYXIuanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYTtBQUNwQixRQUNFLGNBQ0EsVUFDQSxNQUNBLElBQ0EsUUFDQSxTQUNLO0FBQ1AsT0FBTyxhQUFhO0FBRXBCLE1BQU0sUUFBUTtJQUNaLFlBQWEsQ0FBQyxTQUFTLGFBQWEsY0FBYyxTQUFTLG1CQUFtQjtRQUM1RSxJQUFBLENBQUssZ0JBQUwsQ0FBQSxDQUFBLENBQXdCO1FBQ3hCLElBQUEsQ0FBSyxPQUFMLENBQUEsQ0FBQSxDQUFlLE1BQUEsQ0FBTztRQUN0QixJQUFBLENBQUssVUFBTCxDQUFBLENBQUEsQ0FBa0IsTUFBQSxDQUFPLGFBQWEsV0FBVztRQUNqRCxJQUFBLENBQUssV0FBTCxDQUFBLENBQUEsQ0FBbUIsTUFBQSxDQUFPO1FBQzFCLElBQUEsQ0FBSyxPQUFMLENBQUEsQ0FBQSxDQUFlLE1BQUEsQ0FBTyxTQUFTLFFBQUEsQ0FBUyxNQUFNO1FBRTlDLE9BQUEsQ0FBUSxFQUFSLENBQVcscUJBQXFCLEdBQUssRUFBQSxLQUFOLEdBQWM7WUFDM0MsWUFBQSxDQUFhLElBQUEsQ0FBSztZQUNsQixJQUFBLENBQUssWUFBTCxDQUFrQjtRQUN4QjtRQUVJLElBQUksSUFBQSxDQUFLLFVBQUwsQ0FBZ0IsUUFBUTtZQUMxQixJQUFBLENBQUssVUFBTCxDQUFnQixPQUFoQixDQUF3QixFQUFBLElBQU07Z0JBQzVCLEVBQUEsQ0FBRyxJQUFJLFNBQVMsQ0FBQSxJQUFLO29CQUNuQixFQUFBLENBQUc7b0JBQ0gsSUFBQSxDQUFLLElBQUEsQ0FBSztvQkFDVixPQUFBLENBQVEsSUFBUixDQUFhLFdBQVcsQ0FDdEIsaUJBQ0E7d0JBQ0Esc0JBQ0EscUJBQ0E7Z0JBRVo7WUFDQTtRQUNBO1FBRUksSUFBSSxJQUFBLENBQUssT0FBTCxDQUFhLFFBQVE7WUFDdkIsSUFBQSxDQUFLLE9BQUwsQ0FBYSxHQUFiLENBQWlCLEVBQUEsSUFBTTtnQkFDckIsRUFBQSxDQUFHLElBQUksVUFBVSxDQUFBLElBQUs7b0JBQ3BCLEVBQUEsQ0FBRztvQkFDSCxPQUFBLENBQVEsSUFBUixDQUFhLFdBQVcsQ0FDdEIsaUJBQ0E7d0JBQ0Esc0JBQ0E7Z0JBRVo7WUFDQTtRQUNBO1FBRUksT0FBQSxDQUFRLFNBQVIsQ0FBa0Isc0JBQXNCLElBQUEsQ0FBSyxZQUFZO1FBQ3pELE9BQUEsQ0FBUSxTQUFSLENBQWtCLHVCQUF1QixJQUFBLENBQUssYUFBYTtJQUMvRDtJQUVFLGFBQWMsVUFBVTtRQUN0QixJQUFJLENBQUMsUUFBQSxDQUFTLFNBQVQsQ0FBbUIsUUFBUTtZQUM5QixPQUFPLElBQUEsQ0FBSyxTQUFMO1FBQ2I7UUFFSSxJQUFBLENBQUssT0FBTCxDQUFhLFNBQWIsQ0FBQSxDQUFBLENBQXlCO1FBRXpCLFFBQUEsQ0FBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLFFBQUEsSUFBWTtZQUNqQyxHQUFBLENBQUksT0FBTyxJQUFBLENBQUssZ0JBQUwsQ0FBc0I7WUFDakMsR0FBQSxDQUFJLE9BQU8sUUFBQSxDQUFTLGFBQVQsQ0FBdUI7WUFFbEMsRUFBQSxDQUFHLE1BQU0sU0FBUyxDQUFBLElBQUs7Z0JBQ3JCLElBQUksUUFBQSxDQUFTLENBQUEsQ0FBRSxRQUFRLG1CQUFtQjtvQkFDeEMsRUFBQSxDQUFHO2dCQUNiO2dCQUNRLE9BQUEsQ0FBUSxJQUFSLENBQWEsbUJBQW1CLFFBQUEsQ0FBUyxNQUFNO1lBQ3ZEO1lBRU0sSUFBQSxDQUFLLFNBQUwsQ0FBQSxDQUFBLENBQWlCO1lBQ2pCLElBQUEsQ0FBSyxPQUFMLENBQWEsV0FBYixDQUF5QjtRQUMvQjtJQUNBO0lBRUUsWUFBYTtRQUNYLElBQUEsQ0FBSyxPQUFMLENBQWEsU0FBYixDQUFBLENBQUEsQ0FBeUIsZ0lBQUE7SUFHN0I7SUFFRSxXQUFZLE9BQVMsRUFBQSxNQUFNO1FBQ3pCLEdBQUEsQ0FBSSxPQUFPLElBQUEsQ0FBSyxPQUFMLENBQWEsTUFBYixFQUFxQixHQUFLLEVBQUEsSUFBTixHQUFhO1lBQzFDLEdBQUEsQ0FBSSxPQUFPLEVBQUEsQ0FBRyxZQUFILENBQWdCO1lBQzNCLElBQUksQ0FBQyxFQUFBLENBQUc7Z0JBQVMsT0FBTztZQUN4QixJQUFJLENBQUMsR0FBQSxDQUFLO2dCQUFRLEdBQUEsQ0FBSyxLQUFMLENBQUEsQ0FBQSxDQUFjO1lBQ2hDLEdBQUEsQ0FBSyxFQUFBLENBQUcsWUFBSCxDQUFnQixRQUFyQixDQUErQixJQUEvQixDQUFvQyxFQUFBLENBQUc7WUFDdkMsT0FBTztRQUNiLEdBQU87UUFFSCxJQUFJLE9BQUEsQ0FBUSxPQUFSLENBQUEsRUFBQSxDQUFvQixPQUFBLENBQVEsR0FBUixDQUFBLEVBQUEsQ0FBZSxPQUFBLENBQVEsS0FBTTtZQUNuRCxJQUFBLENBQUssTUFBQSxDQUFPLE1BQVAsQ0FBYyxTQUFTO1FBQ2xDO0lBQ0E7SUFFRSxZQUFhLE9BQVMsRUFBQSxNQUFNO1FBQzFCLElBQUEsQ0FBSyxXQUFMLENBQWlCLEtBQWpCLENBQXVCLE9BQXZCLENBQUEsQ0FBQSxDQUFpQztRQUNqQyxJQUFBLENBQUssVUFBTCxDQUFnQixPQUFoQixDQUF3QixFQUFBLElBQU07WUFDNUIsRUFBQSxDQUFHLEtBQUgsQ0FBUyxPQUFULENBQUEsQ0FBQSxDQUFtQjtRQUN6QjtRQUNJLFNBQUEsQ0FBVSxXQUFWLENBQXNCLGtCQUF0QixDQUF5QyxHQUFBLElBQU87WUFDOUMsSUFBQSxDQUFLLE1BQUEsQ0FBTyxNQUFQLENBQWMsU0FBUztnQkFDMUIsS0FBSyxHQUFBLENBQUksTUFBSixDQUFXLFFBRFUsQ0FBQTtnQkFFMUIsS0FBSyxHQUFBLENBQUksTUFBSixDQUFXOztRQUV4QjtJQUNBO0FBQ0E7QUFFQSxlQUFlO0FBbkhmIiwiZmlsZSI6IlNpZGViYXIuanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVtaXR0ZXIgZnJvbSAnLi9saWIvZW1pdHRlcidcbmltcG9ydCB7XG4gIGNsZWFyRWxlbWVudCxcbiAgaGFzQ2xhc3MsXG4gIHNob3csXG4gIHBkLFxuICBzZWxlY3QsXG4gIG9uXG59IGZyb20gJy4vbGliL3V0aWxzJ1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9SZXF1ZXN0J1xuXG5jbGFzcyBTaWRlYmFyIHtcbiAgY29uc3RydWN0b3IgKHtTSURFQkFSLCBHRU9fVFJJR0dFUiwgR0VPX0ZFRURCQUNLLCBGSUxURVJTLCBTSURFQkFSX1RFTVBMQVRFfSkge1xuICAgIHRoaXMuU0lERUJBUl9URU1QTEFURSA9IFNJREVCQVJfVEVNUExBVEVcbiAgICB0aGlzLnNpZGViYXIgPSBzZWxlY3QoU0lERUJBUilcbiAgICB0aGlzLmdlb3RyaWdnZXIgPSBzZWxlY3QoR0VPX1RSSUdHRVIsIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgICB0aGlzLmdlb2ZlZWRiYWNrID0gc2VsZWN0KEdFT19GRUVEQkFDSylcbiAgICB0aGlzLmZpbHRlcnMgPSBzZWxlY3QoRklMVEVSUywgZG9jdW1lbnQuYm9keSwgdHJ1ZSlcblxuICAgIEVtaXR0ZXIub24oJ3JlcXVlc3QtY29tcGxldGUnLCAocmVxLCByZXMpID0+IHtcbiAgICAgIGNsZWFyRWxlbWVudCh0aGlzLnNpZGViYXIpXG4gICAgICB0aGlzLmFkZFRvU2lkZWJhcihyZXMpXG4gICAgfSlcblxuICAgIGlmICh0aGlzLmdlb3RyaWdnZXIubGVuZ3RoKSB7XG4gICAgICB0aGlzLmdlb3RyaWdnZXIuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIG9uKGVsLCAnY2xpY2snLCBlID0+IHtcbiAgICAgICAgICBwZChlKVxuICAgICAgICAgIHNob3codGhpcy5nZW9mZWVkYmFjaylcbiAgICAgICAgICBFbWl0dGVyLmVtaXQoJ3JlcXVlc3QnLCBbXG4gICAgICAgICAgICAnRm9ybS9nZXRWYWx1ZXMnLFxuICAgICAgICAgICAgJ1BhZ2luYXRpb24vcGFnZVNpemUnLFxuICAgICAgICAgICAgJ1NpZGViYXIvZ2VvbG9jYXRpb24nLFxuICAgICAgICAgICAgJ1NpZGViYXIvZ2V0RmlsdGVycycsXG4gICAgICAgICAgICAnTWFwL0dlb2NvZGUnXG4gICAgICAgICAgXSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmlsdGVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZmlsdGVycy5tYXAoZWwgPT4ge1xuICAgICAgICBvbihlbCwgJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICAgIHBkKGUpXG4gICAgICAgICAgRW1pdHRlci5lbWl0KCdyZXF1ZXN0JywgW1xuICAgICAgICAgICAgJ0Zvcm0vZ2V0VmFsdWVzJyxcbiAgICAgICAgICAgICdTaWRlYmFyL2dldEZpbHRlcnMnLFxuICAgICAgICAgICAgJ1BhZ2luYXRpb24vcGFnZVNpemUnLFxuICAgICAgICAgICAgJ01hcC9HZW9jb2RlJ1xuICAgICAgICAgIF0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIFJlcXVlc3QuYWRkQWN0aW9uKCdTaWRlYmFyL2dldEZpbHRlcnMnLCB0aGlzLmdldEZpbHRlcnMsIHRoaXMpXG4gICAgUmVxdWVzdC5hZGRBY3Rpb24oJ1NpZGViYXIvZ2VvbG9jYXRpb24nLCB0aGlzLmdlb2xvY2F0aW9uLCB0aGlzKVxuICB9XG5cbiAgYWRkVG9TaWRlYmFyIChyZXNwb25zZSkge1xuICAgIGlmICghcmVzcG9uc2UubG9jYXRpb25zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9SZXN1bHRzKClcbiAgICB9XG5cbiAgICB0aGlzLnNpZGViYXIuc2Nyb2xsVG9wID0gMFxuXG4gICAgcmVzcG9uc2UubG9jYXRpb25zLm1hcChsb2NhdGlvbiA9PiB7XG4gICAgICBsZXQgSFRNTCA9IHRoaXMuU0lERUJBUl9URU1QTEFURShsb2NhdGlvbilcbiAgICAgIGxldCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICAgICAgb24oaXRlbSwgJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgIGlmIChoYXNDbGFzcyhlLnRhcmdldCwgJ2pzLXNob3ctbWFya2VyJykpIHtcbiAgICAgICAgICBwZChlKVxuICAgICAgICB9XG4gICAgICAgIEVtaXR0ZXIuZW1pdCgnZm9jdXMtb24tbWFya2VyJywgbG9jYXRpb24ubmFtZSwgZSlcbiAgICAgIH0pXG5cbiAgICAgIGl0ZW0uaW5uZXJIVE1MID0gSFRNTFxuICAgICAgdGhpcy5zaWRlYmFyLmFwcGVuZENoaWxkKGl0ZW0pXG4gICAgfSlcbiAgfVxuXG4gIG5vUmVzdWx0cyAoKSB7XG4gICAgdGhpcy5zaWRlYmFyLmlubmVySFRNTCA9IGBcbiAgICA8cCBjbGFzcz1cImg2IGMtZ29sZCBteGEgbXQxXCI+Tm8gUmVzdWx0cyBGb3VuZDwvcD5cbiAgICA8cCBjbGFzcz1cIm14YVwiPlBsZWFzZSBlbnRlciBhIHppcCBjb2RlIHRvIGZpbmQgYSBzdG9yZSBuZWFyIHlvdS48L3A+YFxuICB9XG5cbiAgZ2V0RmlsdGVycyAocmVxdWVzdCwgbmV4dCkge1xuICAgIGxldCB2YWxzID0gdGhpcy5maWx0ZXJzLnJlZHVjZSgob2JqLCBlbCkgPT4ge1xuICAgICAgbGV0IGF0dHIgPSBlbC5nZXRBdHRyaWJ1dGUoJ25hbWUnKVxuICAgICAgaWYgKCFlbC5jaGVja2VkKSByZXR1cm4gb2JqXG4gICAgICBpZiAoIW9ialsgYXR0ciBdKSBvYmpbIGF0dHIgXSA9IFtdXG4gICAgICBvYmpbIGVsLmdldEF0dHJpYnV0ZSgnbmFtZScpIF0ucHVzaChlbC52YWx1ZSlcbiAgICAgIHJldHVybiBvYmpcbiAgICB9LCB7fSlcblxuICAgIGlmIChyZXF1ZXN0LmFkZHJlc3MgfHwgKHJlcXVlc3QubG5nICYmIHJlcXVlc3QubGF0KSkge1xuICAgICAgbmV4dChPYmplY3QuYXNzaWduKHJlcXVlc3QsIHZhbHMpKVxuICAgIH1cbiAgfVxuXG4gIGdlb2xvY2F0aW9uIChyZXF1ZXN0LCBuZXh0KSB7XG4gICAgdGhpcy5nZW9mZWVkYmFjay5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgIHRoaXMuZ2VvdHJpZ2dlci5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICB9KVxuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ocmVzID0+IHtcbiAgICAgIG5leHQoT2JqZWN0LmFzc2lnbihyZXF1ZXN0LCB7XG4gICAgICAgIGxhdDogcmVzLmNvb3Jkcy5sYXRpdHVkZSxcbiAgICAgICAgbG5nOiByZXMuY29vcmRzLmxvbmdpdHVkZVxuICAgICAgfSkpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaWRlYmFyXG4iXX0=

var Pagination = function Pagination(ref) {
    var this$1 = this;
    var PAGINATION = ref.PAGINATION;

    this.pagination = select(PAGINATION);
    this.left = select('[data-dir="prev"]', this.pagination);
    this.right = select('[data-dir="next"]', this.pagination);
    this.page = 1;
    if (this.pagination) {
        on(this.pagination, 'click', function (e) {
            pd(e);
            this$1.incrementPage(e) !== false && emitter.emit('request', ['Request/getPreviousRequest',
                'Pagination/pageSize','Pagination/getCurrentPage']);
        });
    }
    emitter.on('request-complete', function (req, res) {
        this$1.updatePagination(res);
        this$1.updateDOM();
    });
    Request.addAction('Pagination/getCurrentPage', this.getCurrentPage, this);
    Request.addAction('Pagination/pageSize', this.addPageSizeToRequest, this);
};
Pagination.prototype.incrementPage = function incrementPage (e) {
    var el = e.target;
    if (!hasClass(el, 'is-active')) {
        return false;
    }
    if (hasClass(el, 'js-prev')) {
        return this.page--;
    }
    if (hasClass(e.target, 'js-next')) {
        return this.page++;
    }
    return false;
};
Pagination.prototype.updatePagination = function updatePagination (request) {
    this.first = Number(request.first);
    this.pageCount = Math.round(Number(request.total) / this.pageSize());
    this.page = Math.round(Number(request.end) / this.pageSize()) - 1;
};
Pagination.prototype.pageSize = function pageSize () {
    return window.innerWidth < 1000 ? 5 : 50;
};
Pagination.prototype.addPageSizeToRequest = function addPageSizeToRequest (request, next) {
    Object.assign(request, {
        pagesize: this.pageSize()
    });
    next(request);
};
Pagination.prototype.updateDOM = function updateDOM () {
    this.pagination.classList.add('is-active');
    this.left.classList[this.hasPrevPage() ? 'add' : 'remove']('is-active');
    this.right.classList[this.hasNextPage() ? 'add' : 'remove']('is-active');
};
Pagination.prototype.hasPrevPage = function hasPrevPage () {
    return this.page > 0;
};
Pagination.prototype.hasNextPage = function hasNextPage () {
    return this.page + 1 < this.pageCount;
};
Pagination.prototype.getCurrentPage = function getCurrentPage (request, next) {
    next((request['page'] = this.page, request));
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhZ2luYXRpb24uanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYTtBQUNwQixRQUNFLFVBQ0EsSUFDQSxRQUNBLFNBQ0s7QUFDUCxPQUFPLGFBQWE7QUFFcEIsTUFBTSxXQUFXO0lBQ2YsWUFBYSxDQUFDLGFBQWE7UUFDekIsSUFBQSxDQUFLLFVBQUwsQ0FBQSxDQUFBLENBQWtCLE1BQUEsQ0FBTztRQUN6QixJQUFBLENBQUssSUFBTCxDQUFBLENBQUEsQ0FBWSxNQUFBLENBQU8scUJBQXFCLElBQUEsQ0FBSztRQUM3QyxJQUFBLENBQUssS0FBTCxDQUFBLENBQUEsQ0FBYSxNQUFBLENBQU8scUJBQXFCLElBQUEsQ0FBSztRQUM5QyxJQUFBLENBQUssSUFBTCxDQUFBLENBQUEsQ0FBWTtRQUVaLElBQUksSUFBQSxDQUFLLFlBQVk7WUFDbkIsRUFBQSxDQUFHLElBQUEsQ0FBSyxZQUFZLFNBQVMsQ0FBQSxJQUFLO2dCQUNoQyxFQUFBLENBQUc7Z0JBQ0gsSUFBQSxDQUFLLGFBQUwsQ0FBbUIsRUFBbkIsQ0FBQSxHQUFBLENBQTBCLEtBQTFCLENBQUEsRUFBQSxDQUFtQyxPQUFBLENBQVEsSUFBUixDQUFhLFdBQVcsQ0FDekQ7b0JBQ0Esc0JBQ0E7WUFFVjtRQUNBO1FBRUksT0FBQSxDQUFRLEVBQVIsQ0FBVyxxQkFBcUIsR0FBSyxFQUFBLEtBQU4sR0FBYztZQUMzQyxJQUFBLENBQUssZ0JBQUwsQ0FBc0I7WUFDdEIsSUFBQSxDQUFLLFNBQUw7UUFDTjtRQUVJLE9BQUEsQ0FBUSxTQUFSLENBQWtCLDZCQUE2QixJQUFBLENBQUssZ0JBQWdCO1FBQ3BFLE9BQUEsQ0FBUSxTQUFSLENBQWtCLHVCQUF1QixJQUFBLENBQUssc0JBQXNCO0lBQ3hFO0lBRUUsY0FBZSxHQUFHO1FBQ2hCLEdBQUEsQ0FBSSxLQUFLLENBQUEsQ0FBRTtRQUVYLElBQUksQ0FBQyxRQUFBLENBQVMsSUFBSSxjQUFjO1lBQzlCLE9BQU87UUFDYjtRQUVJLElBQUksUUFBQSxDQUFTLElBQUksWUFBWTtZQUMzQixPQUFRLElBQUEsQ0FBSyxJQUFMO1FBQ2Q7UUFFSSxJQUFJLFFBQUEsQ0FBUyxDQUFBLENBQUUsUUFBUSxZQUFZO1lBQ2pDLE9BQVEsSUFBQSxDQUFLLElBQUw7UUFDZDtRQUVJLE9BQU87SUFDWDtJQUVFLGlCQUFrQixTQUFTO1FBQ3pCLElBQUEsQ0FBSyxLQUFMLENBQUEsQ0FBQSxDQUFhLE1BQUEsQ0FBTyxPQUFBLENBQVE7UUFDNUIsSUFBQSxDQUFLLFNBQUwsQ0FBQSxDQUFBLENBQWlCLElBQUEsQ0FBSyxLQUFMLENBQVcsTUFBQSxDQUFPLE9BQUEsQ0FBUSxNQUFmLENBQUEsQ0FBQSxDQUF3QixJQUFBLENBQUssUUFBTDtRQUNwRCxJQUFBLENBQUssSUFBTCxDQUFBLENBQUEsQ0FBYSxJQUFBLENBQUssS0FBTCxDQUFXLE1BQUEsQ0FBTyxPQUFBLENBQVEsSUFBZixDQUFBLENBQUEsQ0FBc0IsSUFBQSxDQUFLLFFBQUwsR0FBakMsQ0FBQSxDQUFBLENBQW9EO0lBQ3JFO0lBRUUsV0FBWTtRQUNWLE9BQU8sTUFBQSxDQUFPLFVBQVAsQ0FBQSxDQUFBLENBQW9CLElBQXBCLEdBQTJCLElBQUk7SUFDMUM7SUFFRSxxQkFBc0IsT0FBUyxFQUFBLE1BQU07UUFDbkMsTUFBQSxDQUFPLE1BQVAsQ0FBYyxTQUFTO1lBQUMsVUFBVSxJQUFBLENBQUssUUFBTDs7UUFDbEMsSUFBQSxDQUFLO0lBQ1Q7SUFFRSxZQUFhO1FBQ1gsSUFBQSxDQUFLLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FBMEIsR0FBMUIsQ0FBOEI7UUFDOUIsSUFBQSxDQUFLLElBQUwsQ0FBVSxTQUFWLENBQXFCLElBQUEsQ0FBSyxXQUFMLEVBQUEsR0FBcUIsUUFBUSxTQUFsRCxDQUE2RDtRQUM3RCxJQUFBLENBQUssS0FBTCxDQUFXLFNBQVgsQ0FBc0IsSUFBQSxDQUFLLFdBQUwsRUFBQSxHQUFxQixRQUFRLFNBQW5ELENBQThEO0lBQ2xFO0lBRUUsY0FBZTtRQUNiLE9BQU8sSUFBQSxDQUFLLElBQUwsQ0FBQSxDQUFBLENBQVk7SUFDdkI7SUFFRSxjQUFlO1FBQ2IsT0FBTyxJQUFBLENBQUssSUFBTCxDQUFBLENBQUEsQ0FBWSxDQUFaLENBQUEsQ0FBQSxDQUFnQixJQUFBLENBQUs7SUFDaEM7SUFFRSxlQUFnQixPQUFTLEVBQUEsTUFBTTtRQUM3QixJQUFBLEVBQU0sT0FBQSxDQUFRLE9BQVIsQ0FBQSxDQUFBLENBQWtCLElBQUEsQ0FBSyxNQUFNO0lBQ3ZDO0FBQ0E7QUFFQSxlQUFlO0FBeEZmIiwiZmlsZSI6IlBhZ2luYXRpb24uanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVtaXR0ZXIgZnJvbSAnLi9saWIvZW1pdHRlcidcbmltcG9ydCB7XG4gIGhhc0NsYXNzLFxuICBwZCxcbiAgc2VsZWN0LFxuICBvblxufSBmcm9tICcuL2xpYi91dGlscydcbmltcG9ydCBSZXF1ZXN0IGZyb20gJy4vUmVxdWVzdCdcblxuY2xhc3MgUGFnaW5hdGlvbiB7XG4gIGNvbnN0cnVjdG9yICh7UEFHSU5BVElPTn0pIHtcbiAgICB0aGlzLnBhZ2luYXRpb24gPSBzZWxlY3QoUEFHSU5BVElPTilcbiAgICB0aGlzLmxlZnQgPSBzZWxlY3QoJ1tkYXRhLWRpcj1cInByZXZcIl0nLCB0aGlzLnBhZ2luYXRpb24pXG4gICAgdGhpcy5yaWdodCA9IHNlbGVjdCgnW2RhdGEtZGlyPVwibmV4dFwiXScsIHRoaXMucGFnaW5hdGlvbilcbiAgICB0aGlzLnBhZ2UgPSAxXG5cbiAgICBpZiAodGhpcy5wYWdpbmF0aW9uKSB7XG4gICAgICBvbih0aGlzLnBhZ2luYXRpb24sICdjbGljaycsIGUgPT4ge1xuICAgICAgICBwZChlKVxuICAgICAgICB0aGlzLmluY3JlbWVudFBhZ2UoZSkgIT09IGZhbHNlICYmIEVtaXR0ZXIuZW1pdCgncmVxdWVzdCcsIFtcbiAgICAgICAgICAnUmVxdWVzdC9nZXRQcmV2aW91c1JlcXVlc3QnLFxuICAgICAgICAgICdQYWdpbmF0aW9uL3BhZ2VTaXplJyxcbiAgICAgICAgICAnUGFnaW5hdGlvbi9nZXRDdXJyZW50UGFnZSdcbiAgICAgICAgXSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgRW1pdHRlci5vbigncmVxdWVzdC1jb21wbGV0ZScsIChyZXEsIHJlcykgPT4ge1xuICAgICAgdGhpcy51cGRhdGVQYWdpbmF0aW9uKHJlcylcbiAgICAgIHRoaXMudXBkYXRlRE9NKClcbiAgICB9KVxuXG4gICAgUmVxdWVzdC5hZGRBY3Rpb24oJ1BhZ2luYXRpb24vZ2V0Q3VycmVudFBhZ2UnLCB0aGlzLmdldEN1cnJlbnRQYWdlLCB0aGlzKVxuICAgIFJlcXVlc3QuYWRkQWN0aW9uKCdQYWdpbmF0aW9uL3BhZ2VTaXplJywgdGhpcy5hZGRQYWdlU2l6ZVRvUmVxdWVzdCwgdGhpcylcbiAgfVxuXG4gIGluY3JlbWVudFBhZ2UgKGUpIHtcbiAgICBsZXQgZWwgPSBlLnRhcmdldFxuXG4gICAgaWYgKCFoYXNDbGFzcyhlbCwgJ2lzLWFjdGl2ZScpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoaGFzQ2xhc3MoZWwsICdqcy1wcmV2JykpIHtcbiAgICAgIHJldHVybiAodGhpcy5wYWdlLS0pXG4gICAgfVxuXG4gICAgaWYgKGhhc0NsYXNzKGUudGFyZ2V0LCAnanMtbmV4dCcpKSB7XG4gICAgICByZXR1cm4gKHRoaXMucGFnZSsrKVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgdXBkYXRlUGFnaW5hdGlvbiAocmVxdWVzdCkge1xuICAgIHRoaXMuZmlyc3QgPSBOdW1iZXIocmVxdWVzdC5maXJzdClcbiAgICB0aGlzLnBhZ2VDb3VudCA9IE1hdGgucm91bmQoTnVtYmVyKHJlcXVlc3QudG90YWwpIC8gdGhpcy5wYWdlU2l6ZSgpKVxuICAgIHRoaXMucGFnZSA9IChNYXRoLnJvdW5kKE51bWJlcihyZXF1ZXN0LmVuZCkgLyB0aGlzLnBhZ2VTaXplKCkpIC0gMSlcbiAgfVxuXG4gIHBhZ2VTaXplICgpIHtcbiAgICByZXR1cm4gd2luZG93LmlubmVyV2lkdGggPCAxMDAwID8gNSA6IDUwXG4gIH1cblxuICBhZGRQYWdlU2l6ZVRvUmVxdWVzdCAocmVxdWVzdCwgbmV4dCkge1xuICAgIE9iamVjdC5hc3NpZ24ocmVxdWVzdCwge3BhZ2VzaXplOiB0aGlzLnBhZ2VTaXplKCl9KVxuICAgIG5leHQocmVxdWVzdClcbiAgfVxuXG4gIHVwZGF0ZURPTSAoKSB7XG4gICAgdGhpcy5wYWdpbmF0aW9uLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpXG4gICAgdGhpcy5sZWZ0LmNsYXNzTGlzdFsgdGhpcy5oYXNQcmV2UGFnZSgpID8gJ2FkZCcgOiAncmVtb3ZlJyBdKCdpcy1hY3RpdmUnKVxuICAgIHRoaXMucmlnaHQuY2xhc3NMaXN0WyB0aGlzLmhhc05leHRQYWdlKCkgPyAnYWRkJyA6ICdyZW1vdmUnIF0oJ2lzLWFjdGl2ZScpXG4gIH1cblxuICBoYXNQcmV2UGFnZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFnZSA+IDBcbiAgfVxuXG4gIGhhc05leHRQYWdlICgpIHtcbiAgICByZXR1cm4gdGhpcy5wYWdlICsgMSA8IHRoaXMucGFnZUNvdW50XG4gIH1cblxuICBnZXRDdXJyZW50UGFnZSAocmVxdWVzdCwgbmV4dCkge1xuICAgIG5leHQoKHJlcXVlc3RbJ3BhZ2UnXSA9IHRoaXMucGFnZSwgcmVxdWVzdCkpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvblxuIl19

var defaults = {
    settings: {
        key: '',
        lang: 'en',
        region: 'US',
        center: {
            lat: 40.7190658,
            lng: -73.9969894
        },
        zoom: 15,
        styles: {},
        disableDefaultUI: true,
        zoomControl: true,
        gestureHandling: 'cooperative',
        icon: function icon(location) {
            return '//image.png';
        },
        iconSize: function iconSize(location, zoom) {
            return zoom * 1.5;
        }
    },
    elements: {
        map: '.js-map',
        sidebar: '.js-list',
        form: '.js-form',
        pagination: '.js-pagination',
        filter: '.js-location-filter',
        redo: '.js-redo',
        geolocation: '.js-geo-trigger'
    },
    templates: {
        sidebar: function sidebar(location) {
            return ("<li>" + (location.name) + "</li>");
        },
        marker: function marker(location) {
            return ("<div>" + (location.name) + "</div>");
        }
    }
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmF1bHRzLmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0lBQ2IsVUFBVTtRQUNSLEtBQUssRUFERyxDQUFBO1FBRVIsTUFBTSxJQUZFLENBQUE7UUFHUixRQUFRLElBSEEsQ0FBQTtRQUlSLFFBQVE7WUFBQyxLQUFLLFVBQU4sQ0FBQTtZQUFrQixLQUFLLENBQUM7U0FKeEIsQ0FBQTtRQUtSLE1BQU0sRUFMRSxDQUFBO1FBTVIsUUFBUSxFQU5BLENBQUE7UUFPUixrQkFBa0IsSUFQVixDQUFBO1FBUVIsYUFBYSxJQVJMLENBQUE7UUFTUixpQkFBaUIsYUFUVCxDQUFBO1FBVVIsS0FBTSxVQUFVO1lBQ2QsT0FBTztRQUNiLENBWlksQ0FBQTtRQWFSLFNBQVUsUUFBVSxFQUFBLE1BQU07WUFDeEIsT0FBTyxJQUFBLENBQUEsQ0FBQSxDQUFPO1FBQ3BCO0tBaEJlLENBQUE7SUFrQmIsVUFBVTtRQUNSLEtBQUssU0FERyxDQUFBO1FBRVIsU0FBUyxVQUZELENBQUE7UUFHUixNQUFNLFVBSEUsQ0FBQTtRQUlSLFlBQVksZ0JBSkosQ0FBQTtRQUtSLFFBQVEscUJBTEEsQ0FBQTtRQU1SLE1BQU0sVUFORSxDQUFBO1FBT1IsYUFBYTtLQXpCRixDQUFBO0lBMkJiLFdBQVc7UUFDVCxRQUFTLFVBQVU7WUFDakIsT0FBTyxPQUFPLFFBQUEsQ0FBUyxVQUFoQjtRQUNiLENBSGEsQ0FBQTtRQUlULE9BQVEsVUFBVTtZQUNoQixPQUFPLFFBQVEsUUFBQSxDQUFTLFdBQWpCO1FBQ2I7OztBQWpDQSIsImZpbGUiOiJkZWZhdWx0cy5qcyhvcmlnaW5hbCkiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIHNldHRpbmdzOiB7XG4gICAga2V5OiAnJyxcbiAgICBsYW5nOiAnZW4nLFxuICAgIHJlZ2lvbjogJ1VTJyxcbiAgICBjZW50ZXI6IHtsYXQ6IDQwLjcxOTA2NTgsIGxuZzogLTczLjk5Njk4OTR9LFxuICAgIHpvb206IDE1LFxuICAgIHN0eWxlczogeyAvKiBqc29uLi4gKi8gfSxcbiAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxuICAgIHpvb21Db250cm9sOiB0cnVlLFxuICAgIGdlc3R1cmVIYW5kbGluZzogJ2Nvb3BlcmF0aXZlJyxcbiAgICBpY29uIChsb2NhdGlvbikge1xuICAgICAgcmV0dXJuICcvL2ltYWdlLnBuZydcbiAgICB9LFxuICAgIGljb25TaXplIChsb2NhdGlvbiwgem9vbSkge1xuICAgICAgcmV0dXJuIHpvb20gKiAxLjVcbiAgICB9XG4gIH0sXG4gIGVsZW1lbnRzOiB7XG4gICAgbWFwOiAnLmpzLW1hcCcsXG4gICAgc2lkZWJhcjogJy5qcy1saXN0JyxcbiAgICBmb3JtOiAnLmpzLWZvcm0nLFxuICAgIHBhZ2luYXRpb246ICcuanMtcGFnaW5hdGlvbicsXG4gICAgZmlsdGVyOiAnLmpzLWxvY2F0aW9uLWZpbHRlcicsXG4gICAgcmVkbzogJy5qcy1yZWRvJyxcbiAgICBnZW9sb2NhdGlvbjogJy5qcy1nZW8tdHJpZ2dlcidcbiAgfSxcbiAgdGVtcGxhdGVzOiB7XG4gICAgc2lkZWJhciAobG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBgPGxpPiR7bG9jYXRpb24ubmFtZX08L2xpPmBcbiAgICB9LFxuICAgIG1hcmtlciAobG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBgPGRpdj4ke2xvY2F0aW9uLm5hbWV9PC9kaXY+YFxuICAgIH1cbiAgfVxufVxuIl19

var components = {
    Map: Map,
    Form: Form,
    Sidebar: Sidebar,
    Pagination: Pagination
};
var StoreLocator = function StoreLocator(settings) {
    var this$1 = this;

    console.dir(settings);
    var aggregated = Object.assign({}, defaults, settings);
    Object.keys(components).map(function (key) {
        this$1[key] = new components[key](aggregated);
    });
};
StoreLocator.prototype.on = function on () {};
StoreLocator.prototype.off = function off () {};
emitter.on('request', function (actions, req) { return new Request(actions, req); });


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGFBQWE7QUFDcEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sY0FBYztBQUVyQixHQUFBLENBQUksYUFBYTtJQUFDLEdBQUQsQ0FBQTtJQUFNLElBQU4sQ0FBQTtJQUFZLE9BQVosQ0FBQTtJQUFxQjs7QUFFdEMsTUFBTSxhQUFhO0lBQ2pCLFlBQWEsVUFBVTtRQUNyQixPQUFBLENBQVEsR0FBUixDQUFZO1FBQ1osS0FBQSxDQUFNLGFBQWEsTUFBQSxDQUFPLE1BQVAsQ0FBYyxJQUFJLFVBQVU7UUFFL0MsTUFBQSxDQUFPLElBQVAsQ0FBWSxXQUFaLENBQXdCLEdBQXhCLENBQTRCLEdBQUEsSUFBTztZQUNqQyxJQUFBLENBQUssSUFBTCxDQUFBLENBQUEsQ0FBWSxJQUFJLFVBQUEsQ0FBVyxJQUFmLENBQW9CO1FBQ3RDO0lBQ0E7SUFFRSxLQUFNLENBRVI7SUFFRSxNQUFPLENBRVQ7QUFDQTtBQUVBLE9BQUEsQ0FBUSxFQUFSLENBQVcsWUFBWSxPQUFTLEVBQUEsS0FBVixHQUNiLElBQUksT0FBSixDQUFZLFNBQVM7QUFHOUIsT0FBTyxLQUFBLENBQU0sYUFBYTtJQUFDLEdBQUQsQ0FBQTtJQUFNLElBQU4sQ0FBQTtJQUFZLE9BQVosQ0FBQTtJQUFxQixPQUFyQixDQUFBO0lBQThCLE9BQTlCLENBQUE7SUFBdUM7O0FBRWpFLGVBQWU7QUFuQ2YiLCJmaWxlIjoiaW5kZXguanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9SZXF1ZXN0J1xuaW1wb3J0IE1hcCBmcm9tICcuL01hcCdcbmltcG9ydCBGb3JtIGZyb20gJy4vRm9ybSdcbmltcG9ydCBTaWRlYmFyIGZyb20gJy4vU2lkZWJhcidcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vUGFnaW5hdGlvbidcbmltcG9ydCBFbWl0dGVyIGZyb20gJy4vbGliL2VtaXR0ZXInXG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9saWIvZGVmYXVsdHMnXG5cbmxldCBjb21wb25lbnRzID0ge01hcCwgRm9ybSwgU2lkZWJhciwgUGFnaW5hdGlvbn1cblxuY2xhc3MgU3RvcmVMb2NhdG9yIHtcbiAgY29uc3RydWN0b3IgKHNldHRpbmdzKSB7XG4gICAgY29uc29sZS5kaXIoc2V0dGluZ3MpXG4gICAgY29uc3QgYWdncmVnYXRlZCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBzZXR0aW5ncylcblxuICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudHMpLm1hcChrZXkgPT4ge1xuICAgICAgdGhpc1trZXldID0gbmV3IGNvbXBvbmVudHNba2V5XShhZ2dyZWdhdGVkKVxuICAgIH0pXG4gIH1cblxuICBvbiAoKSB7XG5cbiAgfVxuXG4gIG9mZiAoKSB7XG5cbiAgfVxufVxuXG5FbWl0dGVyLm9uKCdyZXF1ZXN0JywgKGFjdGlvbnMsIHJlcSkgPT4ge1xuICByZXR1cm4gbmV3IFJlcXVlc3QoYWN0aW9ucywgcmVxKVxufSlcblxuZXhwb3J0IGNvbnN0IENvbXBvbmVudHMgPSB7TWFwLCBGb3JtLCBSZXF1ZXN0LCBTaWRlYmFyLCBFbWl0dGVyLCBQYWdpbmF0aW9ufVxuXG5leHBvcnQgZGVmYXVsdCBTdG9yZUxvY2F0b3JcbiJdfQ==

module.exports = StoreLocator;
//# sourceMappingURL=index.js.map
