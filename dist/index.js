function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Emitter = _interopDefault(require('event-emitter'));
var Loader = _interopDefault(require('google-maps'));

function Bus() {
    this.emitter = new Emitter();
    this.actions = {};
    this.filters = {};
    this.previousRequest = {};
    this.addAction('Bus/getPreviousRequest', this.getPreviousRequest, this);
}

Bus.prototype.addAction = function addAction(name, fn, ctx) {
    this.actions[name] = {
        ctx: ctx,
        fn: fn
    };
};
Bus.prototype.removeAction = function removeAction(name) {
    delete this.actions[name];
};
Bus.prototype.on = function on() {
    this.emitter.on.apply(this.emitter, arguments);
};
Bus.prototype.off = function off() {
    this.emitter.off.apply(this.emitter, arguments);
};
Bus.prototype.emit = function emit() {
    this.emitter.emit.apply(this.emitter, arguments);
};
Bus.prototype.applyFilter = function applyFilter(name, data) {
    var filter = this.filters[name];
    if (filter && filter.fn && filter.fn.bind) {
        return filter.fn(data);
    }
    return data;
};
Bus.prototype.addFilter = function addFilter(name, fn, ctx) {
    if ( ctx === void 0 ) ctx = false;

    this.filters[name] = {
        ctx: ctx,
        fn: fn
    };
};
Bus.prototype.destroy = function destroy() {
    this.emitter = null;
};
Bus.prototype.getPreviousRequest = function getPreviousRequest(request, next) {
    Object.assign(request, this.previousRequest);
    next(request);
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1cy5qcyhvcmlnaW5hbCkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhO0FBRXBCLFNBQVMsTUFBTztJQUNkLElBQUEsQ0FBSyxPQUFMLENBQUEsQ0FBQSxDQUFlLElBQUksT0FBSjtJQUNmLElBQUEsQ0FBSyxPQUFMLENBQUEsQ0FBQSxDQUFlO0lBQ2YsSUFBQSxDQUFLLE9BQUwsQ0FBQSxDQUFBLENBQWU7SUFDZixJQUFBLENBQUssZUFBTCxDQUFBLENBQUEsQ0FBdUI7SUFDdkIsSUFBQSxDQUFLLFNBQUwsQ0FBZSwwQkFBMEIsSUFBQSxDQUFLLG9CQUFvQjtBQUNwRTs7QUFFQSxHQUFBLENBQUksU0FBSixDQUFjLFNBQWQsQ0FBQSxDQUFBLENBQTBCLFNBQVMsVUFBVyxJQUFNLEVBQUEsRUFBSSxFQUFBLEtBQUs7SUFDM0QsSUFBQSxDQUFLLE9BQUwsQ0FBYSxLQUFiLENBQUEsQ0FBQSxDQUFxQjtRQUNuQixLQUFLLEdBRGMsQ0FBQTtRQUVuQixJQUFJOztBQUVSO0FBRUEsR0FBQSxDQUFJLFNBQUosQ0FBYyxZQUFkLENBQUEsQ0FBQSxDQUE2QixTQUFTLGFBQWMsTUFBTTtJQUN4RCxNQUFBLENBQU8sSUFBQSxDQUFLLE9BQUwsQ0FBYTtBQUN0QjtBQUVBLEdBQUEsQ0FBSSxTQUFKLENBQWMsRUFBZCxDQUFBLENBQUEsQ0FBbUIsU0FBUyxLQUFNO0lBQ2hDLElBQUEsQ0FBSyxPQUFMLENBQWEsRUFBYixDQUFnQixLQUFoQixDQUFzQixJQUFBLENBQUssU0FBUztBQUN0QztBQUVBLEdBQUEsQ0FBSSxTQUFKLENBQWMsR0FBZCxDQUFBLENBQUEsQ0FBb0IsU0FBUyxNQUFPO0lBQ2xDLElBQUEsQ0FBSyxPQUFMLENBQWEsR0FBYixDQUFpQixLQUFqQixDQUF1QixJQUFBLENBQUssU0FBUztBQUN2QztBQUVBLEdBQUEsQ0FBSSxTQUFKLENBQWMsSUFBZCxDQUFBLENBQUEsQ0FBcUIsU0FBUyxPQUFRO0lBQ3BDLElBQUEsQ0FBSyxPQUFMLENBQWEsSUFBYixDQUFrQixLQUFsQixDQUF3QixJQUFBLENBQUssU0FBUztBQUN4QztBQUVBLEdBQUEsQ0FBSSxTQUFKLENBQWMsV0FBZCxDQUFBLENBQUEsQ0FBNEIsU0FBUyxZQUFhLElBQU0sRUFBQSxNQUFNO0lBQzVELEtBQUEsQ0FBTSxTQUFTLElBQUEsQ0FBSyxPQUFMLENBQWE7SUFDNUIsSUFBSSxNQUFBLENBQUEsRUFBQSxDQUFVLE1BQUEsQ0FBTyxFQUFqQixDQUFBLEVBQUEsQ0FBdUIsTUFBQSxDQUFPLEVBQVAsQ0FBVSxNQUFNO1FBQ3pDLE9BQU8sTUFBQSxDQUFPLEVBQVAsQ0FBVTtJQUNyQjtJQUNFLE9BQU87QUFDVDtBQUVBLEdBQUEsQ0FBSSxTQUFKLENBQWMsU0FBZCxDQUFBLENBQUEsQ0FBMEIsU0FBUyxVQUFXLElBQU0sRUFBQSxFQUFJLEVBQUEsR0FBQSxHQUFNLE9BQU87SUFDbkUsSUFBQSxDQUFLLE9BQUwsQ0FBYSxLQUFiLENBQUEsQ0FBQSxDQUFxQjtRQUNuQixLQUFLLEdBRGMsQ0FBQTtRQUVuQixJQUFJOztBQUVSO0FBRUEsR0FBQSxDQUFJLFNBQUosQ0FBYyxPQUFkLENBQUEsQ0FBQSxDQUF3QixTQUFTLFVBQVc7SUFDMUMsSUFBQSxDQUFLLE9BQUwsQ0FBQSxDQUFBLENBQWU7QUFDakI7QUFFQSxHQUFBLENBQUksU0FBSixDQUFjLGtCQUFkLENBQUEsQ0FBQSxDQUFtQyxTQUFTLG1CQUFvQixPQUFTLEVBQUEsTUFBTTtJQUM3RSxNQUFBLENBQU8sTUFBUCxDQUFjLFNBQVMsSUFBQSxDQUFLO0lBQzVCLElBQUEsQ0FBSztBQUNQO0FBRUEsZUFBZTtBQXpEZiIsImZpbGUiOiJidXMuanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVtaXR0ZXIgZnJvbSAnZXZlbnQtZW1pdHRlcidcblxuZnVuY3Rpb24gQnVzICgpIHtcbiAgdGhpcy5lbWl0dGVyID0gbmV3IEVtaXR0ZXIoKVxuICB0aGlzLmFjdGlvbnMgPSB7fVxuICB0aGlzLmZpbHRlcnMgPSB7fVxuICB0aGlzLnByZXZpb3VzUmVxdWVzdCA9IHt9XG4gIHRoaXMuYWRkQWN0aW9uKCdCdXMvZ2V0UHJldmlvdXNSZXF1ZXN0JywgdGhpcy5nZXRQcmV2aW91c1JlcXVlc3QsIHRoaXMpXG59XG5cbkJ1cy5wcm90b3R5cGUuYWRkQWN0aW9uID0gZnVuY3Rpb24gYWRkQWN0aW9uIChuYW1lLCBmbiwgY3R4KSB7XG4gIHRoaXMuYWN0aW9uc1tuYW1lXSA9IHtcbiAgICBjdHg6IGN0eCxcbiAgICBmbjogZm5cbiAgfVxufVxuXG5CdXMucHJvdG90eXBlLnJlbW92ZUFjdGlvbiA9IGZ1bmN0aW9uIHJlbW92ZUFjdGlvbiAobmFtZSkge1xuICBkZWxldGUgdGhpcy5hY3Rpb25zW25hbWVdXG59XG5cbkJ1cy5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbiAoKSB7XG4gIHRoaXMuZW1pdHRlci5vbi5hcHBseSh0aGlzLmVtaXR0ZXIsIGFyZ3VtZW50cylcbn1cblxuQnVzLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiBvZmYgKCkge1xuICB0aGlzLmVtaXR0ZXIub2ZmLmFwcGx5KHRoaXMuZW1pdHRlciwgYXJndW1lbnRzKVxufVxuXG5CdXMucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0ICgpIHtcbiAgdGhpcy5lbWl0dGVyLmVtaXQuYXBwbHkodGhpcy5lbWl0dGVyLCBhcmd1bWVudHMpXG59XG5cbkJ1cy5wcm90b3R5cGUuYXBwbHlGaWx0ZXIgPSBmdW5jdGlvbiBhcHBseUZpbHRlciAobmFtZSwgZGF0YSkge1xuICBjb25zdCBmaWx0ZXIgPSB0aGlzLmZpbHRlcnNbbmFtZV1cbiAgaWYgKGZpbHRlciAmJiBmaWx0ZXIuZm4gJiYgZmlsdGVyLmZuLmJpbmQpIHtcbiAgICByZXR1cm4gZmlsdGVyLmZuKGRhdGEpXG4gIH1cbiAgcmV0dXJuIGRhdGFcbn1cblxuQnVzLnByb3RvdHlwZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbiBhZGRGaWx0ZXIgKG5hbWUsIGZuLCBjdHggPSBmYWxzZSkge1xuICB0aGlzLmZpbHRlcnNbbmFtZV0gPSB7XG4gICAgY3R4OiBjdHgsXG4gICAgZm46IGZuXG4gIH1cbn1cblxuQnVzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIHRoaXMuZW1pdHRlciA9IG51bGxcbn1cblxuQnVzLnByb3RvdHlwZS5nZXRQcmV2aW91c1JlcXVlc3QgPSBmdW5jdGlvbiBnZXRQcmV2aW91c1JlcXVlc3QgKHJlcXVlc3QsIG5leHQpIHtcbiAgT2JqZWN0LmFzc2lnbihyZXF1ZXN0LCB0aGlzLnByZXZpb3VzUmVxdWVzdClcbiAgbmV4dChyZXF1ZXN0KVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdXNcbiJdfQ==

var defaults = {
    lookup: function lookup(request, done) {
        done({
            locations: []
        });
    },
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
        },
        paginate: true,
        pageSize: 50,
        mobilePageSize: 5,
        mobileBreakpoint: 1000
    },
    elements: {
        map: '.js-map',
        sidebar: '.js-sidebar',
        form: '.js-form',
        pagination: '.js-pagination',
        nextPage: '.js-next',
        prevPage: '.js-prev',
        filter: '.js-filter',
        redo: '.js-redo',
        geolocation: '.js-geolocation',
        geolocationFeedback: '.js-geolocation-feedback'
    },
    templates: {
        sidebar: function sidebar(location) {
            return ("<li>" + (location.name) + "</li>");
        },
        marker: function marker(location) {
            return ("<div>" + (location.name) + "</div>");
        },
        empty: function empty() {
            return "<p>No Results Found</p>";
        }
    }
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmF1bHRzLmpzKG9yaWdpbmFsKSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0lBQ2IsUUFBUSxTQUFTLE9BQVEsT0FBUyxFQUFBLE1BQU07UUFDdEMsSUFBQSxDQUFLO1lBQUMsV0FBVzs7SUFDckIsQ0FIZSxDQUFBO0lBSWIsVUFBVTtRQUNSLEtBQUssRUFERyxDQUFBO1FBRVIsTUFBTSxJQUZFLENBQUE7UUFHUixRQUFRLElBSEEsQ0FBQTtRQUlSLFFBQVE7WUFBQyxLQUFLLFVBQU4sQ0FBQTtZQUFrQixLQUFLLENBQUM7U0FKeEIsQ0FBQTtRQUtSLE1BQU0sRUFMRSxDQUFBO1FBTVIsUUFBUSxFQU5BLENBQUE7UUFPUixrQkFBa0IsSUFQVixDQUFBO1FBUVIsYUFBYSxJQVJMLENBQUE7UUFTUixpQkFBaUIsYUFUVCxDQUFBO1FBVVIsS0FBTSxVQUFVO1lBQ2QsT0FBTztRQUNiLENBWlksQ0FBQTtRQWFSLFNBQVUsUUFBVSxFQUFBLE1BQU07WUFDeEIsT0FBTyxJQUFBLENBQUEsQ0FBQSxDQUFPO1FBQ3BCLENBZlksQ0FBQTtRQWdCUixVQUFVLElBaEJGLENBQUE7UUFpQlIsVUFBVSxFQWpCRixDQUFBO1FBa0JSLGdCQUFnQixDQWxCUixDQUFBO1FBbUJSLGtCQUFrQjtLQXZCUCxDQUFBO0lBeUJiLFVBQVU7UUFDUixLQUFLLFNBREcsQ0FBQTtRQUVSLFNBQVMsYUFGRCxDQUFBO1FBR1IsTUFBTSxVQUhFLENBQUE7UUFJUixZQUFZLGdCQUpKLENBQUE7UUFLUixVQUFVLFVBTEYsQ0FBQTtRQU1SLFVBQVUsVUFORixDQUFBO1FBT1IsUUFBUSxZQVBBLENBQUE7UUFRUixNQUFNLFVBUkUsQ0FBQTtRQVNSLGFBQWEsaUJBVEwsQ0FBQTtRQVVSLHFCQUFxQjtLQW5DVixDQUFBO0lBcUNiLFdBQVc7UUFDVCxRQUFTLFVBQVU7WUFDakIsT0FBTyxPQUFPLFFBQUEsQ0FBUyxVQUFoQjtRQUNiLENBSGEsQ0FBQTtRQUlULE9BQVEsVUFBVTtZQUNoQixPQUFPLFFBQVEsUUFBQSxDQUFTLFdBQWpCO1FBQ2IsQ0FOYSxDQUFBO1FBT1QsUUFBUztZQUNQLE9BQU8sd0JBQUE7UUFDYjs7O0FBOUNBIiwiZmlsZSI6ImRlZmF1bHRzLmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgbG9va3VwOiBmdW5jdGlvbiBsb29rdXAgKHJlcXVlc3QsIGRvbmUpIHtcbiAgICBkb25lKHtsb2NhdGlvbnM6IFtdfSlcbiAgfSxcbiAgc2V0dGluZ3M6IHtcbiAgICBrZXk6ICcnLFxuICAgIGxhbmc6ICdlbicsXG4gICAgcmVnaW9uOiAnVVMnLFxuICAgIGNlbnRlcjoge2xhdDogNDAuNzE5MDY1OCwgbG5nOiAtNzMuOTk2OTg5NH0sXG4gICAgem9vbTogMTUsXG4gICAgc3R5bGVzOiB7IC8qIGpzb24uLiAqLyB9LFxuICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWUsXG4gICAgem9vbUNvbnRyb2w6IHRydWUsXG4gICAgZ2VzdHVyZUhhbmRsaW5nOiAnY29vcGVyYXRpdmUnLFxuICAgIGljb24gKGxvY2F0aW9uKSB7XG4gICAgICByZXR1cm4gJy8vaW1hZ2UucG5nJ1xuICAgIH0sXG4gICAgaWNvblNpemUgKGxvY2F0aW9uLCB6b29tKSB7XG4gICAgICByZXR1cm4gem9vbSAqIDEuNVxuICAgIH0sXG4gICAgcGFnaW5hdGU6IHRydWUsXG4gICAgcGFnZVNpemU6IDUwLFxuICAgIG1vYmlsZVBhZ2VTaXplOiA1LFxuICAgIG1vYmlsZUJyZWFrcG9pbnQ6IDEwMDBcbiAgfSxcbiAgZWxlbWVudHM6IHtcbiAgICBtYXA6ICcuanMtbWFwJyxcbiAgICBzaWRlYmFyOiAnLmpzLXNpZGViYXInLFxuICAgIGZvcm06ICcuanMtZm9ybScsXG4gICAgcGFnaW5hdGlvbjogJy5qcy1wYWdpbmF0aW9uJyxcbiAgICBuZXh0UGFnZTogJy5qcy1uZXh0JyxcbiAgICBwcmV2UGFnZTogJy5qcy1wcmV2JyxcbiAgICBmaWx0ZXI6ICcuanMtZmlsdGVyJyxcbiAgICByZWRvOiAnLmpzLXJlZG8nLFxuICAgIGdlb2xvY2F0aW9uOiAnLmpzLWdlb2xvY2F0aW9uJyxcbiAgICBnZW9sb2NhdGlvbkZlZWRiYWNrOiAnLmpzLWdlb2xvY2F0aW9uLWZlZWRiYWNrJ1xuICB9LFxuICB0ZW1wbGF0ZXM6IHtcbiAgICBzaWRlYmFyIChsb2NhdGlvbikge1xuICAgICAgcmV0dXJuIGA8bGk+JHtsb2NhdGlvbi5uYW1lfTwvbGk+YFxuICAgIH0sXG4gICAgbWFya2VyIChsb2NhdGlvbikge1xuICAgICAgcmV0dXJuIGA8ZGl2PiR7bG9jYXRpb24ubmFtZX08L2Rpdj5gXG4gICAgfSxcbiAgICBlbXB0eSAoKSB7XG4gICAgICByZXR1cm4gYDxwPk5vIFJlc3VsdHMgRm91bmQ8L3A+YFxuICAgIH1cbiAgfVxufVxuIl19

function noop() {}

function Request(ref, actions, bus) {
    var lookup = ref.lookup;
    if ( actions === void 0 ) actions = [];

    this.bus = bus;
    this.lookup = lookup;
    var queue = this.createQueue(actions);
    queue();
}

Request.prototype.createQueue = function createQueue(actions, request) {
    var this$1 = this;
    if ( request === void 0 ) request = {};

    if (!actions.length) {
        this.lookup(request, function (response) {
            this$1.endQueue(request, response);
        });
        return noop;
    }
    actions = actions.filter(function (name) { return this$1.bus.actions[name]; });
    actions.push(function () {
        this$1.lookup(request, function (response) {
            this$1.endQueue(request, response);
        });
    });
    return actions.reverse().reduce(function (a, b) { return this$1.bus.actions[b].fn.bind(this$1.bus.actions[b].ctx, request, a); });
};
Request.prototype.endQueue = function endQueue(req, res) {
    this.bus.previousRequest = Object.assign({}, req);
    this.bus.emit('response', req, Object.assign({
        locations: []
    }, res));
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlcXVlc3QuanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLFNBQVMsT0FBUSxDQUFqQjs7QUFTQSxTQUFTLFFBQVMsQ0FBQyxPQUFTLEVBQUEsT0FBQSxHQUFVLEVBQUksRUFBQSxLQUFLO0lBQzdDLElBQUEsQ0FBSyxHQUFMLENBQUEsQ0FBQSxDQUFXO0lBQ1gsSUFBQSxDQUFLLE1BQUwsQ0FBQSxDQUFBLENBQWM7SUFDZCxLQUFBLENBQU0sUUFBUSxJQUFBLENBQUssV0FBTCxDQUFpQjtJQUMvQixLQUFBO0FBQ0Y7O0FBU0EsT0FBQSxDQUFRLFNBQVIsQ0FBa0IsV0FBbEIsQ0FBQSxDQUFBLENBQWdDLFNBQVMsWUFBYSxPQUFTLEVBQUEsT0FBQSxHQUFVLElBQUk7SUFDM0UsSUFBSSxDQUFDLE9BQUEsQ0FBUSxRQUFRO1FBQ25CLElBQUEsQ0FBSyxNQUFMLENBQVksU0FBVSxRQUFELElBQWM7WUFDakMsSUFBQSxDQUFLLFFBQUwsQ0FBYyxTQUFTO1FBQzdCO1FBQ0ksT0FBTztJQUNYO0lBRUUsT0FBQSxDQUFBLENBQUEsQ0FBVSxPQUFBLENBQVEsTUFBUixDQUFlLElBQUEsSUFBUSxJQUFBLENBQUssR0FBTCxDQUFTLE9BQVQsQ0FBaUI7SUFDbEQsT0FBQSxDQUFRLElBQVIsSUFBYSxHQUFNO1FBQ2pCLElBQUEsQ0FBSyxNQUFMLENBQVksU0FBVSxRQUFELElBQWM7WUFDakMsSUFBQSxDQUFLLFFBQUwsQ0FBYyxTQUFTO1FBQzdCO0lBQ0E7SUFFRSxPQUFPLE9BQUEsQ0FBUSxPQUFSLEVBQUEsQ0FBa0IsTUFBbEIsRUFBMEIsQ0FBRyxFQUFBLEdBQUosR0FDdkIsSUFBQSxDQUFLLEdBQUwsQ0FBUyxPQUFULENBQWlCLEVBQWpCLENBQW9CLEVBQXBCLENBQXVCLElBQXZCLENBQTRCLElBQUEsQ0FBSyxHQUFMLENBQVMsT0FBVCxDQUFpQixFQUFqQixDQUFvQixLQUFLLFNBQVM7QUFFekU7QUFNQSxPQUFBLENBQVEsU0FBUixDQUFrQixRQUFsQixDQUFBLENBQUEsQ0FBNkIsU0FBUyxTQUFVLEdBQUssRUFBQSxLQUFLO0lBQ3hELElBQUEsQ0FBSyxHQUFMLENBQVMsZUFBVCxDQUFBLENBQUEsQ0FBMkIsTUFBQSxDQUFPLE1BQVAsQ0FBYyxJQUFJO0lBQzdDLElBQUEsQ0FBSyxHQUFMLENBQVMsSUFBVCxDQUFjLFlBQVksS0FBSyxNQUFBLENBQU8sTUFBUCxDQUFjO1FBQUMsV0FBVztPQUFLO0FBQ2hFO0FBRUEsZUFBZTtBQXZEZiIsImZpbGUiOiJSZXF1ZXN0LmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRW1wdHkgRm5cbiAqL1xuZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3NcbiAqIEBwYXJhbSB7QXJyYXl9IGFjdGlvbnMgU3RyaW5nIG9mIGZuIG5hbWVzIHRvIGNhbGxcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gKiBAcGFyYW0ge0NsYXNzfSBidXNcbiAqL1xuZnVuY3Rpb24gUmVxdWVzdCAoe2xvb2t1cH0sIGFjdGlvbnMgPSBbXSwgYnVzKSB7XG4gIHRoaXMuYnVzID0gYnVzXG4gIHRoaXMubG9va3VwID0gbG9va3VwXG4gIGNvbnN0IHF1ZXVlID0gdGhpcy5jcmVhdGVRdWV1ZShhY3Rpb25zKVxuICBxdWV1ZSgpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHF1ZXVlIG9mIGZ1bmN0aW9ucyB0aGF0IGFyZVxuICogY2FsbGVkIG9uZSBhZnRlciBhbm90aGVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RcbiAqIEBwYXJhbSB7QXJyYXl9IHF1ZXVlXG4gKi9cblJlcXVlc3QucHJvdG90eXBlLmNyZWF0ZVF1ZXVlID0gZnVuY3Rpb24gY3JlYXRlUXVldWUgKGFjdGlvbnMsIHJlcXVlc3QgPSB7fSkge1xuICBpZiAoIWFjdGlvbnMubGVuZ3RoKSB7XG4gICAgdGhpcy5sb29rdXAocmVxdWVzdCwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICB0aGlzLmVuZFF1ZXVlKHJlcXVlc3QsIHJlc3BvbnNlKVxuICAgIH0pXG4gICAgcmV0dXJuIG5vb3BcbiAgfVxuXG4gIGFjdGlvbnMgPSBhY3Rpb25zLmZpbHRlcihuYW1lID0+IHRoaXMuYnVzLmFjdGlvbnNbbmFtZV0pXG4gIGFjdGlvbnMucHVzaCgoKSA9PiB7XG4gICAgdGhpcy5sb29rdXAocmVxdWVzdCwgKHJlc3BvbnNlKSA9PiB7XG4gICAgICB0aGlzLmVuZFF1ZXVlKHJlcXVlc3QsIHJlc3BvbnNlKVxuICAgIH0pXG4gIH0pXG5cbiAgcmV0dXJuIGFjdGlvbnMucmV2ZXJzZSgpLnJlZHVjZSgoYSwgYikgPT4ge1xuICAgIHJldHVybiB0aGlzLmJ1cy5hY3Rpb25zW2JdLmZuLmJpbmQodGhpcy5idXMuYWN0aW9uc1tiXS5jdHgsIHJlcXVlc3QsIGEpXG4gIH0pXG59XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IHRyaWdnZXJzIHRoZSBlbmQgb2YgdGhlIHF1ZXVlXG4gKiBhbmQgaHlkcmF0ZXMgYW55IGxpc3RlbmluZyBtb2R1bGVzXG4gKi9cblJlcXVlc3QucHJvdG90eXBlLmVuZFF1ZXVlID0gZnVuY3Rpb24gZW5kUXVldWUgKHJlcSwgcmVzKSB7XG4gIHRoaXMuYnVzLnByZXZpb3VzUmVxdWVzdCA9IE9iamVjdC5hc3NpZ24oe30sIHJlcSlcbiAgdGhpcy5idXMuZW1pdCgncmVzcG9uc2UnLCByZXEsIE9iamVjdC5hc3NpZ24oe2xvY2F0aW9uczogW119LCByZXMpKVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0XG4iXX0=

var clearElement = function (el) {
    if (!el) 
        { return; }
    el.innerHTML = '';
};
var endpointError = function (text) { return console.error(text); };
var show = function (el) { return el.classList.add('is-visible'); };
var hide = function (el) { return el.classList.remove('is-visible'); };
var hasClass = function (el, str) { return el.classList.contains(str); };
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
var off = function (element, event, callback, capture) {
    if (!element.removeEventListener) {
        event = 'on' + event;
    }
    var method = element.removeEventListener || element.detachEvent;
    method.call(element, event, callback, capture);
    return callback;
};
var getInternationalZipCode = function (countryCode) {
    var patternPerCountry = {
        us: /^\d{5}([\-]?\d{4})?$/,
        uk: /^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/,
        de: /^\b((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:[4][0-24-9]\d{3})|(?:[6][013-9]\d{3}))\b$/,
        ca: /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]) {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/,
        fr: /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/,
        it: /^(V-|I-)?[0-9]{5}$/,
        au: /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/,
        nl: /^[1-9][0-9]{3}\s?([a-zA-Z]{2})?$/,
        es: /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/,
        dk: /^([D|d][K|k]( |-))?[1-9]{1}[0-9]{3}$/,
        se: /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/,
        be: /^[1-9]{1}[0-9]{3}$/,
        in: /^\d{6}$/
    };
    if (typeof patternPerCountry[countryCode] !== 'undefined') {
        return patternPerCountry[countryCode];
    }
    return false;
};
var formatGeocodingPayload = function (request) {
    if ( request === void 0 ) request = {};

    if (request.lat && request.lng) {
        return {
            location: {
                lat: request.lat,
                lng: request.lng
            }
        };
    } else {
        if (getInternationalZipCode(request.region) && getInternationalZipCode(request.region).test(request.address)) {
            return {
                componentRestrictions: {
                    country: request.region,
                    postalCode: request.address
                }
            };
        } else {
            return Object.assign({}, {address: request.address},
                request.region ? {
                    region: request.region
                } : {});
        }
    }
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TztZQUNMLFVBQVU7Z0JBQ1IsS0FBSyxPQUFBLENBQVEsR0FETCxDQUFBO2dCQUVSLEtBQUssT0FBQSxDQUFROzs7SUFHckIsT0FBUztRQUdMLElBQ0UsdUJBQUEsQ0FBd0IsT0FBQSxDQUFRLE9BQWhDLENBQUEsRUFBQSxDQUNBLHVCQUFBLENBQXdCLE9BQUEsQ0FBUSxPQUFoQyxDQUF3QyxJQUF4QyxDQUE2QyxPQUFBLENBQVEsVUFDckQ7WUFDQSxPQUFPO2dCQUNMLHVCQUF1QjtvQkFDckIsU0FBUyxPQUFBLENBQVEsTUFESSxDQUFBO29CQUVyQixZQUFZLE9BQUEsQ0FBUTs7O1FBRzlCLE9BQVc7WUFDTCxPQUFPO2dCQUNMLFNBQVMsT0FBQSxDQUFRLE9BRFosQ0FBQTtnQkFFTCxHQUFJLE9BQUEsQ0FBUSxNQUFSLEdBQWlCO29CQUNuQixRQUFRLE9BQUEsQ0FBUTtvQkFDZDs7UUFFWjtJQUNBO0FBQ0E7QUF4R0EiLCJmaWxlIjoidXRpbHMuanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNsZWFyRWxlbWVudCA9IGVsID0+IHtcbiAgaWYgKCFlbCkgcmV0dXJuXG4gIGVsLmlubmVySFRNTCA9ICcnXG59XG5cbmV4cG9ydCBjb25zdCBlbmRwb2ludEVycm9yID0gdGV4dCA9PiBjb25zb2xlLmVycm9yKHRleHQpXG5cbmV4cG9ydCBjb25zdCBzaG93ID0gZWwgPT4gZWwuY2xhc3NMaXN0LmFkZCgnaXMtdmlzaWJsZScpXG5cbmV4cG9ydCBjb25zdCBoaWRlID0gZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtdmlzaWJsZScpXG5cbmV4cG9ydCBjb25zdCBoYXNDbGFzcyA9IChlbCwgc3RyKSA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMoc3RyKVxuXG5leHBvcnQgY29uc3QgcGQgPSBlID0+IGUucHJldmVudERlZmF1bHQoKVxuXG5leHBvcnQgY29uc3Qgbm9vcCA9IGZ1bmN0aW9uIG5vb3AgKCkge31cblxuZXhwb3J0IGNvbnN0IHNlbGVjdCA9IChzZWxlY3RvciwgcGFyZW50ID0gZG9jdW1lbnQsIGFsbCA9IGZhbHNlKSA9PiB7XG4gIHJldHVybiAoYWxsXG4gICAgPyBbXS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgICA6IHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICApXG59XG5cbmV4cG9ydCBjb25zdCBvbiA9IChlbGVtZW50LCBldmVudCwgY2FsbGJhY2ssIGNhcHR1cmUpID0+IHtcbiAgaWYgKCFlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBldmVudCA9ICdvbicgKyBldmVudFxuICB9XG4gIGNvbnN0IG1ldGhvZCA9IGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciB8fCBlbGVtZW50LmF0dGFjaEV2ZW50XG4gIG1ldGhvZC5jYWxsKGVsZW1lbnQsIGV2ZW50LCBjYWxsYmFjaywgY2FwdHVyZSlcbiAgcmV0dXJuIGNhbGxiYWNrXG59XG5cbmV4cG9ydCBjb25zdCBvZmYgPSAoZWxlbWVudCwgZXZlbnQsIGNhbGxiYWNrLCBjYXB0dXJlKSA9PiB7XG4gIGlmICghZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgZXZlbnQgPSAnb24nICsgZXZlbnRcbiAgfVxuICBjb25zdCBtZXRob2QgPSBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgfHwgZWxlbWVudC5kZXRhY2hFdmVudFxuICBtZXRob2QuY2FsbChlbGVtZW50LCBldmVudCwgY2FsbGJhY2ssIGNhcHR1cmUpXG4gIHJldHVybiBjYWxsYmFja1xufVxuXG5leHBvcnQgY29uc3QgZ2V0SW50ZXJuYXRpb25hbFppcENvZGUgPSAoY291bnRyeUNvZGUpID0+IHtcbiAgY29uc3QgcGF0dGVyblBlckNvdW50cnkgPSB7XG4gICAgdXM6IC9eXFxkezV9KFtcXC1dP1xcZHs0fSk/JC8sXG4gICAgdWs6IC9eKEdJUnxbQS1aXVxcZFtBLVpcXGRdPz98W0EtWl17Mn1cXGRbQS1aXFxkXT8/KVsgXT8/KFxcZFtBLVpdezJ9KSQvLFxuICAgIGRlOiAvXlxcYigoPzowWzEtNDYtOV1cXGR7M30pfCg/OlsxLTM1Ny05XVxcZHs0fSl8KD86WzRdWzAtMjQtOV1cXGR7M30pfCg/Ols2XVswMTMtOV1cXGR7M30pKVxcYiQvLFxuICAgIGNhOiAvXihbQUJDRUdISktMTU5QUlNUVlhZXVxcZFtBQkNFR0hKS0xNTlBSU1RWV1hZWl0pIHswLDF9KFxcZFtBQkNFR0hKS0xNTlBSU1RWV1hZWl1cXGQpJC8sXG4gICAgZnI6IC9eKEYtKT8oKDJbQXxCXSl8WzAtOV17Mn0pWzAtOV17M30kLyxcbiAgICBpdDogL14oVi18SS0pP1swLTldezV9JC8sXG4gICAgYXU6IC9eKDBbMjg5XVswLTldezJ9KXwoWzEzNDU2ODldWzAtOV17M30pfCgyWzAtOF1bMC05XXsyfSl8KDI5MFswLTldKXwoMjkxWzAtNF0pfCg3WzAtNF1bMC05XXsyfSl8KDdbOC05XVswLTldezJ9KSQvLFxuICAgIG5sOiAvXlsxLTldWzAtOV17M31cXHM/KFthLXpBLVpdezJ9KT8kLyxcbiAgICBlczogL14oWzEtOV17Mn18WzAtOV1bMS05XXxbMS05XVswLTldKVswLTldezN9JC8sXG4gICAgZGs6IC9eKFtEfGRdW0t8a10oIHwtKSk/WzEtOV17MX1bMC05XXszfSQvLFxuICAgIHNlOiAvXihzLXxTLSl7MCwxfVswLTldezN9XFxzP1swLTldezJ9JC8sXG4gICAgYmU6IC9eWzEtOV17MX1bMC05XXszfSQvLFxuICAgIGluOiAvXlxcZHs2fSQvXG4gIH1cblxuICBpZiAodHlwZW9mIHBhdHRlcm5QZXJDb3VudHJ5W2NvdW50cnlDb2RlXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gcGF0dGVyblBlckNvdW50cnlbY291bnRyeUNvZGVdXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogVGhlIHBheWxvYWQgdGhhdCB3ZSBzZW5kIHRvIEdvb2dsZSBnZW9jb2Rpbmcgc2VydmljZXNcbiAqIGNhbiBjb21lIGluIGEgdmFyaWV0eSBvZiBkaWZmZXJlbnQgZm9ybWF0cyBkZXBlbmRpbmdcbiAqIG9uIHdoYXQgYWRkcmVzcyB0aGUgdXNlciBpbnNlcnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0IFRoZSBcInJlcXVlc3RcIiBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcm1hdEdlb2NvZGluZ1BheWxvYWQgPSAocmVxdWVzdCA9IHt9KSA9PiB7XG4gIC8vIElmIHRoZXJlIGFyZSBhbHJlYWR5IGxhdCBhbmQgbG9uZyBjb29yZHNcbiAgLy8gdGhlbiBpdCdzIG5pY2UgYW5kIGVhc3lcbiAgaWYgKHJlcXVlc3QubGF0ICYmIHJlcXVlc3QubG5nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgIGxhdDogcmVxdWVzdC5sYXQsXG4gICAgICAgIGxuZzogcmVxdWVzdC5sbmdcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSWYgbm90LCB3ZSBzZWUgaWYgd2UgaGF2ZSBhIHppcCBjb2RlIG9yXG4gICAgLy8gZWxzZSB3ZSBkbyBhIHJlZ3VsYXIgYWRkcmVzcyBsb29rIHVwXG4gICAgaWYgKFxuICAgICAgZ2V0SW50ZXJuYXRpb25hbFppcENvZGUocmVxdWVzdC5yZWdpb24pICYmXG4gICAgICBnZXRJbnRlcm5hdGlvbmFsWmlwQ29kZShyZXF1ZXN0LnJlZ2lvbikudGVzdChyZXF1ZXN0LmFkZHJlc3MpXG4gICAgKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjb21wb25lbnRSZXN0cmljdGlvbnM6IHtcbiAgICAgICAgICBjb3VudHJ5OiByZXF1ZXN0LnJlZ2lvbixcbiAgICAgICAgICBwb3N0YWxDb2RlOiByZXF1ZXN0LmFkZHJlc3NcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhZGRyZXNzOiByZXF1ZXN0LmFkZHJlc3MsXG4gICAgICAgIC4uLihyZXF1ZXN0LnJlZ2lvbiA/IHtcbiAgICAgICAgICByZWdpb246IHJlcXVlc3QucmVnaW9uXG4gICAgICAgIH0gOiB7fSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==

function Map(ref, bus) {
    var settings = ref.settings;
    var elements = ref.elements;
    var templates = ref.templates;

    this.bus = bus;
    this.settings = settings;
    this.elements = elements;
    this.templates = templates;
    this.markers = [];
    this.google = {};
    this.map = select(elements.map);
    this.redo = select(elements.redo);
    this.updateMap = this.updateMap.bind(this);
    this.focusOnMarker = this.focusOnMarker.bind(this);
    this.updateIcons = this.updateIcons.bind(this);
    this.showCenterButton = this.showCenterButton.bind(this);
    this.onRedo = this.onRedo.bind(this);
    bus.on('response', this.updateMap);
    bus.on('focus-on-marker', this.focusOnMarker);
    bus.on('zoom-changed', this.updateIcons);
    bus.on('dragend', this.showCenterButton);
    bus.addAction('Map/Geocode', this.geocode, this);
    bus.addAction('Map/getCenter', this.getCenter, this);
    bus.addAction('Map/hideCenterButton', this.hideCenterButton, this);
    if (this.redo) {
        on(this.redo, 'click', this.onRedo);
    }
    Loader.LIBRARIES = ['geometry','places'];
    Loader.KEY = settings.key;
    Loader.LANGUAGE = settings.lang;
    Loader.REGION = settings.region;
    Loader.load(this.googleHasLoaded.bind(this));
}

Map.prototype.googleHasLoaded = function googleHasLoaded(Google) {
    var this$1 = this;

    this.google.core = Google;
    this.google.geocoder = new Google.maps.Geocoder();
    var ref = this.settings;
    var center = ref.center;
    var zoom = ref.zoom;
    var styles = ref.styles;
    var disableDefaultUI = ref.disableDefaultUI;
    var zoomControl = ref.zoomControl;
    var gestureHandling = ref.gestureHandling;
    this.google.map = new Google.maps.Map(this.map, {
        center: center,
        zoom: zoom,
        styles: styles,
        disableDefaultUI: disableDefaultUI,
        zoomControl: zoomControl,
        gestureHandling: gestureHandling
    });
    this.google.map.addListener('dragend', function () { return this$1.bus.emit('dragend'); });
    this.google.map.addListener('zoom_changed', function () { return this$1.bus.emit('zoom-changed'); });
};
Map.prototype.onRedo = function onRedo(e) {
    e && pd(e);
    e && e.target && hide(e.target);
    this.bus.emit('request', this.bus.applyFilter('Map/onRedo/request', ['Form/validate',
        'Form/getValues','Map/hideCenterButton','Map/getCenter','Sidebar/getFilters',
        'Pagination/pageSize','Pagination/getCurrentPage','Map/Geocode']));
};
Map.prototype.updateMap = function updateMap(req, res) {
    var middle = {
        lat: Number(req.lat),
        lng: Number(req.lng)
    };
    this.resetCenter(middle);
    this.removeMarkers();
    this.addMarker(Object.assign({}, middle,
        {center: true}), 0, false, true);
    this.addMarkers(req, res);
};
Map.prototype.resetCenter = function resetCenter(newPosition) {
    this.google.map.setCenter(newPosition);
};
Map.prototype.removeMarkers = function removeMarkers() {
    this.markers.forEach(function (ref) {
        var marker = ref.marker;

        return marker.setMap(null);
    });
    this.markers = [];
};
Map.prototype.addMarkers = function addMarkers(req, res) {
    var this$1 = this;

    var locations = res.locations; if ( locations === void 0 ) locations = [];
    if (locations.length === []) {
        return;
    }
    locations.map(function (location, i) {
        this$1.addMarker(location, i + 1);
    });
};
Map.prototype.addMarker = function addMarker(location, i, marker, center) {
    if ( marker === void 0 ) marker = false;
    if ( center === void 0 ) center = false;

    var size = this.settings.iconSize(location, this.google.map.getZoom());
    marker = new this.google.core.maps.Marker({
        position: {
            lat: Number(location.lat),
            lng: Number(location.lng)
        },
        icon: {
            url: this.settings.icon(location),
            scaledSize: new this.google.core.maps.Size(size, size)
        },
        zIndex: i,
        map: this.google.map
    });
    if (!center) {
        marker.html = this.createMarkerHTML(location);
        marker.addListener('click', this.showModal.bind(this, marker));
        marker.name = location.name;
    } else {
        marker.name = 'center';
    }
    this.markers.push({
        location: location,
        marker: marker
    });
};
Map.prototype.showModal = function showModal(marker) {
    if (!this.InfoWindow) {
        this.InfoWindow = new this.google.core.maps.InfoWindow({
            map: this.google.map
        });
    }
    this.InfoWindow.setContent(marker.html);
    this.InfoWindow.open(this.google.map, marker);
};
Map.prototype.createMarkerHTML = function createMarkerHTML(data) {
    return this.templates.marker(data);
};
Map.prototype.focusOnMarker = function focusOnMarker(index) {
    var marker = this.markers.map(function (ref) {
        var marker = ref.marker;

        return marker;
    })[index + 1];
    this.resetCenter(marker.getPosition());
    this.showModal(marker);
};
Map.prototype.updateIcons = function updateIcons() {
    var this$1 = this;

    this.markers.forEach(function (ref) {
        var location = ref.location;
        var marker = ref.marker;

        var size = this$1.settings.iconSize(location, this$1.google.map.getZoom());
        marker.setIcon({
            url: this$1.settings.icon(location),
            scaledSize: new this$1.google.core.maps.Size(size, size)
        });
    });
};
Map.prototype.showCenterButton = function showCenterButton() {
    if (this.redo) {
        show(this.redo);
    }
};
Map.prototype.geocode = function geocode(request, next) {
    var geocodeReq = formatGeocodingPayload(request);
    var address = !geocodeReq['location'];
    this.google.geocoder.geocode(geocodeReq, function (res, status) {
        if (status === 'OK') {
            var location = res[0] || {};
            request['address'] = location.formatted_address || request.address;
            if (address) {
                request['lat'] = location.geometry.location.lat();
                request['lng'] = location.geometry.location.lng();
            }
        } else {
            endpointError('geocode error');
        }
        next(request);
    });
};
Map.prototype.getCenter = function getCenter(request, next) {
    var center = this.google.map.getCenter();
    Object.assign(request, {
        lat: center.lat(),
        lng: center.lng(),
        address: false
    });
    next(request);
};
Map.prototype.hideCenterButton = function hideCenterButton(request, next) {
    hide(this.redo);
    next(request);
};
Map.prototype.destroy = function destroy() {
    off(this.redo, 'click', this.onRedo);
    Loader.release();
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWlDLFNBQVMsaUJBQWtCLE9BQVMsRUFBQSxNQUFNO0lBQ3pFLElBQUEsQ0FBSyxJQUFBLENBQUs7SUFDVixJQUFBLENBQUs7QUFDUDtBQUVBLEdBQUEsQ0FBSSxTQUFKLENBQWMsT0FBZCxDQUFBLENBQUEsQ0FBd0IsU0FBUyxVQUFXO0lBQzFDLEdBQUEsQ0FBSSxJQUFBLENBQUssTUFBTSxTQUFTLElBQUEsQ0FBSztJQUM3QixNQUFBLENBQU8sT0FBUDtBQUNGO0FBRUEsZUFBZTtBQTdOZiIsImZpbGUiOiJNYXAuanMob3JpZ2luYWwpIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYWRlciBmcm9tICdnb29nbGUtbWFwcydcbmltcG9ydCB7XG4gIGZvcm1hdEdlb2NvZGluZ1BheWxvYWQsXG4gIGVuZHBvaW50RXJyb3IsXG4gIGhpZGUsXG4gIHNob3csXG4gIHBkLFxuICBzZWxlY3QsXG4gIG9uLFxuICBvZmZcbn0gZnJvbSAnLi9saWIvdXRpbHMnXG5cbmZ1bmN0aW9uIE1hcCAoe3NldHRpbmdzLCBlbGVtZW50cywgdGVtcGxhdGVzfSwgYnVzKSB7XG4gIHRoaXMuYnVzID0gYnVzXG4gIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5nc1xuICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHNcbiAgdGhpcy50ZW1wbGF0ZXMgPSB0ZW1wbGF0ZXNcbiAgdGhpcy5tYXJrZXJzID0gW11cbiAgdGhpcy5nb29nbGUgPSB7fVxuXG4gIHRoaXMubWFwID0gc2VsZWN0KGVsZW1lbnRzLm1hcClcbiAgdGhpcy5yZWRvID0gc2VsZWN0KGVsZW1lbnRzLnJlZG8pXG5cbiAgdGhpcy51cGRhdGVNYXAgPSB0aGlzLnVwZGF0ZU1hcC5iaW5kKHRoaXMpXG4gIHRoaXMuZm9jdXNPbk1hcmtlciA9IHRoaXMuZm9jdXNPbk1hcmtlci5iaW5kKHRoaXMpXG4gIHRoaXMudXBkYXRlSWNvbnMgPSB0aGlzLnVwZGF0ZUljb25zLmJpbmQodGhpcylcbiAgdGhpcy5zaG93Q2VudGVyQnV0dG9uID0gdGhpcy5zaG93Q2VudGVyQnV0dG9uLmJpbmQodGhpcylcbiAgdGhpcy5vblJlZG8gPSB0aGlzLm9uUmVkby5iaW5kKHRoaXMpXG5cbiAgYnVzLm9uKCdyZXNwb25zZScsIHRoaXMudXBkYXRlTWFwKVxuICBidXMub24oJ2ZvY3VzLW9uLW1hcmtlcicsIHRoaXMuZm9jdXNPbk1hcmtlcilcbiAgYnVzLm9uKCd6b29tLWNoYW5nZWQnLCB0aGlzLnVwZGF0ZUljb25zKVxuICBidXMub24oJ2RyYWdlbmQnLCB0aGlzLnNob3dDZW50ZXJCdXR0b24pXG5cbiAgYnVzLmFkZEFjdGlvbignTWFwL0dlb2NvZGUnLCB0aGlzLmdlb2NvZGUsIHRoaXMpXG4gIGJ1cy5hZGRBY3Rpb24oJ01hcC9nZXRDZW50ZXInLCB0aGlzLmdldENlbnRlciwgdGhpcylcbiAgYnVzLmFkZEFjdGlvbignTWFwL2hpZGVDZW50ZXJCdXR0b24nLCB0aGlzLmhpZGVDZW50ZXJCdXR0b24sIHRoaXMpXG5cbiAgaWYgKHRoaXMucmVkbykge1xuICAgIG9uKHRoaXMucmVkbywgJ2NsaWNrJywgdGhpcy5vblJlZG8pXG4gIH1cblxuICBMb2FkZXIuTElCUkFSSUVTID0gWydnZW9tZXRyeScsICdwbGFjZXMnXVxuICBMb2FkZXIuS0VZID0gc2V0dGluZ3Mua2V5XG4gIExvYWRlci5MQU5HVUFHRSA9IHNldHRpbmdzLmxhbmdcbiAgTG9hZGVyLlJFR0lPTiA9IHNldHRpbmdzLnJlZ2lvblxuXG4gIExvYWRlci5sb2FkKHRoaXMuZ29vZ2xlSGFzTG9hZGVkLmJpbmQodGhpcykpXG59XG5cbk1hcC5wcm90b3R5cGUuZ29vZ2xlSGFzTG9hZGVkID0gZnVuY3Rpb24gZ29vZ2xlSGFzTG9hZGVkIChHb29nbGUpIHtcbiAgdGhpcy5nb29nbGUuY29yZSA9IEdvb2dsZVxuICB0aGlzLmdvb2dsZS5nZW9jb2RlciA9IG5ldyBHb29nbGUubWFwcy5HZW9jb2RlcigpXG4gIGNvbnN0IHtcbiAgICBjZW50ZXIsXG4gICAgem9vbSxcbiAgICBzdHlsZXMsXG4gICAgZGlzYWJsZURlZmF1bHRVSSxcbiAgICB6b29tQ29udHJvbCxcbiAgICBnZXN0dXJlSGFuZGxpbmdcbiAgfSA9IHRoaXMuc2V0dGluZ3NcbiAgdGhpcy5nb29nbGUubWFwID0gbmV3IEdvb2dsZS5tYXBzLk1hcCh0aGlzLm1hcCwge1xuICAgIGNlbnRlcixcbiAgICB6b29tLFxuICAgIHN0eWxlcyxcbiAgICBkaXNhYmxlRGVmYXVsdFVJLFxuICAgIHpvb21Db250cm9sLFxuICAgIGdlc3R1cmVIYW5kbGluZ1xuICB9KVxuICB0aGlzLmdvb2dsZS5tYXAuYWRkTGlzdGVuZXIoJ2RyYWdlbmQnLCAoKSA9PiB0aGlzLmJ1cy5lbWl0KCdkcmFnZW5kJykpXG4gIHRoaXMuZ29vZ2xlLm1hcC5hZGRMaXN0ZW5lcignem9vbV9jaGFuZ2VkJywgKCkgPT4gdGhpcy5idXMuZW1pdCgnem9vbS1jaGFuZ2VkJykpXG59XG5cbk1hcC5wcm90b3R5cGUub25SZWRvID0gZnVuY3Rpb24gb25SZWRvIChlKSB7XG4gIGUgJiYgcGQoZSlcbiAgZSAmJiBlLnRhcmdldCAmJiBoaWRlKGUudGFyZ2V0KVxuICB0aGlzLmJ1cy5lbWl0KCdyZXF1ZXN0JywgdGhpcy5idXMuYXBwbHlGaWx0ZXIoJ01hcC9vblJlZG8vcmVxdWVzdCcsIFtcbiAgICAnRm9ybS92YWxpZGF0ZScsXG4gICAgJ0Zvcm0vZ2V0VmFsdWVzJyxcbiAgICAnTWFwL2hpZGVDZW50ZXJCdXR0b24nLFxuICAgICdNYXAvZ2V0Q2VudGVyJyxcbiAgICAnU2lkZWJhci9nZXRGaWx0ZXJzJyxcbiAgICAnUGFnaW5hdGlvbi9wYWdlU2l6ZScsXG4gICAgJ1BhZ2luYXRpb24vZ2V0Q3VycmVudFBhZ2UnLFxuICAgICdNYXAvR2VvY29kZSdcbiAgXSkpXG59XG5cbk1hcC5wcm90b3R5cGUudXBkYXRlTWFwID0gZnVuY3Rpb24gdXBkYXRlTWFwIChyZXEsIHJlcykge1xuICBjb25zdCBtaWRkbGUgPSB7XG4gICAgbGF0OiBOdW1iZXIocmVxLmxhdCksXG4gICAgbG5nOiBOdW1iZXIocmVxLmxuZylcbiAgfVxuICB0aGlzLnJlc2V0Q2VudGVyKG1pZGRsZSlcbiAgdGhpcy5yZW1vdmVNYXJrZXJzKClcbiAgdGhpcy5hZGRNYXJrZXIoey4uLm1pZGRsZSwgY2VudGVyOiB0cnVlfSwgMCwgZmFsc2UsIHRydWUpXG4gIHRoaXMuYWRkTWFya2VycyhyZXEsIHJlcylcbn1cblxuTWFwLnByb3RvdHlwZS5yZXNldENlbnRlciA9IGZ1bmN0aW9uIHJlc2V0Q2VudGVyIChuZXdQb3NpdGlvbikge1xuICB0aGlzLmdvb2dsZS5tYXAuc2V0Q2VudGVyKG5ld1Bvc2l0aW9uKVxufVxuXG5NYXAucHJvdG90eXBlLnJlbW92ZU1hcmtlcnMgPSBmdW5jdGlvbiByZW1vdmVNYXJrZXJzICgpIHtcbiAgdGhpcy5tYXJrZXJzLmZvckVhY2goKHttYXJrZXJ9KSA9PiBtYXJrZXIuc2V0TWFwKG51bGwpKVxuICB0aGlzLm1hcmtlcnMgPSBbXVxufVxuXG5NYXAucHJvdG90eXBlLmFkZE1hcmtlcnMgPSBmdW5jdGlvbiBhZGRNYXJrZXJzIChyZXEsIHJlcykge1xuICBsZXQge2xvY2F0aW9ucyA9IFtdfSA9IHJlc1xuXG4gIGlmIChsb2NhdGlvbnMubGVuZ3RoID09PSBbXSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgbG9jYXRpb25zLm1hcCgobG9jYXRpb24sIGkpID0+IHtcbiAgICB0aGlzLmFkZE1hcmtlcihsb2NhdGlvbiwgKGkgKyAxKSlcbiAgfSlcbn1cblxuTWFwLnByb3RvdHlwZS5hZGRNYXJrZXIgPSBmdW5jdGlvbiBhZGRNYXJrZXIgKGxvY2F0aW9uLCBpLCBtYXJrZXIgPSBmYWxzZSwgY2VudGVyID0gZmFsc2UpIHtcbiAgbGV0IHNpemUgPSB0aGlzLnNldHRpbmdzLmljb25TaXplKGxvY2F0aW9uLCB0aGlzLmdvb2dsZS5tYXAuZ2V0Wm9vbSgpKVxuICBtYXJrZXIgPSBuZXcgdGhpcy5nb29nbGUuY29yZS5tYXBzLk1hcmtlcih7XG4gICAgcG9zaXRpb246IHtcbiAgICAgIGxhdDogTnVtYmVyKGxvY2F0aW9uLmxhdCksXG4gICAgICBsbmc6IE51bWJlcihsb2NhdGlvbi5sbmcpXG4gICAgfSxcbiAgICBpY29uOiB7XG4gICAgICB1cmw6IHRoaXMuc2V0dGluZ3MuaWNvbihsb2NhdGlvbiksXG4gICAgICBzY2FsZWRTaXplOiBuZXcgdGhpcy5nb29nbGUuY29yZS5tYXBzLlNpemUoc2l6ZSwgc2l6ZSlcbiAgICB9LFxuICAgIHpJbmRleDogaSxcbiAgICBtYXA6IHRoaXMuZ29vZ2xlLm1hcFxuICB9KVxuXG4gIGlmICghY2VudGVyKSB7XG4gICAgbWFya2VyLmh0bWwgPSB0aGlzLmNyZWF0ZU1hcmtlckhUTUwobG9jYXRpb24pXG4gICAgbWFya2VyLmFkZExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2hvd01vZGFsLmJpbmQodGhpcywgbWFya2VyKSlcbiAgICBtYXJrZXIubmFtZSA9IGxvY2F0aW9uLm5hbWVcbiAgfSBlbHNlIHtcbiAgICBtYXJrZXIubmFtZSA9ICdjZW50ZXInXG4gIH1cbiAgdGhpcy5tYXJrZXJzLnB1c2goe2xvY2F0aW9uLCBtYXJrZXJ9KVxufVxuXG5NYXAucHJvdG90eXBlLnNob3dNb2RhbCA9IGZ1bmN0aW9uIHNob3dNb2RhbCAobWFya2VyKSB7XG4gIGlmICghdGhpcy5JbmZvV2luZG93KSB7XG4gICAgdGhpcy5JbmZvV2luZG93ID0gbmV3IHRoaXMuZ29vZ2xlLmNvcmUubWFwcy5JbmZvV2luZG93KHtcbiAgICAgIG1hcDogdGhpcy5nb29nbGUubWFwXG4gICAgfSlcbiAgfVxuICB0aGlzLkluZm9XaW5kb3cuc2V0Q29udGVudChtYXJrZXIuaHRtbClcbiAgdGhpcy5JbmZvV2luZG93Lm9wZW4odGhpcy5nb29nbGUubWFwLCBtYXJrZXIpXG59XG5cbk1hcC5wcm90b3R5cGUuY3JlYXRlTWFya2VySFRNTCA9IGZ1bmN0aW9uIGNyZWF0ZU1hcmtlckhUTUwgKGRhdGEpIHtcbiAgcmV0dXJuIHRoaXMudGVtcGxhdGVzLm1hcmtlcihkYXRhKVxufVxuXG5NYXAucHJvdG90eXBlLmZvY3VzT25NYXJrZXIgPSBmdW5jdGlvbiBmb2N1c09uTWFya2VyIChpbmRleCkge1xuICAvLyArMSB0YWtlcyBpbnRvIGFjY291bnQgdGhlIGZpcnN0IGNlbnRlciBtYXJrZXJcbiAgbGV0IG1hcmtlciA9IHRoaXMubWFya2Vycy5tYXAoKHttYXJrZXJ9KSA9PiBtYXJrZXIpW2luZGV4ICsgMV1cbiAgdGhpcy5yZXNldENlbnRlcihtYXJrZXIuZ2V0UG9zaXRpb24oKSlcbiAgdGhpcy5zaG93TW9kYWwobWFya2VyKVxufVxuXG5NYXAucHJvdG90eXBlLnVwZGF0ZUljb25zID0gZnVuY3Rpb24gdXBkYXRlSWNvbnMgKCkge1xuICB0aGlzLm1hcmtlcnMuZm9yRWFjaCgoe2xvY2F0aW9uLCBtYXJrZXJ9KSA9PiB7XG4gICAgbGV0IHNpemUgPSB0aGlzLnNldHRpbmdzLmljb25TaXplKGxvY2F0aW9uLCB0aGlzLmdvb2dsZS5tYXAuZ2V0Wm9vbSgpKVxuICAgIG1hcmtlci5zZXRJY29uKHtcbiAgICAgIHVybDogdGhpcy5zZXR0aW5ncy5pY29uKGxvY2F0aW9uKSxcbiAgICAgIHNjYWxlZFNpemU6IG5ldyB0aGlzLmdvb2dsZS5jb3JlLm1hcHMuU2l6ZShzaXplLCBzaXplKVxuICAgIH0pXG4gIH0pXG59XG5cbk1hcC5wcm90b3R5cGUuc2hvd0NlbnRlckJ1dHRvbiA9IGZ1bmN0aW9uIHNob3dDZW50ZXJCdXR0b24gKCkge1xuICBpZiAodGhpcy5yZWRvKSB7XG4gICAgc2hvdyh0aGlzLnJlZG8pXG4gIH1cbn1cblxuTWFwLnByb3RvdHlwZS5nZW9jb2RlID0gZnVuY3Rpb24gZ2VvY29kZSAocmVxdWVzdCwgbmV4dCkge1xuICBsZXQgZ2VvY29kZVJlcSA9IGZvcm1hdEdlb2NvZGluZ1BheWxvYWQocmVxdWVzdClcbiAgbGV0IGFkZHJlc3MgPSAhZ2VvY29kZVJlcVsnbG9jYXRpb24nXVxuXG4gIHRoaXMuZ29vZ2xlLmdlb2NvZGVyLmdlb2NvZGUoZ2VvY29kZVJlcSwgKHJlcywgc3RhdHVzKSA9PiB7XG4gICAgaWYgKHN0YXR1cyA9PT0gJ09LJykge1xuICAgICAgbGV0IGxvY2F0aW9uID0gcmVzWzBdIHx8IHt9XG4gICAgICByZXF1ZXN0WydhZGRyZXNzJ10gPSBsb2NhdGlvbi5mb3JtYXR0ZWRfYWRkcmVzcyB8fCByZXF1ZXN0LmFkZHJlc3NcbiAgICAgIGlmIChhZGRyZXNzKSB7XG4gICAgICAgIHJlcXVlc3RbJ2xhdCddID0gbG9jYXRpb24uZ2VvbWV0cnkubG9jYXRpb24ubGF0KClcbiAgICAgICAgcmVxdWVzdFsnbG5nJ10gPSBsb2NhdGlvbi5nZW9tZXRyeS5sb2NhdGlvbi5sbmcoKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbmRwb2ludEVycm9yKCdnZW9jb2RlIGVycm9yJylcbiAgICB9XG4gICAgbmV4dChyZXF1ZXN0KVxuICB9KVxufVxuXG5NYXAucHJvdG90eXBlLmdldENlbnRlciA9IGZ1bmN0aW9uIGdldENlbnRlciAocmVxdWVzdCwgbmV4dCkge1xuICBsZXQgY2VudGVyID0gdGhpcy5nb29nbGUubWFwLmdldENlbnRlcigpXG4gIE9iamVjdC5hc3NpZ24ocmVxdWVzdCwge1xuICAgIGxhdDogY2VudGVyLmxhdCgpLFxuICAgIGxuZzogY2VudGVyLmxuZygpLFxuICAgIGFkZHJlc3M6IGZhbHNlXG4gIH0pXG4gIG5leHQocmVxdWVzdClcbn1cblxuTWFwLnByb3RvdHlwZS5oaWRlQ2VudGVyQnV0dG9uID0gZnVuY3Rpb24gaGlkZUNlbnRlckJ1dHRvbiAocmVxdWVzdCwgbmV4dCkge1xuICBoaWRlKHRoaXMucmVkbylcbiAgbmV4dChyZXF1ZXN0KVxufVxuXG5NYXAucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgb2ZmKHRoaXMucmVkbywgJ2NsaWNrJywgdGhpcy5vblJlZG8pXG4gIExvYWRlci5yZWxlYXNlKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFwXG4iXX0=

function Form(ref, bus) {
    var elements = ref.elements;

    this.bus = bus;
    this.form = select(elements.form);
    this.onSubmit = this.onSubmit.bind(this);
    if (this.form) {
        on(this.form, 'submit', this.onSubmit);
        bus.addAction('Form/validate', this.validate, this);
        bus.addAction('Form/getValues', this.getValues, this);
        bus.on('response', this.updateAddress.bind(this));
    }
}

Form.prototype.onSubmit = function onSubmit(e) {
    e && pd(e);
    this.bus.emit('request', this.bus.applyFilter('Form/onSubmit/request', ['Form/validate',
        'Form/getValues','Sidebar/getFilters','Pagination/pageSize','Pagination/getCurrentPage',
        'Map/Geocode']));
};
Form.prototype.validate = function validate(request, next) {
    next();
};
Form.prototype.getValues = function getValues(request, next) {
    var els = select('[name]', this.form, true);
    els.map(function (el) {
        if (el.value) {
            request[el.getAttribute('name')] = el.value;
        }
    });
    next(request);
};
Form.prototype.updateAddress = function updateAddress(request, response) {
    var el = select('[name="address"]', this.form);
    el && (el.value = request.address);
};
Form.prototype.destroy = function destroy() {
    if (this.form) {
        off(this.form, 'submit', this.onSubmit);
    }
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcm0uanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQ0UsSUFDQSxRQUNBLElBQ0EsVUFDSztBQUVQLFNBQVMsS0FBTSxDQUFDLFNBQVcsRUFBQSxLQUFLO0lBQzlCLElBQUEsQ0FBSyxHQUFMLENBQUEsQ0FBQSxDQUFXO0lBQ1gsSUFBQSxDQUFLLElBQUwsQ0FBQSxDQUFBLENBQVksTUFBQSxDQUFPLFFBQUEsQ0FBUztJQUM1QixJQUFBLENBQUssUUFBTCxDQUFBLENBQUEsQ0FBZ0IsSUFBQSxDQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CO0lBRW5DLElBQUksSUFBQSxDQUFLLE1BQU07UUFDYixFQUFBLENBQUcsSUFBQSxDQUFLLE1BQU0sVUFBVSxJQUFBLENBQUs7UUFDN0IsR0FBQSxDQUFJLFNBQUosQ0FBYyxpQkFBaUIsSUFBQSxDQUFLLFVBQVU7UUFDOUMsR0FBQSxDQUFJLFNBQUosQ0FBYyxrQkFBa0IsSUFBQSxDQUFLLFdBQVc7UUFDaEQsR0FBQSxDQUFJLEVBQUosQ0FBTyxZQUFZLElBQUEsQ0FBSyxhQUFMLENBQW1CLElBQW5CLENBQXdCO0lBQy9DO0FBQ0E7O0FBRUEsSUFBQSxDQUFLLFNBQUwsQ0FBZSxRQUFmLENBQUEsQ0FBQSxDQUEwQixTQUFTLFNBQVUsR0FBRztJQUM5QyxDQUFBLENBQUEsRUFBQSxDQUFLLEVBQUEsQ0FBRztJQUNSLElBQUEsQ0FBSyxHQUFMLENBQVMsSUFBVCxDQUFjLFdBQVcsSUFBQSxDQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLHlCQUF5QixDQUNyRTtRQUNBLGlCQUNBLHFCQUNBLHNCQUNBO1FBQ0E7QUFFSjtBQUVBLElBQUEsQ0FBSyxTQUFMLENBQWUsUUFBZixDQUFBLENBQUEsQ0FBMEIsU0FBUyxTQUFVLE9BQVMsRUFBQSxNQUFNO0lBRTFELElBQUE7QUFDRjtBQUVBLElBQUEsQ0FBSyxTQUFMLENBQWUsU0FBZixDQUFBLENBQUEsQ0FBMkIsU0FBUyxVQUFXLE9BQVMsRUFBQSxNQUFNO0lBQzVELEdBQUEsQ0FBSSxNQUFNLE1BQUEsQ0FBTyxVQUFVLElBQUEsQ0FBSyxNQUFNO0lBQ3RDLEdBQUEsQ0FBSSxHQUFKLENBQVEsRUFBQSxJQUFNO1FBQ1osSUFBSSxFQUFBLENBQUcsT0FBTztZQUNaLE9BQUEsQ0FBUyxFQUFBLENBQUcsWUFBSCxDQUFnQixRQUF6QixDQUFBLENBQUEsQ0FBcUMsRUFBQSxDQUFHO1FBQzlDO0lBQ0E7SUFDRSxJQUFBLENBQUs7QUFDUDtBQUVBLElBQUEsQ0FBSyxTQUFMLENBQWUsYUFBZixDQUFBLENBQUEsQ0FBK0IsU0FBUyxjQUFlLE9BQVMsRUFBQSxVQUFVO0lBQ3hFLEtBQUEsQ0FBTSxLQUFLLE1BQUEsQ0FBTyxvQkFBb0IsSUFBQSxDQUFLO0lBQzNDLEVBQUEsQ0FBQSxFQUFBLEVBQU8sRUFBQSxDQUFHLEtBQUgsQ0FBQSxDQUFBLENBQVcsT0FBQSxDQUFRO0FBQzVCO0FBRUEsSUFBQSxDQUFLLFNBQUwsQ0FBZSxPQUFmLENBQUEsQ0FBQSxDQUF5QixTQUFTLFVBQVc7SUFDM0MsSUFBSSxJQUFBLENBQUssTUFBTTtRQUNiLEdBQUEsQ0FBSSxJQUFBLENBQUssTUFBTSxVQUFVLElBQUEsQ0FBSztJQUNsQztBQUNBO0FBRUEsZUFBZTtBQTFEZiIsImZpbGUiOiJGb3JtLmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIHBkLFxuICBzZWxlY3QsXG4gIG9uLFxuICBvZmZcbn0gZnJvbSAnLi9saWIvdXRpbHMnXG5cbmZ1bmN0aW9uIEZvcm0gKHtlbGVtZW50c30sIGJ1cykge1xuICB0aGlzLmJ1cyA9IGJ1c1xuICB0aGlzLmZvcm0gPSBzZWxlY3QoZWxlbWVudHMuZm9ybSlcbiAgdGhpcy5vblN1Ym1pdCA9IHRoaXMub25TdWJtaXQuYmluZCh0aGlzKVxuXG4gIGlmICh0aGlzLmZvcm0pIHtcbiAgICBvbih0aGlzLmZvcm0sICdzdWJtaXQnLCB0aGlzLm9uU3VibWl0KVxuICAgIGJ1cy5hZGRBY3Rpb24oJ0Zvcm0vdmFsaWRhdGUnLCB0aGlzLnZhbGlkYXRlLCB0aGlzKVxuICAgIGJ1cy5hZGRBY3Rpb24oJ0Zvcm0vZ2V0VmFsdWVzJywgdGhpcy5nZXRWYWx1ZXMsIHRoaXMpXG4gICAgYnVzLm9uKCdyZXNwb25zZScsIHRoaXMudXBkYXRlQWRkcmVzcy5iaW5kKHRoaXMpKVxuICB9XG59XG5cbkZvcm0ucHJvdG90eXBlLm9uU3VibWl0ID0gZnVuY3Rpb24gb25TdWJtaXQgKGUpIHtcbiAgZSAmJiBwZChlKVxuICB0aGlzLmJ1cy5lbWl0KCdyZXF1ZXN0JywgdGhpcy5idXMuYXBwbHlGaWx0ZXIoJ0Zvcm0vb25TdWJtaXQvcmVxdWVzdCcsIFtcbiAgICAnRm9ybS92YWxpZGF0ZScsXG4gICAgJ0Zvcm0vZ2V0VmFsdWVzJyxcbiAgICAnU2lkZWJhci9nZXRGaWx0ZXJzJyxcbiAgICAnUGFnaW5hdGlvbi9wYWdlU2l6ZScsXG4gICAgJ1BhZ2luYXRpb24vZ2V0Q3VycmVudFBhZ2UnLFxuICAgICdNYXAvR2VvY29kZSdcbiAgXSkpXG59XG5cbkZvcm0ucHJvdG90eXBlLnZhbGlkYXRlID0gZnVuY3Rpb24gdmFsaWRhdGUgKHJlcXVlc3QsIG5leHQpIHtcbiAgLy8gdGhpcyBjYW4gYmUgZmlsbGVkIG91dC4uXG4gIG5leHQoKVxufVxuXG5Gb3JtLnByb3RvdHlwZS5nZXRWYWx1ZXMgPSBmdW5jdGlvbiBnZXRWYWx1ZXMgKHJlcXVlc3QsIG5leHQpIHtcbiAgbGV0IGVscyA9IHNlbGVjdCgnW25hbWVdJywgdGhpcy5mb3JtLCB0cnVlKVxuICBlbHMubWFwKGVsID0+IHtcbiAgICBpZiAoZWwudmFsdWUpIHtcbiAgICAgIHJlcXVlc3RbIGVsLmdldEF0dHJpYnV0ZSgnbmFtZScpIF0gPSBlbC52YWx1ZVxuICAgIH1cbiAgfSlcbiAgbmV4dChyZXF1ZXN0KVxufVxuXG5Gb3JtLnByb3RvdHlwZS51cGRhdGVBZGRyZXNzID0gZnVuY3Rpb24gdXBkYXRlQWRkcmVzcyAocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgY29uc3QgZWwgPSBzZWxlY3QoJ1tuYW1lPVwiYWRkcmVzc1wiXScsIHRoaXMuZm9ybSlcbiAgZWwgJiYgKGVsLnZhbHVlID0gcmVxdWVzdC5hZGRyZXNzKVxufVxuXG5Gb3JtLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIGlmICh0aGlzLmZvcm0pIHtcbiAgICBvZmYodGhpcy5mb3JtLCAnc3VibWl0JywgdGhpcy5vblN1Ym1pdClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGb3JtXG4iXX0=

function Sidebar(ref, bus) {
    var this$1 = this;
    var elements = ref.elements;
    var templates = ref.templates;

    this.bus = bus;
    this.templates = templates;
    this.sidebar = select(elements.sidebar);
    this.filters = select(elements.filter, document, true) || [];
    this.geolocation = select(elements.geolocation, document, true) || [];
    this.geolocationFeedback = select(elements.geolocationFeedback, document, true) || [];
    this.onGeolocationClick = this.onGeolocationClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onResponse = this.onResponse.bind(this);
    if (!this.sidebar) {
        return;
    }
    this.geolocation.length && this.geolocation.map(function (el) {
        on(el, 'click', this$1.onGeolocationClick);
    });
    this.filters.length && this.filters.map(function (el) {
        on(el, 'change', this$1.onFilterChange);
    });
    bus.on('response', this.onResponse);
    bus.addAction('Sidebar/getFilters', this.getFilters, this);
    bus.addAction('Sidebar/geolocation', this.askForGeolocation, this);
}

Sidebar.prototype.onGeolocationClick = function onGeolocationClick(e) {
    e && pd(e);
    this.bus.emit('request', this.bus.applyFilter('Sidebar/onGeolocationClick/request', ['Form/getValues',
        'Pagination/pageSize','Pagination/getCurrentPage','Sidebar/geolocation','Sidebar/getFilters',
        'Map/Geocode']));
};
Sidebar.prototype.onFilterChange = function onFilterChange(e) {
    e && pd(e);
    this.bus.emit('request', this.bus.applyFilter('Sidebar/onFilterChange/request', ['Form/getValues',
        'Sidebar/getFilters','Pagination/pageSize','Map/Geocode']));
};
Sidebar.prototype.onResponse = function onResponse(req, res) {
    clearElement(this.sidebar);
    this.addToSidebar(res);
};
Sidebar.prototype.addToSidebar = function addToSidebar(response) {
    var this$1 = this;

    if (!response.locations.length) {
        return this.noResults();
    }
    this.sidebar.scrollTop = 0;
    response.locations.map(function (location, i) {
        var item = document.createElement('div');
        on(item, 'click', function (e) { return this$1.showMarker(e, i); });
        item.innerHTML = this$1.templates.sidebar(location);
        this$1.sidebar.appendChild(item);
    });
};
Sidebar.prototype.showMarker = function showMarker(e, i) {
    if (e.target.getAttribute('href')) {
        return;
    }
    e && pd(e);
    this.bus.emit('focus-on-marker', i, e);
};
Sidebar.prototype.noResults = function noResults() {
    this.sidebar.innerHTML = this.templates.empty();
};
Sidebar.prototype.getFilters = function getFilters(request, next) {
    var vals = this.filters.reduce(function (obj, el) {
        var attr = el.getAttribute('name');
        if (!el.checked) 
            { return obj; }
        if (!obj[attr]) 
            { obj[attr] = []; }
        obj[el.getAttribute('name')].push(el.value);
        return obj;
    }, {});
    if (Object.keys(vals).length) {
        next(Object.assign(request, vals));
    } else {
        next(request);
    }
};
Sidebar.prototype.askForGeolocation = function askForGeolocation(request, next) {
    if (this.geolocation.length) {
        this.geolocation.forEach(function (el) {
            el.style.display = 'none';
        });
    }
    if (this.geolocationFeedback.length) {
        this.geolocationFeedback.forEach(function (el) { return show(el); });
    }
    navigator.geolocation.getCurrentPosition(function (res) {
        next(Object.assign(request, {
            lat: res.coords.latitude,
            lng: res.coords.longitude
        }));
    });
};
Sidebar.prototype.destroy = function destroy() {
    var this$1 = this;

    this.geolocation.length && this.geolocation.map(function (el) {
        off(el, 'click', this$1.onGeolocationClick);
    });
    this.filters.length && this.filters.map(function (el) {
        off(el, 'change', this$1.onFilterChange);
    });
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFrQixPQUFsQixDQUFBLENBQUEsQ0FBNEIsU0FBUyxVQUFXO0lBQzlDLElBQUEsQ0FBSyxXQUFMLENBQWlCLE1BQWpCLENBQUEsRUFBQSxDQUEyQixJQUFBLENBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixFQUFBLElBQU07UUFDcEQsR0FBQSxDQUFJLElBQUksU0FBUyxJQUFBLENBQUs7SUFDMUI7SUFFRSxJQUFBLENBQUssT0FBTCxDQUFhLE1BQWIsQ0FBQSxFQUFBLENBQXVCLElBQUEsQ0FBSyxPQUFMLENBQWEsR0FBYixDQUFpQixFQUFBLElBQU07UUFDNUMsR0FBQSxDQUFJLElBQUksVUFBVSxJQUFBLENBQUs7SUFDM0I7QUFDQTtBQUVBLGVBQWU7QUF2SWYiLCJmaWxlIjoiU2lkZWJhci5qcyhvcmlnaW5hbCkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBjbGVhckVsZW1lbnQsXG4gIHNob3csXG4gIHBkLFxuICBzZWxlY3QsXG4gIG9uLFxuICBvZmZcbn0gZnJvbSAnLi9saWIvdXRpbHMnXG5cbmZ1bmN0aW9uIFNpZGViYXIgKHtlbGVtZW50cywgdGVtcGxhdGVzfSwgYnVzKSB7XG4gIHRoaXMuYnVzID0gYnVzXG4gIHRoaXMudGVtcGxhdGVzID0gdGVtcGxhdGVzXG4gIHRoaXMuc2lkZWJhciA9IHNlbGVjdChlbGVtZW50cy5zaWRlYmFyKVxuICB0aGlzLmZpbHRlcnMgPSBzZWxlY3QoZWxlbWVudHMuZmlsdGVyLCBkb2N1bWVudCwgdHJ1ZSkgfHwgW11cbiAgdGhpcy5nZW9sb2NhdGlvbiA9IHNlbGVjdChlbGVtZW50cy5nZW9sb2NhdGlvbiwgZG9jdW1lbnQsIHRydWUpIHx8IFtdXG4gIHRoaXMuZ2VvbG9jYXRpb25GZWVkYmFjayA9IHNlbGVjdChlbGVtZW50cy5nZW9sb2NhdGlvbkZlZWRiYWNrLCBkb2N1bWVudCwgdHJ1ZSkgfHwgW11cbiAgdGhpcy5vbkdlb2xvY2F0aW9uQ2xpY2sgPSB0aGlzLm9uR2VvbG9jYXRpb25DbGljay5iaW5kKHRoaXMpXG4gIHRoaXMub25GaWx0ZXJDaGFuZ2UgPSB0aGlzLm9uRmlsdGVyQ2hhbmdlLmJpbmQodGhpcylcbiAgdGhpcy5vblJlc3BvbnNlID0gdGhpcy5vblJlc3BvbnNlLmJpbmQodGhpcylcblxuICBpZiAoIXRoaXMuc2lkZWJhcikge1xuICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy5nZW9sb2NhdGlvbi5sZW5ndGggJiYgdGhpcy5nZW9sb2NhdGlvbi5tYXAoZWwgPT4ge1xuICAgIG9uKGVsLCAnY2xpY2snLCB0aGlzLm9uR2VvbG9jYXRpb25DbGljaylcbiAgfSlcblxuICB0aGlzLmZpbHRlcnMubGVuZ3RoICYmIHRoaXMuZmlsdGVycy5tYXAoZWwgPT4ge1xuICAgIG9uKGVsLCAnY2hhbmdlJywgdGhpcy5vbkZpbHRlckNoYW5nZSlcbiAgfSlcblxuICBidXMub24oJ3Jlc3BvbnNlJywgdGhpcy5vblJlc3BvbnNlKVxuICBidXMuYWRkQWN0aW9uKCdTaWRlYmFyL2dldEZpbHRlcnMnLCB0aGlzLmdldEZpbHRlcnMsIHRoaXMpXG4gIGJ1cy5hZGRBY3Rpb24oJ1NpZGViYXIvZ2VvbG9jYXRpb24nLCB0aGlzLmFza0Zvckdlb2xvY2F0aW9uLCB0aGlzKVxufVxuXG5TaWRlYmFyLnByb3RvdHlwZS5vbkdlb2xvY2F0aW9uQ2xpY2sgPSBmdW5jdGlvbiBvbkdlb2xvY2F0aW9uQ2xpY2sgKGUpIHtcbiAgZSAmJiBwZChlKVxuICAvLyBzaG93KHRoaXMuZ2VvZmVlZGJhY2spXG4gIHRoaXMuYnVzLmVtaXQoJ3JlcXVlc3QnLCB0aGlzLmJ1cy5hcHBseUZpbHRlcignU2lkZWJhci9vbkdlb2xvY2F0aW9uQ2xpY2svcmVxdWVzdCcsIFtcbiAgICAnRm9ybS9nZXRWYWx1ZXMnLFxuICAgICdQYWdpbmF0aW9uL3BhZ2VTaXplJyxcbiAgICAnUGFnaW5hdGlvbi9nZXRDdXJyZW50UGFnZScsXG4gICAgJ1NpZGViYXIvZ2VvbG9jYXRpb24nLFxuICAgICdTaWRlYmFyL2dldEZpbHRlcnMnLFxuICAgICdNYXAvR2VvY29kZSdcbiAgXSkpXG59XG5cblNpZGViYXIucHJvdG90eXBlLm9uRmlsdGVyQ2hhbmdlID0gZnVuY3Rpb24gb25GaWx0ZXJDaGFuZ2UgKGUpIHtcbiAgZSAmJiBwZChlKVxuICB0aGlzLmJ1cy5lbWl0KCdyZXF1ZXN0JywgdGhpcy5idXMuYXBwbHlGaWx0ZXIoJ1NpZGViYXIvb25GaWx0ZXJDaGFuZ2UvcmVxdWVzdCcsIFtcbiAgICAnRm9ybS9nZXRWYWx1ZXMnLFxuICAgICdTaWRlYmFyL2dldEZpbHRlcnMnLFxuICAgICdQYWdpbmF0aW9uL3BhZ2VTaXplJyxcbiAgICAnTWFwL0dlb2NvZGUnXG4gIF0pKVxufVxuXG5TaWRlYmFyLnByb3RvdHlwZS5vblJlc3BvbnNlID0gZnVuY3Rpb24gb25SZXNwb25zZSAocmVxLCByZXMpIHtcbiAgY2xlYXJFbGVtZW50KHRoaXMuc2lkZWJhcilcbiAgdGhpcy5hZGRUb1NpZGViYXIocmVzKVxufVxuXG5TaWRlYmFyLnByb3RvdHlwZS5hZGRUb1NpZGViYXIgPSBmdW5jdGlvbiBhZGRUb1NpZGViYXIgKHJlc3BvbnNlKSB7XG4gIGlmICghcmVzcG9uc2UubG9jYXRpb25zLmxlbmd0aCkge1xuICAgIHJldHVybiB0aGlzLm5vUmVzdWx0cygpXG4gIH1cblxuICB0aGlzLnNpZGViYXIuc2Nyb2xsVG9wID0gMFxuXG4gIHJlc3BvbnNlLmxvY2F0aW9ucy5tYXAoKGxvY2F0aW9uLCBpKSA9PiB7XG4gICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgb24oaXRlbSwgJ2NsaWNrJywgZSA9PiB0aGlzLnNob3dNYXJrZXIoZSwgaSkpXG4gICAgaXRlbS5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlcy5zaWRlYmFyKGxvY2F0aW9uKVxuICAgIHRoaXMuc2lkZWJhci5hcHBlbmRDaGlsZChpdGVtKVxuICB9KVxufVxuXG5TaWRlYmFyLnByb3RvdHlwZS5zaG93TWFya2VyID0gZnVuY3Rpb24gc2hvd01hcmtlciAoZSwgaSkge1xuICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJykpIHtcbiAgICByZXR1cm5cbiAgfVxuICBlICYmIHBkKGUpXG4gIHRoaXMuYnVzLmVtaXQoJ2ZvY3VzLW9uLW1hcmtlcicsIGksIGUpXG59XG5cblNpZGViYXIucHJvdG90eXBlLm5vUmVzdWx0cyA9IGZ1bmN0aW9uIG5vUmVzdWx0cyAoKSB7XG4gIHRoaXMuc2lkZWJhci5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlcy5lbXB0eSgpXG59XG5cblNpZGViYXIucHJvdG90eXBlLmdldEZpbHRlcnMgPSBmdW5jdGlvbiBnZXRGaWx0ZXJzIChyZXF1ZXN0LCBuZXh0KSB7XG4gIGxldCB2YWxzID0gdGhpcy5maWx0ZXJzLnJlZHVjZSgob2JqLCBlbCkgPT4ge1xuICAgIGxldCBhdHRyID0gZWwuZ2V0QXR0cmlidXRlKCduYW1lJylcbiAgICBpZiAoIWVsLmNoZWNrZWQpIHJldHVybiBvYmpcbiAgICBpZiAoIW9ialthdHRyXSkgb2JqW2F0dHJdID0gW11cbiAgICBvYmpbZWwuZ2V0QXR0cmlidXRlKCduYW1lJyldLnB1c2goZWwudmFsdWUpXG4gICAgcmV0dXJuIG9ialxuICB9LCB7fSlcblxuICBpZiAoT2JqZWN0LmtleXModmFscykubGVuZ3RoKSB7XG4gICAgbmV4dChPYmplY3QuYXNzaWduKHJlcXVlc3QsIHZhbHMpKVxuICB9IGVsc2Uge1xuICAgIG5leHQocmVxdWVzdClcbiAgfVxufVxuXG5TaWRlYmFyLnByb3RvdHlwZS5hc2tGb3JHZW9sb2NhdGlvbiA9IGZ1bmN0aW9uIGFza0Zvckdlb2xvY2F0aW9uIChyZXF1ZXN0LCBuZXh0KSB7XG4gIGlmICh0aGlzLmdlb2xvY2F0aW9uLmxlbmd0aCkge1xuICAgIHRoaXMuZ2VvbG9jYXRpb24uZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfSlcbiAgfVxuICBpZiAodGhpcy5nZW9sb2NhdGlvbkZlZWRiYWNrLmxlbmd0aCkge1xuICAgIHRoaXMuZ2VvbG9jYXRpb25GZWVkYmFjay5mb3JFYWNoKGVsID0+IHNob3coZWwpKVxuICB9XG4gIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24ocmVzID0+IHtcbiAgICBuZXh0KE9iamVjdC5hc3NpZ24ocmVxdWVzdCwge1xuICAgICAgbGF0OiByZXMuY29vcmRzLmxhdGl0dWRlLFxuICAgICAgbG5nOiByZXMuY29vcmRzLmxvbmdpdHVkZVxuICAgIH0pKVxuICB9KVxufVxuXG5TaWRlYmFyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIHRoaXMuZ2VvbG9jYXRpb24ubGVuZ3RoICYmIHRoaXMuZ2VvbG9jYXRpb24ubWFwKGVsID0+IHtcbiAgICBvZmYoZWwsICdjbGljaycsIHRoaXMub25HZW9sb2NhdGlvbkNsaWNrKVxuICB9KVxuXG4gIHRoaXMuZmlsdGVycy5sZW5ndGggJiYgdGhpcy5maWx0ZXJzLm1hcChlbCA9PiB7XG4gICAgb2ZmKGVsLCAnY2hhbmdlJywgdGhpcy5vbkZpbHRlckNoYW5nZSlcbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2lkZWJhclxuIl19

function Pagination(ref, bus) {
    var elements = ref.elements;
    var settings = ref.settings;

    this.bus = bus;
    this.settings = settings;
    this.elements = elements;
    this.paginate = settings.paginate;
    this.pagination = select(elements.pagination);
    if (this.pagination) {
        this.left = select(elements.prevPage, this.pagination);
        this.right = select(elements.nextPage, this.pagination);
    }
    this.page = 0;
    this.onClick = this.onClick.bind(this);
    this.onResponse = this.onResponse.bind(this);
    this.getPageSize = this.getPageSize.bind(this);
    if (this.paginate && this.pagination) {
        on(this.pagination, 'click', this.onClick);
    }
    if (this.paginate) {
        bus.on('response', this.onResponse);
        bus.addAction('Pagination/pageSize', this.addPageSizeToRequest, this);
        bus.addAction('Pagination/getCurrentPage', this.getCurrentPage, this);
    }
}

Pagination.prototype.onClick = function onClick(e) {
    e && pd(e);
    if (this.incrementPage(e) !== false) {
        this.bus.emit('request', this.bus.applyFilter('Pagination/onClick/request', ['Bus/getPreviousRequest',
            'Pagination/pageSize','Pagination/getCurrentPage']));
    }
};
Pagination.prototype.onResponse = function onResponse(req, res) {
    this.updatePagination(res);
    this.updateDOM();
};
Pagination.prototype.incrementPage = function incrementPage(e) {
    var el = e.target;
    var prevClass = this.elements.prevPage.replace('.', '');
    var nextClass = this.elements.nextPage.replace('.', '');
    if (!hasClass(el, 'is-active')) {
        return false;
    }
    if (hasClass(el, prevClass)) {
        return this.page--;
    }
    if (hasClass(e.target, nextClass)) {
        return this.page++;
    }
    return false;
};
Pagination.prototype.updatePagination = function updatePagination(response) {
    this.pageCount = Number(response.pageCount);
    this.page = Number(response.page);
};
Pagination.prototype.addPageSizeToRequest = function addPageSizeToRequest(request, next) {
    Object.assign(request, {
        pageSize: this.getPageSize()
    });
    next(request);
};
Pagination.prototype.getPageSize = function getPageSize() {
    var pageSize = this.settings.pageSize;
    if (window.innerWidth < this.settings.mobileBreakpoint && this.settings.mobilePageSize) {
        this.pageSize = this.settings.mobilePageSize;
    }
    return pageSize;
};
Pagination.prototype.getCurrentPage = function getCurrentPage(request, next) {
    next((request['page'] = this.page, request));
};
Pagination.prototype.updateDOM = function updateDOM() {
    if (this.pagination && this.pageCount > 1) {
        this.pagination.classList.add('is-active');
    }
    if (this.left) {
        this.left.classList[this.hasPrevPage() ? 'add' : 'remove']('is-active');
    }
    if (this.right) {
        this.right.classList[this.hasNextPage() ? 'add' : 'remove']('is-active');
    }
};
Pagination.prototype.hasPrevPage = function hasPrevPage() {
    return this.page >= 1;
};
Pagination.prototype.hasNextPage = function hasNextPage() {
    return this.page + 1 < this.pageCount;
};
Pagination.prototype.destroy = function destroy() {
    if (this.pagination) {
        off(this.pagination, 'click', this.onClick);
    }
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhZ2luYXRpb24uanMob3JpZ2luYWwpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQ0UsVUFDQSxJQUNBLFFBQ0EsSUFDQSxVQUNLO0FBRVAsU0FBUyxXQUFZLENBQUMsVUFBVSxTQUFXLEVBQUEsS0FBSztJQUM5QyxJQUFBLENBQUssR0FBTCxDQUFBLENBQUEsQ0FBVztJQUNYLElBQUEsQ0FBSyxRQUFMLENBQUEsQ0FBQSxDQUFnQjtJQUNoQixJQUFBLENBQUssUUFBTCxDQUFBLENBQUEsQ0FBZ0I7SUFDaEIsSUFBQSxDQUFLLFFBQUwsQ0FBQSxDQUFBLENBQWdCLFFBQUEsQ0FBUztJQUN6QixJQUFBLENBQUssVUFBTCxDQUFBLENBQUEsQ0FBa0IsTUFBQSxDQUFPLFFBQUEsQ0FBUztJQUNsQyxJQUFJLElBQUEsQ0FBSyxZQUFZO1FBQ25CLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZLE1BQUEsQ0FBTyxRQUFBLENBQVMsVUFBVSxJQUFBLENBQUs7UUFDM0MsSUFBQSxDQUFLLEtBQUwsQ0FBQSxDQUFBLENBQWEsTUFBQSxDQUFPLFFBQUEsQ0FBUyxVQUFVLElBQUEsQ0FBSztJQUNoRDtJQUVFLElBQUEsQ0FBSyxJQUFMLENBQUEsQ0FBQSxDQUFZO0lBRVosSUFBQSxDQUFLLE9BQUwsQ0FBQSxDQUFBLENBQWUsSUFBQSxDQUFLLE9BQUwsQ0FBYSxJQUFiLENBQWtCO0lBQ2pDLElBQUEsQ0FBSyxVQUFMLENBQUEsQ0FBQSxDQUFrQixJQUFBLENBQUssVUFBTCxDQUFnQixJQUFoQixDQUFxQjtJQUN2QyxJQUFBLENBQUssV0FBTCxDQUFBLENBQUEsQ0FBbUIsSUFBQSxDQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FBc0I7SUFDekMsSUFBSSxJQUFBLENBQUssUUFBTCxDQUFBLEVBQUEsQ0FBaUIsSUFBQSxDQUFLLFlBQVk7UUFDcEMsRUFBQSxDQUFHLElBQUEsQ0FBSyxZQUFZLFNBQVMsSUFBQSxDQUFLO0lBQ3RDO0lBQ0UsSUFBSSxJQUFB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QUFTLFlBQWE7SUFDckQsSUFBSSxJQUFBLENBQUssVUFBTCxDQUFBLEVBQUEsQ0FBbUIsSUFBQSxDQUFLLFNBQUwsQ0FBQSxDQUFBLENBQWlCLEdBQUc7UUFDekMsSUFBQSxDQUFLLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FBMEIsR0FBMUIsQ0FBOEI7SUFDbEM7SUFDRSxJQUFJLElBQUEsQ0FBSyxNQUFNO1FBQ2IsSUFBQSxDQUFLLElBQUwsQ0FBVSxTQUFWLENBQXFCLElBQUEsQ0FBSyxXQUFMLEVBQUEsR0FBcUIsUUFBUSxTQUFsRCxDQUE2RDtJQUNqRTtJQUNFLElBQUksSUFBQSxDQUFLLE9BQU87UUFDZCxJQUFBLENBQUssS0FBTCxDQUFXLFNBQVgsQ0FBc0IsSUFBQSxDQUFLLFdBQUwsRUFBQSxHQUFxQixRQUFRLFNBQW5ELENBQThEO0lBQ2xFO0FBQ0E7QUFFQSxVQUFBLENBQVcsU0FBWCxDQUFxQixXQUFyQixDQUFBLENBQUEsQ0FBbUMsU0FBUyxjQUFlO0lBQ3pELE9BQU8sSUFBQSxDQUFLLElBQUwsQ0FBQSxFQUFBLENBQWE7QUFDdEI7QUFFQSxVQUFBLENBQVcsU0FBWCxDQUFxQixXQUFyQixDQUFBLENBQUEsQ0FBbUMsU0FBUyxjQUFlO0lBQ3pELE9BQVEsSUFBQSxDQUFLLElBQUwsQ0FBQSxDQUFBLENBQVksQ0FBYixDQUFBLENBQUEsQ0FBa0IsSUFBQSxDQUFLO0FBQ2hDO0FBRUEsVUFBQSxDQUFXLFNBQVgsQ0FBcUIsT0FBckIsQ0FBQSxDQUFBLENBQStCLFNBQVMsVUFBVztJQUNqRCxJQUFJLElBQUEsQ0FBSyxZQUFZO1FBQ25CLEdBQUEsQ0FBSSxJQUFBLENBQUssWUFBWSxTQUFTLElBQUEsQ0FBSztJQUN2QztBQUNBO0FBRUEsZUFBZTtBQTNIZiIsImZpbGUiOiJQYWdpbmF0aW9uLmpzKG9yaWdpbmFsKSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIGhhc0NsYXNzLFxuICBwZCxcbiAgc2VsZWN0LFxuICBvbixcbiAgb2ZmXG59IGZyb20gJy4vbGliL3V0aWxzJ1xuXG5mdW5jdGlvbiBQYWdpbmF0aW9uICh7ZWxlbWVudHMsIHNldHRpbmdzfSwgYnVzKSB7XG4gIHRoaXMuYnVzID0gYnVzXG4gIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5nc1xuICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHNcbiAgdGhpcy5wYWdpbmF0ZSA9IHNldHRpbmdzLnBhZ2luYXRlXG4gIHRoaXMucGFnaW5hdGlvbiA9IHNlbGVjdChlbGVtZW50cy5wYWdpbmF0aW9uKVxuICBpZiAodGhpcy5wYWdpbmF0aW9uKSB7XG4gICAgdGhpcy5sZWZ0ID0gc2VsZWN0KGVsZW1lbnRzLnByZXZQYWdlLCB0aGlzLnBhZ2luYXRpb24pXG4gICAgdGhpcy5yaWdodCA9IHNlbGVjdChlbGVtZW50cy5uZXh0UGFnZSwgdGhpcy5wYWdpbmF0aW9uKVxuICB9XG5cbiAgdGhpcy5wYWdlID0gMFxuXG4gIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpXG4gIHRoaXMub25SZXNwb25zZSA9IHRoaXMub25SZXNwb25zZS5iaW5kKHRoaXMpXG4gIHRoaXMuZ2V0UGFnZVNpemUgPSB0aGlzLmdldFBhZ2VTaXplLmJpbmQodGhpcylcbiAgaWYgKHRoaXMucGFnaW5hdGUgJiYgdGhpcy5wYWdpbmF0aW9uKSB7XG4gICAgb24odGhpcy5wYWdpbmF0aW9uLCAnY2xpY2snLCB0aGlzLm9uQ2xpY2spXG4gIH1cbiAgaWYgKHRoaXMucGFnaW5hdGUpIHtcbiAgICBidXMub24oJ3Jlc3BvbnNlJywgdGhpcy5vblJlc3BvbnNlKVxuICAgIGJ1cy5hZGRBY3Rpb24oJ1BhZ2luYXRpb24vcGFnZVNpemUnLCB0aGlzLmFkZFBhZ2VTaXplVG9SZXF1ZXN0LCB0aGlzKVxuICAgIGJ1cy5hZGRBY3Rpb24oJ1BhZ2luYXRpb24vZ2V0Q3VycmVudFBhZ2UnLCB0aGlzLmdldEN1cnJlbnRQYWdlLCB0aGlzKVxuICB9XG59XG5cblBhZ2luYXRpb24ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gIGUgJiYgcGQoZSlcbiAgaWYgKHRoaXMuaW5jcmVtZW50UGFnZShlKSAhPT0gZmFsc2UpIHtcbiAgICB0aGlzLmJ1cy5lbWl0KCdyZXF1ZXN0JywgdGhpcy5idXMuYXBwbHlGaWx0ZXIoJ1BhZ2luYXRpb24vb25DbGljay9yZXF1ZXN0JywgW1xuICAgICAgJ0J1cy9nZXRQcmV2aW91c1JlcXVlc3QnLFxuICAgICAgJ1BhZ2luYXRpb24vcGFnZVNpemUnLFxuICAgICAgJ1BhZ2luYXRpb24vZ2V0Q3VycmVudFBhZ2UnXG4gICAgXSkpXG4gIH1cbn1cblxuUGFnaW5hdGlvbi5wcm90b3R5cGUub25SZXNwb25zZSA9IGZ1bmN0aW9uIG9uUmVzcG9uc2UgKHJlcSwgcmVzKSB7XG4gIHRoaXMudXBkYXRlUGFnaW5hdGlvbihyZXMpXG4gIHRoaXMudXBkYXRlRE9NKClcbn1cblxuUGFnaW5hdGlvbi5wcm90b3R5cGUuaW5jcmVtZW50UGFnZSA9IGZ1bmN0aW9uIGluY3JlbWVudFBhZ2UgKGUpIHtcbiAgbGV0IGVsID0gZS50YXJnZXRcbiAgY29uc3QgcHJldkNsYXNzID0gdGhpcy5lbGVtZW50cy5wcmV2UGFnZS5yZXBsYWNlKCcuJywgJycpXG4gIGNvbnN0IG5leHRDbGFzcyA9IHRoaXMuZWxlbWVudHMubmV4dFBhZ2UucmVwbGFjZSgnLicsICcnKVxuICBpZiAoIWhhc0NsYXNzKGVsLCAnaXMtYWN0aXZlJykpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBpZiAoaGFzQ2xhc3MoZWwsIHByZXZDbGFzcykpIHtcbiAgICByZXR1cm4gKHRoaXMucGFnZS0tKVxuICB9XG5cbiAgaWYgKGhhc0NsYXNzKGUudGFyZ2V0LCBuZXh0Q2xhc3MpKSB7XG4gICAgcmV0dXJuICh0aGlzLnBhZ2UrKylcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5QYWdpbmF0aW9uLnByb3RvdHlwZS51cGRhdGVQYWdpbmF0aW9uID0gZnVuY3Rpb24gdXBkYXRlUGFnaW5hdGlvbiAocmVzcG9uc2UpIHtcbiAgdGhpcy5wYWdlQ291bnQgPSBOdW1iZXIocmVzcG9uc2UucGFnZUNvdW50KVxuICB0aGlzLnBhZ2UgPSBOdW1iZXIocmVzcG9uc2UucGFnZSlcbn1cblxuUGFnaW5hdGlvbi5wcm90b3R5cGUuYWRkUGFnZVNpemVUb1JlcXVlc3QgPSBmdW5jdGlvbiBhZGRQYWdlU2l6ZVRvUmVxdWVzdCAocmVxdWVzdCwgbmV4dCkge1xuICBPYmplY3QuYXNzaWduKHJlcXVlc3QsIHtcbiAgICBwYWdlU2l6ZTogdGhpcy5nZXRQYWdlU2l6ZSgpXG4gIH0pXG4gIG5leHQocmVxdWVzdClcbn1cblxuUGFnaW5hdGlvbi5wcm90b3R5cGUuZ2V0UGFnZVNpemUgPSBmdW5jdGlvbiBnZXRQYWdlU2l6ZSAoKSB7XG4gIGxldCBwYWdlU2l6ZSA9IHRoaXMuc2V0dGluZ3MucGFnZVNpemVcbiAgaWYgKFxuICAgIHdpbmRvdy5pbm5lcldpZHRoIDwgdGhpcy5zZXR0aW5ncy5tb2JpbGVCcmVha3BvaW50ICYmXG4gICAgdGhpcy5zZXR0aW5ncy5tb2JpbGVQYWdlU2l6ZVxuICApIHtcbiAgICB0aGlzLnBhZ2VTaXplID0gdGhpcy5zZXR0aW5ncy5tb2JpbGVQYWdlU2l6ZVxuICB9XG4gIHJldHVybiBwYWdlU2l6ZVxufVxuXG5QYWdpbmF0aW9uLnByb3RvdHlwZS5nZXRDdXJyZW50UGFnZSA9IGZ1bmN0aW9uIGdldEN1cnJlbnRQYWdlIChyZXF1ZXN0LCBuZXh0KSB7XG4gIG5leHQoXG4gICAgKHJlcXVlc3RbJ3BhZ2UnXSA9IHRoaXMucGFnZSwgcmVxdWVzdClcbiAgKVxufVxuXG5QYWdpbmF0aW9uLnByb3RvdHlwZS51cGRhdGVET00gPSBmdW5jdGlvbiB1cGRhdGVET00gKCkge1xuICBpZiAodGhpcy5wYWdpbmF0aW9uICYmIHRoaXMucGFnZUNvdW50ID4gMSkge1xuICAgIHRoaXMucGFnaW5hdGlvbi5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxuICB9XG4gIGlmICh0aGlzLmxlZnQpIHtcbiAgICB0aGlzLmxlZnQuY2xhc3NMaXN0WyB0aGlzLmhhc1ByZXZQYWdlKCkgPyAnYWRkJyA6ICdyZW1vdmUnIF0oJ2lzLWFjdGl2ZScpXG4gIH1cbiAgaWYgKHRoaXMucmlnaHQpIHtcbiAgICB0aGlzLnJpZ2h0LmNsYXNzTGlzdFsgdGhpcy5oYXNOZXh0UGFnZSgpID8gJ2FkZCcgOiAncmVtb3ZlJyBdKCdpcy1hY3RpdmUnKVxuICB9XG59XG5cblBhZ2luYXRpb24ucHJvdG90eXBlLmhhc1ByZXZQYWdlID0gZnVuY3Rpb24gaGFzUHJldlBhZ2UgKCkge1xuICByZXR1cm4gdGhpcy5wYWdlID49IDFcbn1cblxuUGFnaW5hdGlvbi5wcm90b3R5cGUuaGFzTmV4dFBhZ2UgPSBmdW5jdGlvbiBoYXNOZXh0UGFnZSAoKSB7XG4gIHJldHVybiAodGhpcy5wYWdlICsgMSkgPCB0aGlzLnBhZ2VDb3VudFxufVxuXG5QYWdpbmF0aW9uLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIGlmICh0aGlzLnBhZ2luYXRpb24pIHtcbiAgICBvZmYodGhpcy5wYWdpbmF0aW9uLCAnY2xpY2snLCB0aGlzLm9uQ2xpY2spXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvblxuIl19

function StoreLocator(opts) {
    var this$1 = this;
    if ( opts === void 0 ) opts = {};

    var settings = opts.settings;
    var elements = opts.elements;
    this.settings = {
        lookup: opts.lookup || defaults.lookup,
        settings: Object.assign({}, defaults.settings, settings),
        elements: Object.assign({}, defaults.elements, elements)
    };
    var templates = Object.assign({}, defaults.templates, opts.templates);
    Object.keys(templates).map(function (key) {
        templates[key] = templates[key].bind(this$1);
    });
    this.settings['templates'] = templates;
    this.bus = new Bus();
    this.map = new Map(this.settings, this.bus);
    this.form = new Form(this.settings, this.bus);
    this.sidebar = new Sidebar(this.settings, this.bus);
    this.pagination = new Pagination(this.settings, this.bus);
    this.on('request', this.triggerRequest.bind(this));
}

StoreLocator.prototype.triggerRequest = function triggerRequest(actions) {
    return new Request(this.settings, actions, this.bus);
};
StoreLocator.prototype.on = function on() {
    this.bus.on.apply(this.bus, arguments);
};
StoreLocator.prototype.off = function off() {
    this.bus.off.apply(this.bus, arguments);
};
StoreLocator.prototype.addAction = function addAction() {
    this.bus.addAction.apply(this.bus, arguments);
};
StoreLocator.prototype.removeAction = function addAction() {
    this.bus.removeAction.apply(this.bus, arguments);
};
StoreLocator.prototype.destroy = function destroy() {
    this.bus.destroy();
    this.map.destroy();
    this.form.destroy();
    this.sidebar.destroy();
    this.pagination.destroy();
    this.bus = null;
    this.map = null;
    this.form = null;
    this.sidebar = null;
    this.pagination = null;
};


//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQWlDLFNBQVMsVUFBVztJQUNuRCxJQUFBLENBQUssR0FBTCxDQUFTLE9BQVQ7SUFDQSxJQUFBLENBQUssR0FBTCxDQUFTLE9BQVQ7SUFDQSxJQUFBLENBQUssSUFBTCxDQUFVLE9BQVY7SUFDQSxJQUFBLENBQUssT0FBTCxDQUFhLE9BQWI7SUFDQSxJQUFBLENBQUssVUFBTCxDQUFnQixPQUFoQjtJQUNBLElBQUEsQ0FBSyxHQUFMLENBQUEsQ0FBQSxDQUFXO0lBQ1gsSUFBQSxDQUFLLEdBQUwsQ0FBQSxDQUFBLENBQVc7SUFDWCxJQUFBLENBQUssSUFBTCxDQUFBLENBQUEsQ0FBWTtJQUNaLElBQUEsQ0FBSyxPQUFMLENBQUEsQ0FBQSxDQUFlO0lBQ2YsSUFBQSxDQUFLLFVBQUwsQ0FBQSxDQUFBLENBQWtCO0FBQ3BCO0FBRUEsZUFBZTtBQS9EZiIsImZpbGUiOiJpbmRleC5qcyhvcmlnaW5hbCkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQnVzIGZyb20gJy4vbGliL2J1cydcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2xpYi9kZWZhdWx0cydcblxuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi9SZXF1ZXN0J1xuaW1wb3J0IE1hcCBmcm9tICcuL01hcCdcbmltcG9ydCBGb3JtIGZyb20gJy4vRm9ybSdcbmltcG9ydCBTaWRlYmFyIGZyb20gJy4vU2lkZWJhcidcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vUGFnaW5hdGlvbidcblxuZnVuY3Rpb24gU3RvcmVMb2NhdG9yIChvcHRzID0ge30pIHtcbiAgY29uc3Qge3NldHRpbmdzLCBlbGVtZW50c30gPSBvcHRzXG4gIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgbG9va3VwOiAob3B0cy5sb29rdXAgfHwgZGVmYXVsdHMubG9va3VwKSxcbiAgICBzZXR0aW5nczogT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMuc2V0dGluZ3MsIHNldHRpbmdzKSxcbiAgICBlbGVtZW50czogT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMuZWxlbWVudHMsIGVsZW1lbnRzKVxuICB9XG4gIGNvbnN0IHRlbXBsYXRlcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLnRlbXBsYXRlcywgb3B0cy50ZW1wbGF0ZXMpXG4gIE9iamVjdC5rZXlzKHRlbXBsYXRlcykubWFwKGtleSA9PiB7XG4gICAgdGVtcGxhdGVzW2tleV0gPSB0ZW1wbGF0ZXNba2V5XS5iaW5kKHRoaXMpXG4gIH0pXG4gIHRoaXMuc2V0dGluZ3NbJ3RlbXBsYXRlcyddID0gdGVtcGxhdGVzXG4gIHRoaXMuYnVzID0gbmV3IEJ1cygpXG4gIHRoaXMubWFwID0gbmV3IE1hcCh0aGlzLnNldHRpbmdzLCB0aGlzLmJ1cylcbiAgdGhpcy5mb3JtID0gbmV3IEZvcm0odGhpcy5zZXR0aW5ncywgdGhpcy5idXMpXG4gIHRoaXMuc2lkZWJhciA9IG5ldyBTaWRlYmFyKHRoaXMuc2V0dGluZ3MsIHRoaXMuYnVzKVxuICB0aGlzLnBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbih0aGlzLnNldHRpbmdzLCB0aGlzLmJ1cylcblxuICB0aGlzLm9uKCdyZXF1ZXN0JywgdGhpcy50cmlnZ2VyUmVxdWVzdC5iaW5kKHRoaXMpKVxufVxuXG5TdG9yZUxvY2F0b3IucHJvdG90eXBlLnRyaWdnZXJSZXF1ZXN0ID0gZnVuY3Rpb24gdHJpZ2dlclJlcXVlc3QgKGFjdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMuc2V0dGluZ3MsIGFjdGlvbnMsIHRoaXMuYnVzKVxufVxuXG5TdG9yZUxvY2F0b3IucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24gKCkge1xuICB0aGlzLmJ1cy5vbi5hcHBseSh0aGlzLmJ1cywgYXJndW1lbnRzKVxufVxuXG5TdG9yZUxvY2F0b3IucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIG9mZiAoKSB7XG4gIHRoaXMuYnVzLm9mZi5hcHBseSh0aGlzLmJ1cywgYXJndW1lbnRzKVxufVxuXG5TdG9yZUxvY2F0b3IucHJvdG90eXBlLmFkZEFjdGlvbiA9IGZ1bmN0aW9uIGFkZEFjdGlvbiAoKSB7XG4gIHRoaXMuYnVzLmFkZEFjdGlvbi5hcHBseSh0aGlzLmJ1cywgYXJndW1lbnRzKVxufVxuXG5TdG9yZUxvY2F0b3IucHJvdG90eXBlLnJlbW92ZUFjdGlvbiA9IGZ1bmN0aW9uIGFkZEFjdGlvbiAoKSB7XG4gIHRoaXMuYnVzLnJlbW92ZUFjdGlvbi5hcHBseSh0aGlzLmJ1cywgYXJndW1lbnRzKVxufVxuXG5TdG9yZUxvY2F0b3IucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgdGhpcy5idXMuZGVzdHJveSgpXG4gIHRoaXMubWFwLmRlc3Ryb3koKVxuICB0aGlzLmZvcm0uZGVzdHJveSgpXG4gIHRoaXMuc2lkZWJhci5kZXN0cm95KClcbiAgdGhpcy5wYWdpbmF0aW9uLmRlc3Ryb3koKVxuICB0aGlzLmJ1cyA9IG51bGxcbiAgdGhpcy5tYXAgPSBudWxsXG4gIHRoaXMuZm9ybSA9IG51bGxcbiAgdGhpcy5zaWRlYmFyID0gbnVsbFxuICB0aGlzLnBhZ2luYXRpb24gPSBudWxsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JlTG9jYXRvclxuIl19

module.exports = StoreLocator;
//# sourceMappingURL=index.js.map
