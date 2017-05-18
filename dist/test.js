(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("StoreLocator", [], factory);
	else if(typeof exports === 'object')
		exports["StoreLocator"] = factory();
	else
		root["StoreLocator"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 37);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventEmitter = __webpack_require__(22);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = (0, _eventEmitter2.default)();

exports.default = emitter;

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _emitter = __webpack_require__(0);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var actions = {};
var _ajaxHandler = function ajaxHandler() {};
var previousRequest = {};

var Request = function () {
  function Request() {
    var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var request = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Request);

    if (!this.validateRequest(request)) {
      console.log('error');
    }

    var q = this.createAsyncQueue(request, actions)();
  }

  _createClass(Request, [{
    key: 'createAsyncQueue',
    value: function createAsyncQueue(request, queue) {
      if (!queue.length) {
        _ajaxHandler(request, function (res) {
          return Request.validateResponse(request, res);
        });
        return function () {};
      }

      queue.push(function (request) {
        _ajaxHandler(request, function (res) {
          return Request.validateResponse(request, res);
        });
      });

      return queue.reverse().reduce(function (a, b) {
        return actions[b].fn.bind(actions[b].ctx, request, a);
      });
    }
  }, {
    key: 'validateRequest',
    value: function validateRequest(request) {
      return true;
    }
  }], [{
    key: 'ajaxHandler',
    value: function ajaxHandler() {
      return _ajaxHandler;
    }
  }, {
    key: 'attachAjaxHandler',
    value: function attachAjaxHandler(fn) {
      _ajaxHandler = fn;
    }
  }, {
    key: 'validateResponse',
    value: function validateResponse(req, res) {
      previousRequest = _extends({}, req);
      _emitter2.default.emit('request-complete', req, res);
    }
  }, {
    key: 'addAction',
    value: function addAction(name, fn, ctx) {
      actions[name] = {
        ctx: ctx,
        fn: fn
      };
    }
  }, {
    key: 'getPreviousRequest',
    value: function getPreviousRequest(request, next) {
      _extends(request, previousRequest);
      next(request);
    }
  }]);

  return Request;
}();

Request.addAction('Request/getPreviousRequest', Request.getPreviousRequest, Request);

exports.default = Request;

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*eslint-disable */
var select = exports.select = function select(selector, parent) {
  var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  parent || (parent = document);
  if (all) {
    return Array.prototype.slice.call(parent.querySelectorAll(selector));
  } else {
    return parent.querySelector(selector);
  }
};

var on = exports.on = function on(element, event, callback, capture) {
  !element.addEventListener && (event = 'on' + event);
  (element.addEventListener || element.attachEvent).call(element, event, callback, capture);
  return callback;
};

var off = exports.off = function off(element, event, callback, capture) {
  !element.removeEventListener && (event = 'on' + event);
  (element.removeEventListener || element.detachEvent).call(element, event, callback, capture);
  return callback;
};
/*eslint-enable */

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pd = exports.iconSize = exports.hasClass = exports.hide = exports.show = exports.addVal = exports.clearVal = exports.endpointError = exports.toTitleCase = exports.formatNumber = exports.clearElement = exports.scrollToTop = undefined;

var _dom = __webpack_require__(2);

var scrollToTop = exports.scrollToTop = function scrollToTop(el) {
  return el.scrollTop = 0;
};

var clearElement = exports.clearElement = function clearElement(el) {
  return el.innerHTML = '';
};

var formatNumber = exports.formatNumber = function formatNumber(text) {
  return text.length === 10 ? text.replace(/^(\d{3})(\d{3})(\d{4})$/, '$1-$2-$3') : text;
};

var toTitleCase = exports.toTitleCase = function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (text) {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  });
};

var endpointError = exports.endpointError = function endpointError(text) {
  return console.error(text);
};

var clearVal = exports.clearVal = function clearVal(el) {
  return el.value = '';
};

var addVal = exports.addVal = function addVal(str, el) {
  return el.value = str;
};

var show = exports.show = function show(el) {
  return el.classList.add('is-visible');
};

var hide = exports.hide = function hide(el) {
  return el.classList.remove('is-visible');
};

var hasClass = exports.hasClass = function hasClass(el, str) {
  return el.classList.contains(str);
};

var iconSize = exports.iconSize = function iconSize(zoom) {
  return zoom * 1.3;
};

var pd = exports.pd = function pd(e) {
  return e.preventDefault();
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _src = __webpack_require__(31);

var _src2 = _interopRequireDefault(_src);

var _nanoajax = __webpack_require__(24);

var _nanoajax2 = _interopRequireDefault(_nanoajax);

var _mockRequest = __webpack_require__(35);

var _mockRequest2 = _interopRequireDefault(_mockRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storeLocator = new _src2.default();

var APIENDPOINT = 'https://fpq6p90dm9.execute-api.us-west-2.amazonaws.com/prod/vip-store-locator-request';

var convertToQueryString = function convertToQueryString(data) {
  return Object.keys(data).map(function (key) {
    return key + '=' + data[key];
  }).join('&');
};

var cleanupResponse = function cleanupResponse(request, response) {
  if (!response.locations) {
    response.locations = [];
    return response;
  }

  response.locations.map(function (val) {
    Object.keys(val).map(function (key) {
      if (key === 'otherBrands') {
        var carries = (val[key][0].otherBrand || []).concat(request.brand || []);
        val['carries'] = Object.keys(carries.reduce(function (obj, val) {
          obj[val] = 1;
          return obj;
        }, {})).join(', ');
      } else if (key === 'dba') {
        val['name'] = val[key][0];
      } else if (key === 'long') {
        val['lng'] = val[key][0];
      } else if (typeof val[key][0] === 'string') {
        val[key] = val[key][0];
      }
    });

    delete val.otherBrands;
    delete val.packageSizes;
    delete val.packageTypes;
    delete val.packages;
  });

  return response;
};

_src2.default.attachAjaxHandler(function (request, next) {
  var qs = convertToQueryString(Object.keys(request).reduce(function (obj, key) {
    if (key === 'lng') {
      obj['long'] = request[key];
    } else if (key !== 'address') {
      obj[key] = request[key];
    }
    return obj;
  }, {}));

  _nanoajax2.default.ajax({ url: APIENDPOINT + '?' + qs }, function (code, text) {
    if (code === 200) {
      var res = cleanupResponse(request, JSON.parse(text));
      next(res);
    } else {
      console.error(code);
    }
  });
});

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(36)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js?importLoaders=1!../node_modules/postcss-loader/index.js!./main.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js?importLoaders=1!../node_modules/postcss-loader/index.js!./main.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, "/*! normalize.css v6.0.0 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\narticle, aside, footer, header, nav, section {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\n\nfigcaption, figure, main { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb, strong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb, strong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode, kbd, samp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub, sup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio, video {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Remove the margin in Firefox and Safari.\n */\n\nbutton, input, optgroup, select, textarea {\n  margin: 0;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton, input { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton, select { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton, html [type=\"button\"], [type=\"reset\"], [type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner, [type=\"button\"]::-moz-focus-inner, [type=\"reset\"]::-moz-focus-inner, [type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring, [type=\"button\"]:-moz-focusring, [type=\"reset\"]:-moz-focusring, [type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"], [type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button, [type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button, [type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\n\ndetails, menu {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Scripting\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n */\n\ncanvas {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in IE.\n */\n\ntemplate {\n  display: none;\n}\n\n/* Hidden\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10-.\n */\n\n[hidden] {\n  display: none;\n}\n\nbody{\n  font-family: Helvetica, Arial, sans-serif;\n}\n\n*{\n  box-sizing: border-box;\n}\n\ninput[type=\"text\"], input[type=\"submit\"], label, select, textarea {\n  outline: 0;\n  border: 0;\n  border-radius: 0;\n  font-size: inherit;\n  position: relative;\n  background-color: transparent;\n  -webkit-appearance: none;\n  border: 2px solid #eee;\n  padding: .9em .8em .85em;\n  min-width: 200px;\n}\n\nselect::-ms-expand {\n  display: none\n}\n\n.locator__form{\n  text-align: center;\n  padding: 2em;\n}\n\n.locator__bottom{\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  height: 600px;\n}\n\n.locator__filters{\n  height:6em;\n  width:100%;\n  left:0;\n  padding: 0 2em;\n  position: absolute;\n  background-color:#fff;\n}\n\n.locator__geo-feedback{\n  display: none\n}\n\n.locator__geo-feedback.is-visible {\n  display: block;\n}\n\n.locator__sidebar{\n  width: 30%;\n  padding: 0 2em;\n  position: relative;\n}\n\n.locator__sidebar-list{\n  overflow:hidden;\n  overflow-y: scroll;\n  height: 100%;\n  padding-top:6em;\n}\n\n.locator__sidebar-list > div {\n  border-bottom: 1px solid #000;\n  padding-bottom: 1em;\n  margin-top: 1em;\n}\n\n.locator__pagination{\n  position: absolute;\n  bottom:0;\n  left:0;\n  width: 100%;\n  border-top: 1px solid #eee;\n  padding: 2em;\n  display:none;\n  background-color:#fff\n}\n\n.locator__pagination.is-active {\n  display: block;\n}\n\n.locator__pagination > a:last-child{\n  float: right;\n}\n\n.locator__map{\n  width: 70%;\n  background: #eee;\n  position: relative;\n}\n\n.locator__redo{\n  padding: 2em;\n  position: absolute;\n  top:1em;\n  right:1em;\n  z-index: 1;\n  background:#fff;\n  cursor: pointer;\n  display:none\n}\n\n.locator__redo.is-visible {\n  display: block;\n}\n\n.locator__map > div{\n  width: 100%;\n  height: 100%;\n}\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function () {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for (var i = 0; i < this.length; i++) {
			var item = this[i];
			if (item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(9),
    normalizeOpts = __webpack_require__(16),
    isCallable = __webpack_require__(12),
    contains = __webpack_require__(19),
    d;

d = module.exports = function (dscr, value /*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== 'string') {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set /*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(10)() ? Object.assign : __webpack_require__(11);

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign,
	    obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return obj.foo + obj.bar + obj.trzy === 'razdwatrzy';
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(13),
    value = __webpack_require__(18),
    max = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error,
	    i,
	    l = max(arguments.length, 2),
	    assign;
	dest = Object(value(dest));
	assign = function assign(key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
  return typeof obj === 'function';
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(14)() ? Object.keys : __webpack_require__(15);

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) {
		return false;
	}
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = Array.prototype.forEach,
    create = Object.create;

var process = function process(src, obj) {
	var key;
	for (key in src) {
		obj[key] = src[key];
	}
};

module.exports = function (options /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(20)() ? String.prototype.contains : __webpack_require__(21);

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return str.contains('dwa') === true && str.contains('foo') === false;
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var d = __webpack_require__(8),
    callable = __webpack_require__(17),
    apply = Function.prototype.apply,
    call = Function.prototype.call,
    create = Object.create,
    defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    descriptor = { configurable: true, enumerable: false, writable: true },
    on,
    _once2,
    off,
    emit,
    methods,
    descriptors,
    base;

on = function on(type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;else if (_typeof(data[type]) === 'object') data[type].push(listener);else data[type] = [data[type], listener];

	return this;
};

_once2 = function once(type, listener) {
	var _once, self;

	callable(listener);
	self = this;
	on.call(this, type, _once = function once() {
		off.call(self, type, _once);
		apply.call(listener, this, arguments);
	});

	_once.__eeOnceListener__ = listener;
	return this;
};

off = function off(type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
		for (i = 0; candidate = listeners[i]; ++i) {
			if (candidate === listener || candidate.__eeOnceListener__ === listener) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];else listeners.splice(i, 1);
			}
		}
	} else {
		if (listeners === listener || listeners.__eeOnceListener__ === listener) {
			delete data[type];
		}
	}

	return this;
};

emit = function emit(type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) {
			args[i - 1] = arguments[i];
		}listeners = listeners.slice();
		for (i = 0; listener = listeners[i]; ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: _once2,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(_once2),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function exports(o) {
	return o == null ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root, factory) {

	if (root === null) {
		throw new Error('Google-maps package can be used only in browser');
	}

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		module.exports = factory();
	} else {
		root.GoogleMapsLoader = factory();
	}
})(typeof window !== 'undefined' ? window : null, function () {

	'use strict';

	var googleVersion = '3.18';

	var script = null;

	var google = null;

	var loading = false;

	var callbacks = [];

	var onLoadEvents = [];

	var originalCreateLoaderMethod = null;

	var GoogleMapsLoader = {};

	GoogleMapsLoader.URL = 'https://maps.googleapis.com/maps/api/js';

	GoogleMapsLoader.KEY = null;

	GoogleMapsLoader.LIBRARIES = [];

	GoogleMapsLoader.CLIENT = null;

	GoogleMapsLoader.CHANNEL = null;

	GoogleMapsLoader.LANGUAGE = null;

	GoogleMapsLoader.REGION = null;

	GoogleMapsLoader.VERSION = googleVersion;

	GoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';

	GoogleMapsLoader._googleMockApiObject = {};

	GoogleMapsLoader.load = function (fn) {
		if (google === null) {
			if (loading === true) {
				if (fn) {
					callbacks.push(fn);
				}
			} else {
				loading = true;

				window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] = function () {
					ready(fn);
				};

				GoogleMapsLoader.createLoader();
			}
		} else if (fn) {
			fn(google);
		}
	};

	GoogleMapsLoader.createLoader = function () {
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = GoogleMapsLoader.createUrl();

		document.body.appendChild(script);
	};

	GoogleMapsLoader.isLoaded = function () {
		return google !== null;
	};

	GoogleMapsLoader.createUrl = function () {
		var url = GoogleMapsLoader.URL;

		url += '?callback=' + GoogleMapsLoader.WINDOW_CALLBACK_NAME;

		if (GoogleMapsLoader.KEY) {
			url += '&key=' + GoogleMapsLoader.KEY;
		}

		if (GoogleMapsLoader.LIBRARIES.length > 0) {
			url += '&libraries=' + GoogleMapsLoader.LIBRARIES.join(',');
		}

		if (GoogleMapsLoader.CLIENT) {
			url += '&client=' + GoogleMapsLoader.CLIENT + '&v=' + GoogleMapsLoader.VERSION;
		}

		if (GoogleMapsLoader.CHANNEL) {
			url += '&channel=' + GoogleMapsLoader.CHANNEL;
		}

		if (GoogleMapsLoader.LANGUAGE) {
			url += '&language=' + GoogleMapsLoader.LANGUAGE;
		}

		if (GoogleMapsLoader.REGION) {
			url += '&region=' + GoogleMapsLoader.REGION;
		}

		return url;
	};

	GoogleMapsLoader.release = function (fn) {
		var release = function release() {
			GoogleMapsLoader.KEY = null;
			GoogleMapsLoader.LIBRARIES = [];
			GoogleMapsLoader.CLIENT = null;
			GoogleMapsLoader.CHANNEL = null;
			GoogleMapsLoader.LANGUAGE = null;
			GoogleMapsLoader.REGION = null;
			GoogleMapsLoader.VERSION = googleVersion;

			google = null;
			loading = false;
			callbacks = [];
			onLoadEvents = [];

			if (typeof window.google !== 'undefined') {
				delete window.google;
			}

			if (typeof window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
				delete window[GoogleMapsLoader.WINDOW_CALLBACK_NAME];
			}

			if (originalCreateLoaderMethod !== null) {
				GoogleMapsLoader.createLoader = originalCreateLoaderMethod;
				originalCreateLoaderMethod = null;
			}

			if (script !== null) {
				script.parentElement.removeChild(script);
				script = null;
			}

			if (fn) {
				fn();
			}
		};

		if (loading) {
			GoogleMapsLoader.load(function () {
				release();
			});
		} else {
			release();
		}
	};

	GoogleMapsLoader.onLoad = function (fn) {
		onLoadEvents.push(fn);
	};

	GoogleMapsLoader.makeMock = function () {
		originalCreateLoaderMethod = GoogleMapsLoader.createLoader;

		GoogleMapsLoader.createLoader = function () {
			window.google = GoogleMapsLoader._googleMockApiObject;
			window[GoogleMapsLoader.WINDOW_CALLBACK_NAME]();
		};
	};

	var ready = function ready(fn) {
		var i;

		loading = false;

		if (google === null) {
			google = window.google;
		}

		for (i = 0; i < onLoadEvents.length; i++) {
			onLoadEvents[i](google);
		}

		if (fn) {
			fn(google);
		}

		for (i = 0; i < callbacks.length; i++) {
			callbacks[i](google);
		}

		callbacks = [];
	};

	return GoogleMapsLoader;
});

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Best place to find information on XHR features is:
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

var reqfields = ['responseType', 'withCredentials', 'timeout', 'onprogress'];

// Simple and small ajax function
// Takes a parameters object and a callback function
// Parameters:
//  - url: string, required
//  - headers: object of `{header_name: header_value, ...}`
//  - body:
//      + string (sets content type to 'application/x-www-form-urlencoded' if not set in headers)
//      + FormData (doesn't set content type so that browser will set as appropriate)
//  - method: 'GET', 'POST', etc. Defaults to 'GET' or 'POST' based on body
//  - cors: If your using cross-origin, you will need this true for IE8-9
//
// The following parameters are passed onto the xhr object.
// IMPORTANT NOTE: The caller is responsible for compatibility checking.
//  - responseType: string, various compatability, see xhr docs for enum options
//  - withCredentials: boolean, IE10+, CORS only
//  - timeout: long, ms timeout, IE8+
//  - onprogress: callback, IE10+
//
// Callback function prototype:
//  - statusCode from request
//  - response
//    + if responseType set and supported by browser, this is an object of some type (see docs)
//    + otherwise if request completed, this is the string text of the response
//    + if request is aborted, this is "Abort"
//    + if request times out, this is "Timeout"
//    + if request errors before completing (probably a CORS issue), this is "Error"
//  - request object
//
// Returns the request object. So you can call .abort() or other methods
//
// DEPRECATIONS:
//  - Passing a string instead of the params object has been removed!
//
exports.ajax = function (params, callback) {
  // Any variable used more than once is var'd here because
  // minification will munge the variables whereas it can't munge
  // the object access.
  var headers = params.headers || {},
      body = params.body,
      method = params.method || (body ? 'POST' : 'GET'),
      called = false;

  var req = getRequest(params.cors);

  function cb(statusCode, responseText) {
    return function () {
      if (!called) {
        callback(req.status === undefined ? statusCode : req.status, req.status === 0 ? "Error" : req.response || req.responseText || responseText, req);
        called = true;
      }
    };
  }

  req.open(method, params.url, true);

  var success = req.onload = cb(200);
  req.onreadystatechange = function () {
    if (req.readyState === 4) success();
  };
  req.onerror = cb(null, 'Error');
  req.ontimeout = cb(null, 'Timeout');
  req.onabort = cb(null, 'Abort');

  if (body) {
    setDefault(headers, 'X-Requested-With', 'XMLHttpRequest');

    if (!global.FormData || !(body instanceof global.FormData)) {
      setDefault(headers, 'Content-Type', 'application/x-www-form-urlencoded');
    }
  }

  for (var i = 0, len = reqfields.length, field; i < len; i++) {
    field = reqfields[i];
    if (params[field] !== undefined) req[field] = params[field];
  }

  for (var field in headers) {
    req.setRequestHeader(field, headers[field]);
  }req.send(body);

  return req;
};

function getRequest(cors) {
  // XDomainRequest is only way to do CORS in IE 8 and 9
  // But XDomainRequest isn't standards-compatible
  // Notably, it doesn't allow cookies to be sent or set by servers
  // IE 10+ is standards-compatible in its XMLHttpRequest
  // but IE 10 can still have an XDomainRequest object, so we don't want to use it
  if (cors && global.XDomainRequest && !/MSIE 1/.test(navigator.userAgent)) return new XDomainRequest();
  if (global.XMLHttpRequest) return new XMLHttpRequest();
}

function setDefault(obj, key, value) {
  obj[key] = obj[key] || value;
}

/*** EXPORTS FROM exports-loader ***/

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(2);

var _emitter = __webpack_require__(0);

var _emitter2 = _interopRequireDefault(_emitter);

var _Request = __webpack_require__(1);

var _Request2 = _interopRequireDefault(_Request);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Form = function () {
  function Form(_ref) {
    var _this = this;

    var FORM = _ref.FORM;

    _classCallCheck(this, Form);

    this.form = (0, _dom.select)(FORM);

    if (this.form) {
      (0, _dom.on)(this.form, 'submit', function (e) {
        return (0, _utils.pd)(e), _emitter2.default.emit('request', ['Form/validate', 'Form/getValues', 'Sidebar/getFilters', 'Pagination/pageSize', 'Map/Geocode']);
      });
    }

    _Request2.default.addAction('Form/validate', this.validate, this);
    _Request2.default.addAction('Form/getValues', this.getValues, this);

    _emitter2.default.on('request-complete', function (req, res) {
      return _this.updateAddress(req, res);
    });
  }

  _createClass(Form, [{
    key: 'validate',
    value: function validate(request, next) {
      next(request);
    }
  }, {
    key: 'getValues',
    value: function getValues(request, next) {
      var els = (0, _dom.select)('[name]', this.form, true);
      els.map(function (el) {
        if (el.value) {
          request[el.getAttribute('name')] = el.value;
        }
      });
      next(request);
    }
  }, {
    key: 'updateAddress',
    value: function updateAddress(req, res) {
      (0, _dom.select)('[name="address"]', this.form).value = req.address;
    }
  }]);

  return Form;
}();

exports.default = Form;

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _googleMaps = __webpack_require__(23);

var _googleMaps2 = _interopRequireDefault(_googleMaps);

var _dom = __webpack_require__(2);

var _emitter = __webpack_require__(0);

var _emitter2 = _interopRequireDefault(_emitter);

var _utils = __webpack_require__(3);

var _Request = __webpack_require__(1);

var _Request2 = _interopRequireDefault(_Request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
  function Map(_ref) {
    var _this = this;

    var MAP_KEY = _ref.MAP_KEY,
        MAP_LANG = _ref.MAP_LANG,
        MAP_REGION = _ref.MAP_REGION,
        MAP = _ref.MAP,
        MAP_DEFAULTS = _ref.MAP_DEFAULTS,
        ICON_PATH = _ref.ICON_PATH,
        MARKER_TEMPLATE = _ref.MARKER_TEMPLATE,
        FETCH_LOCATIONS_FROM_CENTER = _ref.FETCH_LOCATIONS_FROM_CENTER;

    _classCallCheck(this, Map);

    this.markers = [];
    this.map = (0, _dom.select)(MAP);
    this.iconPath = ICON_PATH;
    this.markerTemplate = MARKER_TEMPLATE;
    this.fetchFromCenter = (0, _dom.select)(FETCH_LOCATIONS_FROM_CENTER);

    _googleMaps2.default.LIBRARIES = ['geometry', 'places'];
    _googleMaps2.default.KEY = MAP_KEY;
    _googleMaps2.default.LANGUAGE = MAP_LANG;
    _googleMaps2.default.REGION = MAP_REGION;

    _emitter2.default.on('request-complete', function (req, res) {
      return _this.updateMap(req, res);
    });
    _emitter2.default.on('focus-on-marker', function (name) {
      return _this.focusOnMarker(name);
    });
    _emitter2.default.on('zoom-changed', function () {
      return _this.updateIcons();
    });
    _emitter2.default.on('dragend', function () {
      return _this.showCenterButton();
    });

    _googleMaps2.default.load(function (Google) {
      _this.Google = Google;
      _this.Map = new Google.maps.Map(_this.map, MAP_DEFAULTS);
      _this.Geocoder = new Google.maps.Geocoder();

      _this.Map.addListener('dragend', function () {
        return _emitter2.default.emit('dragend');
      });
      _this.Map.addListener('zoom_changed', function () {
        return _emitter2.default.emit('zoom-changed');
      });
    });

    if (this.fetchFromCenter) {
      (0, _dom.on)(this.fetchFromCenter, 'click', function (e) {
        return (0, _utils.hide)(e.target), (0, _utils.pd)(e), _emitter2.default.emit('request', ['Form/validate', 'Form/getValues', 'Map/hideCenterButton', 'Map/getCenter', 'Sidebar/getFilters', 'Pagination/pageSize', 'Map/Geocode']);
      });
    }

    _Request2.default.addAction('Map/Geocode', this.geocode, this);
    _Request2.default.addAction('Map/getCenter', this.getCenter, this);
    _Request2.default.addAction('Map/hideCenterButton', this.hideCenterButton, this);
  }

  _createClass(Map, [{
    key: 'updateMap',
    value: function updateMap(req, res) {
      this.resetCenter({
        lat: Number(req.lat),
        lng: Number(req.lng)
      });
      this.removeMarkers();
      this.addMarkers(res);
    }
  }, {
    key: 'removeMarkers',
    value: function removeMarkers() {
      this.markers.forEach(function (marker) {
        return marker.setMap(null);
      });
      this.markers = [];
    }
  }, {
    key: 'addMarkers',
    value: function addMarkers(response) {
      var _this2 = this;

      var _response$locations = response.locations,
          locations = _response$locations === undefined ? [] : _response$locations;


      if (locations.length === []) {
        return;
      }

      locations.map(function (location) {
        _this2.addMarker(location);
      });
    }
  }, {
    key: 'addMarker',
    value: function addMarker(location) {
      var _this3 = this;

      var marker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var size = (0, _utils.iconSize)(this.Map.getZoom());

      marker = new this.Google.maps.Marker({
        position: {
          lat: Number(location.lat),
          lng: Number(location.lng)
        },
        icon: {
          url: this.iconPath,
          scaledSize: new this.Google.maps.Size(size, size)
        },
        map: this.Map
      });
      marker.html = this.createMarkerHTML(location);
      marker.name = location.name;
      marker.addListener('click', function () {
        return _this3.showModal(marker);
      });
      this.markers.push(marker);
    }
  }, {
    key: 'focusOnMarker',
    value: function focusOnMarker(name) {
      var marker = this.markers.reduce(function (a, b) {
        return b.name === name ? b : a;
      });
      this.resetCenter(marker.getPosition());
      this.showModal(marker);
    }
  }, {
    key: 'resetCenter',
    value: function resetCenter(newPosition) {
      this.Map.setCenter(newPosition);
    }
  }, {
    key: 'getCenter',
    value: function getCenter(request, next) {
      var center = this.Map.getCenter();
      _extends(request, {
        lat: center.lat(),
        lng: center.lng(),
        address: false
      });
      next(request);
    }
  }, {
    key: 'showModal',
    value: function showModal(marker) {
      if (!this.InfoWindow) {
        this.InfoWindow = new this.Google.maps.InfoWindow({
          map: this.Map
        });
      }
      this.InfoWindow.setContent(marker.html);
      this.InfoWindow.open(this.Map, marker);
    }
  }, {
    key: 'updateIcons',
    value: function updateIcons() {
      var _this4 = this;

      var size = (0, _utils.iconSize)(this.Map.getZoom());

      this.markers.forEach(function (m) {
        m.setIcon({
          url: _this4.iconPath,
          scaledSize: new _this4.Google.maps.Size(size, size)
        });
      });
    }
  }, {
    key: 'geocode',
    value: function geocode(request, next) {
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
          (0, _utils.endpointError)('geocode error');
        }
      });
    }
  }, {
    key: 'createMarkerHTML',
    value: function createMarkerHTML(data) {
      return this.markerTemplate(data);
    }
  }, {
    key: 'showCenterButton',
    value: function showCenterButton() {
      (0, _utils.show)(this.fetchFromCenter);
    }
  }, {
    key: 'hideCenterButton',
    value: function hideCenterButton() {
      (0, _utils.hide)(this.fetchFromCenter);
    }
  }]);

  return Map;
}();

exports.default = Map;

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(2);

var _emitter = __webpack_require__(0);

var _emitter2 = _interopRequireDefault(_emitter);

var _utils = __webpack_require__(3);

var _Request = __webpack_require__(1);

var _Request2 = _interopRequireDefault(_Request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pagination = function () {
  function Pagination(_ref) {
    var _this = this;

    var PAGINATION = _ref.PAGINATION;

    _classCallCheck(this, Pagination);

    this.pagination = (0, _dom.select)(PAGINATION);

    this.left = (0, _dom.select)('[data-dir="prev"]', this.pagination);
    this.right = (0, _dom.select)('[data-dir="next"]', this.pagination);
    this.page = 1;

    if (this.pagination) {
      (0, _dom.on)(this.pagination, 'click', function (e) {
        return (0, _utils.pd)(e), _this.incrementPage(e) !== false ? _emitter2.default.emit('request', ['Request/getPreviousRequest', 'Pagination/pageSize', 'Pagination/getCurrentPage']) : '';
      });
    }

    _emitter2.default.on('request-complete', function (req, res) {
      _this.updatePagination(res);
      _this.updateDOM();
    });

    _Request2.default.addAction('Pagination/getCurrentPage', this.getCurrentPage, this);
    _Request2.default.addAction('Pagination/pageSize', this.addPageSizeToRequest, this);
  }

  _createClass(Pagination, [{
    key: 'incrementPage',
    value: function incrementPage(e) {
      var el = e.target;

      if (!(0, _utils.hasClass)(el, 'is-active')) {
        return false;
      }

      if ((0, _utils.hasClass)(el, 'js-prev')) {
        return this.page--;
      }

      if ((0, _utils.hasClass)(e.target, 'js-next')) {
        return this.page++;
      }

      return false;
    }
  }, {
    key: 'updatePagination',
    value: function updatePagination(request) {
      this.first = Number(request.first);
      this.pageCount = Math.round(Number(request.total) / this.pageSize());
      this.page = Math.round(Number(request.end) / this.pageSize()) - 1;
    }
  }, {
    key: 'pageSize',
    value: function pageSize() {
      return window.innerWidth < 1000 ? 5 : 50;
    }
  }, {
    key: 'addPageSizeToRequest',
    value: function addPageSizeToRequest(request, next) {
      _extends(request, { pagesize: this.pageSize() });
      next(request);
    }
  }, {
    key: 'updateDOM',
    value: function updateDOM() {
      this.pagination.classList.add('is-active');
      this.left.classList[this.hasPrevPage() ? 'add' : 'remove']('is-active');
      this.right.classList[this.hasNextPage() ? 'add' : 'remove']('is-active');
    }
  }, {
    key: 'hasPrevPage',
    value: function hasPrevPage() {
      return this.page > 0;
    }
  }, {
    key: 'hasNextPage',
    value: function hasNextPage() {
      return this.page + 1 < this.pageCount;
    }
  }, {
    key: 'getCurrentPage',
    value: function getCurrentPage(request, next) {
      next((request['page'] = this.page, request));
    }
  }]);

  return Pagination;
}();

exports.default = Pagination;

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = __webpack_require__(2);

var _emitter = __webpack_require__(0);

var _emitter2 = _interopRequireDefault(_emitter);

var _utils = __webpack_require__(3);

var _Request = __webpack_require__(1);

var _Request2 = _interopRequireDefault(_Request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sidebar = function () {
  function Sidebar(_ref) {
    var _this = this;

    var SIDEBAR = _ref.SIDEBAR,
        GEO_TRIGGER = _ref.GEO_TRIGGER,
        GEO_FEEDBACK = _ref.GEO_FEEDBACK,
        FILTERS = _ref.FILTERS,
        SIDEBAR_TEMPLATE = _ref.SIDEBAR_TEMPLATE;

    _classCallCheck(this, Sidebar);

    this.SIDEBAR_TEMPLATE = SIDEBAR_TEMPLATE;

    this.sidebar = (0, _dom.select)(SIDEBAR);
    this.geotrigger = (0, _dom.select)(GEO_TRIGGER);
    this.geofeedback = (0, _dom.select)(GEO_FEEDBACK);
    this.filters = (0, _dom.select)(FILTERS, document.body, true);

    _emitter2.default.on('request-complete', function (req, res) {
      (0, _utils.clearElement)(_this.sidebar);
      _this.addToSidebar(res);
    });

    if (this.geotrigger) {
      (0, _dom.on)(this.geotrigger, 'click', function (e) {
        (0, _utils.pd)(e);
        (0, _utils.show)(_this.geofeedback);
        _emitter2.default.emit('request', ['Form/getValues', 'Pagination/pageSize', 'Sidebar/geolocation', 'Sidebar/getFilters', 'Map/Geocode']);
      });
    }

    if (this.filters.length) {
      this.filters.map(function (el) {
        (0, _dom.on)(el, 'change', function (e) {
          (0, _utils.pd)(e);
          _emitter2.default.emit('request', ['Form/getValues', 'Sidebar/getFilters', 'Pagination/pageSize', 'Map/Geocode']);
        });
      });
    }

    _Request2.default.addAction('Sidebar/getFilters', this.getFilters, this);
    _Request2.default.addAction('Sidebar/geolocation', this.geolocation, this);
  }

  _createClass(Sidebar, [{
    key: 'addToSidebar',
    value: function addToSidebar(response) {
      var _this2 = this;

      if (!response.locations.length) {
        return this.noResults();
      }

      this.sidebar.scrollTop = 0;

      response.locations.map(function (location) {
        var HTML = _this2.SIDEBAR_TEMPLATE(location);
        var item = document.createElement('div');

        (0, _dom.on)(item, 'click', function (e) {
          if ((0, _utils.hasClass)(e.target, 'js-show-marker')) {
            (0, _utils.pd)(e);
          }
          _emitter2.default.emit('focus-on-marker', location.name, e);
        });

        item.innerHTML = HTML;
        _this2.sidebar.appendChild(item);
      });
    }
  }, {
    key: 'noResults',
    value: function noResults() {
      this.sidebar.innerHTML = '\n    <p class="h6 c-gold mxa mt1">No Results Found</p>\n    <p class="mxa">Please enter a zip code to find a store near you.</p>';
    }
  }, {
    key: 'getFilters',
    value: function getFilters(request, next) {
      var vals = this.filters.reduce(function (obj, el) {
        var attr = el.getAttribute('name');
        if (!el.checked) return obj;
        if (!obj[attr]) obj[attr] = [];
        obj[el.getAttribute('name')].push(el.value);
        return obj;
      }, {});

      if (request.address || request.lng && request.lat) {
        next(_extends(request, vals));
      }
    }
  }, {
    key: 'geolocation',
    value: function geolocation(request, next) {
      this.geofeedback.style.display = 'block';
      this.geotrigger.style.display = 'none';

      navigator.geolocation.getCurrentPosition(function (res) {
        next(_extends(request, {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }));
      });
    }
  }]);

  return Sidebar;
}();

exports.default = Sidebar;

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Components = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Request = __webpack_require__(1);

var _Request2 = _interopRequireDefault(_Request);

var _Map = __webpack_require__(28);

var _Map2 = _interopRequireDefault(_Map);

var _Form = __webpack_require__(27);

var _Form2 = _interopRequireDefault(_Form);

var _Sidebar = __webpack_require__(30);

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _Pagination = __webpack_require__(29);

var _Pagination2 = _interopRequireDefault(_Pagination);

var _emitter = __webpack_require__(0);

var _emitter2 = _interopRequireDefault(_emitter);

var _constants = __webpack_require__(32);

var Defaults = _interopRequireWildcard(_constants);

var _templates = __webpack_require__(34);

var Templates = _interopRequireWildcard(_templates);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = null;
var components = { Map: _Map2.default, Form: _Form2.default, Sidebar: _Sidebar2.default, Pagination: _Pagination2.default };

var StoreLocator = function () {
  _createClass(StoreLocator, null, [{
    key: 'Components',
    value: function Components() {
      return components;
    }
  }]);

  function StoreLocator(opts) {
    var _this = this;

    _classCallCheck(this, StoreLocator);

    if (instance) {
      return instance;
    } else {
      instance = this;
    }

    opts = _extends({}, Defaults, Templates, opts);

    Object.keys(components).map(function (key) {
      _this[key] = new components[key](opts);
    });

    return instance;
  }

  _createClass(StoreLocator, null, [{
    key: 'attachComponent',
    value: function attachComponent(name, component) {
      components[name] = component;
    }
  }, {
    key: 'attachAjaxHandler',
    value: function attachAjaxHandler(fn) {
      _Request2.default.attachAjaxHandler(fn);
    }
  }, {
    key: 'reset',
    value: function reset() {
      instance = null;
    }
  }]);

  return StoreLocator;
}();

_emitter2.default.on('request', function (actions, req) {
  return new _Request2.default(actions, req);
});

var Components = exports.Components = { Map: _Map2.default, Form: _Form2.default, Request: _Request2.default, Sidebar: _Sidebar2.default, Emitter: _emitter2.default, Pagination: _Pagination2.default };

exports.default = StoreLocator;

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAP_DEFAULTS = exports.ICON_PATH = exports.MAP_REGION = exports.MAP_LANG = exports.MAP_KEY = exports.GEO_FEEDBACK = exports.GEO_TRIGGER = exports.FETCH_LOCATIONS_FROM_CENTER = exports.FILTERS = exports.PAGINATION = exports.FORM = exports.SIDEBAR = exports.MAP = undefined;

var _mapStyles = __webpack_require__(33);

var _mapStyles2 = _interopRequireDefault(_mapStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAP = exports.MAP = '.js-locator-map';
var SIDEBAR = exports.SIDEBAR = '.js-locator-list';
var FORM = exports.FORM = '.js-locator-form';
var PAGINATION = exports.PAGINATION = '.js-locator-pagination';
var FILTERS = exports.FILTERS = '.js-locator-filter';
var FETCH_LOCATIONS_FROM_CENTER = exports.FETCH_LOCATIONS_FROM_CENTER = '.js-locator-redo';
var GEO_TRIGGER = exports.GEO_TRIGGER = '.js-locator-geo-trigger';
var GEO_FEEDBACK = exports.GEO_FEEDBACK = '.js-locator-geo-feedback';
var MAP_KEY = exports.MAP_KEY = 'AIzaSyC2cgfVdeq4VazVwDCWbDZ72AghiHeb09g';
var MAP_LANG = exports.MAP_LANG = 'en';
var MAP_REGION = exports.MAP_REGION = 'US';
var ICON_PATH = exports.ICON_PATH = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

var MAP_DEFAULTS = exports.MAP_DEFAULTS = {
  center: { lat: 30.267153, lng: -97.7430608 }, // Austin
  zoom: 15,
  styles: _mapStyles2.default,
  disableDefaultUI: true,
  zoomControl: true,
  gestureHandling: 'cooperative'
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/*eslint-disable */
exports.default = [{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
        "color": "#e9e9e9"
    }, {
        "lightness": 17
    }]
}, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
        "color": "#f5f5f5"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#ffffff"
    }, {
        "lightness": 17
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#ffffff"
    }, {
        "lightness": 29
    }, {
        "weight": 0.2
    }]
}, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{
        "color": "#ffffff"
    }, {
        "lightness": 18
    }]
}, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
        "color": "#ffffff"
    }, {
        "lightness": 16
    }]
}, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
        "color": "#f5f5f5"
    }, {
        "lightness": 21
    }]
}, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
        "color": "#dedede"
    }, {
        "lightness": 21
    }]
}, {
    "elementType": "labels.text.stroke",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#ffffff"
    }, {
        "lightness": 16
    }]
}, {
    "elementType": "labels.text.fill",
    "stylers": [{
        "saturation": 36
    }, {
        "color": "#333333"
    }, {
        "lightness": 40
    }]
}, {
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{
        "color": "#f2f2f2"
    }, {
        "lightness": 19
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#fefefe"
    }, {
        "lightness": 20
    }]
}, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#fefefe"
    }, {
        "lightness": 17
    }, {
        "weight": 1.2
    }]
}];
/*eslint-enable */

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MARKER_TEMPLATE = exports.SIDEBAR_TEMPLATE = undefined;

var _utils = __webpack_require__(3);

var SIDEBAR_TEMPLATE = exports.SIDEBAR_TEMPLATE = function SIDEBAR_TEMPLATE(_ref) {
  var name = _ref.name,
      street = _ref.street,
      city = _ref.city,
      state = _ref.state,
      zip = _ref.zip,
      phone = _ref.phone,
      lat = _ref.lat,
      lng = _ref.lng,
      distance = _ref.distance,
      carries = _ref.carries;

  return '\n    <div class="locate__location--sidebar">\n      <p class="h6 c-gold mta">' + name + '</p>\n      <p class="p mxa">' + (0, _utils.toTitleCase)(street) + '</p>\n      <p class="p mxa">' + (0, _utils.toTitleCase)(city) + ', ' + state + ' ' + zip + '</p>\n      <a class="block p mxa c-gold-darker hover--gold" href="tel:' + phone + '">' + (0, _utils.formatNumber)(phone) + '</a>\n      <p class="p mxa mb1">\n          <a class="block mxa c-gold-darker hover--gold locate__directions--sidebar" href="https://www.google.com/maps/dir//' + lat + ',' + lng + '" target="_blank">Get Directions</a>\n          <a class="block mxa c-gold-darker icon-text-star js-show-marker hover--gold" href="#">View on Map</a>\n      </p>\n      <p class="p mxa"><span class="medium">Distance: </span>' + distance + ' miles</p>\n      <p class="p mxa"><span class="medium">Carries: </span>' + carries + '</p>\n    </div>';
};

var MARKER_TEMPLATE = exports.MARKER_TEMPLATE = function MARKER_TEMPLATE(_ref2) {
  var name = _ref2.name,
      street = _ref2.street,
      city = _ref2.city,
      state = _ref2.state,
      zip = _ref2.zip,
      phone = _ref2.phone,
      lat = _ref2.lat,
      lng = _ref2.lng,
      distance = _ref2.distance,
      carries = _ref2.carries;

  return '\n  <div class="locate__location--marker">\n      <p class="h6 c-gold mta">' + name + '</p>\n      <p class="p mxa">' + (0, _utils.toTitleCase)(street) + '</p>\n      <p class="p mxa">' + (0, _utils.toTitleCase)(city) + ', ' + state + ' ' + zip + '</p>\n      <a class="block p mxa c-gold hover--gold" href="tel:' + phone + '">' + (0, _utils.formatNumber)(phone) + '</a>\n      <a class="block p mxa mb1 c-gold hover--gold locate__directions" href="https://www.google.com/maps/dir//' + lat + ',' + lng + '" target="_blank">Get Directions</a>\n      <p class="p mxa"><span class="medium archer">Distance: </span>' + distance + ' miles</p>\n      <p class="p mxa"><span class="medium archer">Carries: </span>' + carries + '</p>\n    </div>';
};

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*eslint-disable */
exports.default = { "locations": [{ "dba": ["G H FOOD"], "street": ["750 MANHATTAN AVE STE A"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.72622"], "long": ["-73.95209"], "phone": ["7183493239"], "storeType": ["05"], "lastSold": ["20170327"], "distance": ["0.1"], "otherBrands": [{ "otherBrand": ["Hopped", "Original", "Pineapple", "Tx Honey", "Variety"] }], "packages": [{ "package": ["2/12", "4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["2/12", "4/6"] }] }, { "dba": ["LAKE STREET"], "street": ["706 MANHATTAN AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.72564"], "long": ["-73.95176"], "phone": ["7186090002"], "storeType": ["23"], "lastSold": ["20170321"], "distance": ["0.2"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["1/2"] }], "packageTypes": [{ "packageType": ["KEG"] }], "packageSizes": [{ "packageSize": ["1/2"] }] }, { "dba": ["MCGUINESS & KENT SVC STATION"], "street": ["256 MCGUINESS BLVD"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.73096"], "long": ["-73.95159"], "phone": ["7183831131"], "storeType": ["01"], "lastSold": ["20170328"], "distance": ["0.2"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["KDA MINI MART"], "street": ["711 MANHATTAN AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.72617"], "long": ["-73.95222"], "phone": ["3475575135"], "storeType": ["01"], "lastSold": ["20170327"], "distance": ["0.2"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["MR BERRY"], "street": ["892 MANHATTAN AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.73004"], "long": ["-73.95409"], "phone": ["3475991662"], "storeType": ["05"], "lastSold": ["20170306"], "distance": ["0.2"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["BROOKLYN BAZAAR"], "street": ["144 GREENPOINT AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.72998"], "long": ["-73.955663"], "phone": ["9149249883"], "storeType": ["23"], "lastSold": ["20170331"], "distance": ["0.2"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["CHERRY POINT"], "street": ["664 MANHATTAN AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.724668"], "long": ["-73.951212"], "phone": ["7183893828"], "storeType": ["32"], "lastSold": ["20170321"], "distance": ["0.2"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["GREENPOINT FISH & LOBSTER"], "street": ["114 NASSAU AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.72427"], "long": ["-73.94908"], "phone": ["7183490400"], "storeType": ["32"], "lastSold": ["20170327"], "distance": ["0.3"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["DIAMOND DELI"], "street": ["162 NASSAU AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.724999"], "long": ["-73.946845"], "phone": ["7183497544"], "storeType": ["05"], "lastSold": ["20170307"], "distance": ["0.3"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["C TOWN SUPERMARKET"], "street": ["953 MANHATTAN AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.73197"], "long": ["-73.95463"], "phone": ["7183493000"], "storeType": ["09"], "lastSold": ["20170306"], "distance": ["0.3"], "otherBrands": [{ "otherBrand": ["Hopped", "Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["MCCARREN DELI"], "street": ["57 NASSAU AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.72353"], "long": ["-73.95165"], "phone": ["7183842870"], "storeType": ["05"], "lastSold": ["20170320"], "distance": ["0.3"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["SHAYZ"], "street": ["130 FRANKLIN ST STE 1"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.72928"], "long": ["-73.95742"], "phone": ["7183893888"], "storeType": ["23"], "lastSold": ["20170323"], "distance": ["0.4"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["HAIL MARY"], "street": ["68 GREENPOINT AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.729741"], "long": ["-73.958277"], "phone": ["3474220645"], "storeType": ["32"], "lastSold": ["20170330"], "distance": ["0.4"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["OHS MINI MARKET"], "street": ["227 A NASSAU AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.72579"], "long": ["-73.94317"], "phone": ["7183835942"], "storeType": ["05"], "lastSold": ["20170328"], "distance": ["0.4"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["FREDDYS MARKET"], "street": ["257 DRIGGS AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.72262"], "long": ["-73.94776"], "phone": ["7183025208"], "storeType": ["05"], "lastSold": ["20170307"], "distance": ["0.4"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["THE MOONLIGHT MILE"], "street": ["200 FRANKLIN ST"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.7323"], "long": ["-73.95791"], "phone": ["7183893904"], "storeType": ["23"], "lastSold": ["20170330"], "distance": ["0.5"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["DRIGGS FINEST DELI"], "street": ["162 DRIGGS AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.72309"], "long": ["-73.94455"], "phone": ["7183831740"], "storeType": ["05"], "lastSold": ["20170328"], "distance": ["0.5"], "otherBrands": [{ "otherBrand": ["Original", "Tx Honey"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["JOHN DELI"], "street": ["260 NASSAU AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.72586"], "long": ["-73.94113"], "phone": ["7183891275"], "storeType": ["05"], "lastSold": ["20170328"], "distance": ["0.5"], "otherBrands": [{ "otherBrand": ["Original", "Tx Honey"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["LOBSTER JOINT"], "street": ["1073 MANHATTAN AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.73535"], "long": ["-73.95518"], "phone": ["7188398990"], "storeType": ["32"], "lastSold": ["20170316"], "distance": ["0.6"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["MABLES SMOKEHOUSE AND BANQUET HALL"], "street": ["44 BERRY ST"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11249"], "lat": ["40.72102"], "long": ["-73.95649"], "phone": ["7182186655"], "storeType": ["32"], "lastSold": ["20170323"], "distance": ["0.6"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["THE COUNTING ROOM"], "street": ["44 BERRY ST"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11249"], "lat": ["40.72102"], "long": ["-73.95649"], "phone": ["9179924333"], "storeType": ["23"], "lastSold": ["20170330"], "distance": ["0.6"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["BEDFORD 101 FOOD CORP"], "street": ["95 BEDFORD AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11249"], "lat": ["40.71309"], "long": ["-73.96225"], "phone": ["7183885088"], "storeType": ["05"], "lastSold": ["20170316"], "distance": ["0.6"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["KENT ALE HOUSE"], "street": ["51 KENT AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11249"], "lat": ["40.65758"], "long": ["-73.95811"], "phone": ["5165512496"], "storeType": ["23"], "lastSold": ["20170323"], "distance": ["0.6"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["1/2"] }], "packageTypes": [{ "packageType": ["KEG"] }], "packageSizes": [{ "packageSize": ["1/2"] }] }, { "dba": ["THE DRIFT"], "street": ["579 MEEKER AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.721489"], "long": ["-73.942278"], "phone": ["7185047776"], "storeType": ["23"], "lastSold": ["20170321"], "distance": ["0.6"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["KHIMS MILLENNIUM MARKET"], "street": ["460 DRIGGS AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.7192"], "long": ["-73.95419"], "phone": ["7183024152"], "storeType": ["05"], "lastSold": ["20170328"], "distance": ["0.7"], "otherBrands": [{ "otherBrand": ["Hopped", "Original", "Pineapple"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["BLUE STAR DELI & ORGANIC"], "street": ["715 LORIMER ST"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.718414"], "long": ["-73.950159"], "phone": ["9173913561"], "storeType": ["05"], "lastSold": ["20170321"], "distance": ["0.7"], "otherBrands": [{ "otherBrand": ["Pineapple", "Tx Honey"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["595"], "street": ["595 UNION AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71742"], "long": ["-73.95226"], "phone": ["6462381137"], "storeType": ["32"], "lastSold": ["20170330"], "distance": ["0.7"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["JR UNION MARKET"], "street": ["568 UNION AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.7174"], "long": ["-73.95211"], "phone": ["7183879696"], "storeType": ["05"], "lastSold": ["20170321"], "distance": ["0.7"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["BEVERAGE WORLD"], "street": ["40 LOMBARDY ST"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11222"], "lat": ["40.72183"], "long": ["-73.93987"], "phone": ["7183832200"], "storeType": ["03"], "lastSold": ["20170323"], "distance": ["0.7"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["2/12", "4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["2/12", "4/6"] }] }, { "dba": ["BEDFORD GOURMET FOOD"], "street": ["160 BEDFORD AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11249"], "lat": ["40.65758"], "long": ["-73.95811"], "phone": ["9174151132"], "storeType": ["05"], "lastSold": ["20170321"], "distance": ["0.7"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["ROEBLING SPORTS CLUB"], "street": ["225 N 8TH ST"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71691"], "long": ["-73.95466"], "phone": ["9176860327"], "storeType": ["23"], "lastSold": ["20170320"], "distance": ["0.8"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["N7 MARKET"], "street": ["183 BEDFORD AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71781"], "long": ["-73.95765"], "phone": ["7183022100"], "storeType": ["05"], "lastSold": ["20170315"], "distance": ["0.8"], "otherBrands": [{ "otherBrand": ["Original", "Tx Honey"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["NAMI FOOD                Y"], "street": ["150 N 7TH ST"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11249"], "lat": ["40.71816"], "long": ["-73.95837"], "phone": ["7182189447"], "storeType": ["05"], "lastSold": ["20170322"], "distance": ["0.8"], "otherBrands": [{ "otherBrand": ["Original", "Pineapple", "Variety"] }], "packages": [{ "package": ["2/12", "4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["2/12", "4/6"] }] }, { "dba": ["OHM DELI"], "street": ["642 LORIMER ST STE A"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71614"], "long": ["-73.94966"], "phone": ["7183899413"], "storeType": ["05"], "lastSold": ["20170328"], "distance": ["0.8"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["ASSOCIATED SUPERMARKET"], "street": ["57 KINGSLAND AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71816"], "long": ["-73.94045"], "phone": ["7183896725"], "storeType": ["09"], "lastSold": ["20170328"], "distance": ["0.9"], "otherBrands": [{ "otherBrand": ["Original", "Pineapple"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["UNION POOL"], "street": ["484 UNION AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71505"], "long": ["-73.95171"], "phone": ["7186090484"], "storeType": ["23"], "lastSold": ["20170328"], "distance": ["0.9"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["2/12"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["2/12"] }] }, { "dba": ["BROOKLYN HARVEST MARKET"], "street": ["25 N 5TH ST"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11249"], "lat": ["40.719577"], "long": ["-73.96337"], "phone": ["7183875533"], "storeType": ["09"], "lastSold": ["20170330"], "distance": ["0.9"], "otherBrands": [{ "otherBrand": ["Original", "Pineapple", "Tx Honey"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["KINGS COUNTY IMPERIAL"], "street": ["20 SKILLMAN AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71533"], "long": ["-73.95027"], "phone": ["7186102001"], "storeType": ["32"], "lastSold": ["20170323"], "distance": ["0.9"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["TWO DOOR TAVERN"], "street": ["116 N 5TH ST"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11249"], "lat": ["40.71716"], "long": ["-73.95974"], "phone": ["7185990222"], "storeType": ["32"], "lastSold": ["20170321"], "distance": ["0.9"], "otherBrands": [{ "otherBrand": ["Tx Honey"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["CONCORD HILL"], "street": ["374 GRAHAM AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71557"], "long": ["-73.94448"], "phone": ["6463699810"], "storeType": ["32"], "lastSold": ["20170309"], "distance": ["0.9"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["THE BROOKLYN STAR"], "street": ["593 LORIMER ST"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71473"], "long": ["-73.94955"], "phone": ["5407380892"], "storeType": ["32"], "lastSold": ["20170323"], "distance": ["0.9"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["1/2"] }], "packageTypes": [{ "packageType": ["KEG"] }], "packageSizes": [{ "packageSize": ["1/2"] }] }, { "dba": ["MACRI PARK"], "street": ["462 UNION AVE STE A"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71423"], "long": ["-73.95158"], "phone": ["7185994999"], "storeType": ["23"], "lastSold": ["20170323"], "distance": ["1"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["1/2"] }], "packageTypes": [{ "packageType": ["KEG"] }], "packageSizes": [{ "packageSize": ["1/2"] }] }, { "dba": ["SUGARGURG"], "street": ["519 METROPOLITAN AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.7141"], "long": ["-73.95053"], "phone": ["8457500828"], "storeType": ["23"], "lastSold": ["20170330"], "distance": ["1"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["WHOLE FOODS MARKET"], "street": ["238 BEDFORD AVE STE A"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11249"], "lat": ["40.715758"], "long": ["-73.960026"], "phone": ["7187342321"], "storeType": ["09"], "lastSold": ["20170327"], "distance": ["1"], "otherBrands": [{ "otherBrand": ["Original", "Pineapple", "Tx Honey", "Variety"] }], "packages": [{ "package": ["2/12", "4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["2/12", "4/6"] }] }, { "dba": ["TWO 21 RESTAURANT"], "street": ["221 N 4TH ST"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71454"], "long": ["-73.95679"], "phone": ["7183025100"], "storeType": ["32"], "lastSold": ["20170313"], "distance": ["1"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["BAGELSMITH"], "street": ["566 LORIMER ST"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.7139"], "long": ["-73.94928"], "phone": ["3472940046"], "storeType": ["05"], "lastSold": ["20170328"], "distance": ["1"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["CORNER MARKET"], "street": ["344 GRAHAM AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71487"], "long": ["-73.94436"], "phone": ["7183025127"], "storeType": ["05"], "lastSold": ["20170307"], "distance": ["1"], "otherBrands": [{ "otherBrand": ["Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["HANA FOOD"], "street": ["534 METROPOLITAN AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.714"], "long": ["-73.95062"], "phone": ["7182187747"], "storeType": ["05"], "lastSold": ["20170315"], "distance": ["1"], "otherBrands": [{ "otherBrand": ["Original", "Tx Honey"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["SUNAC FOOD"], "street": ["440 UNION AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71349"], "long": ["-73.95146"], "phone": ["7186430508"], "storeType": ["05"], "lastSold": ["20170328"], "distance": ["1"], "otherBrands": [{ "otherBrand": ["Hopped", "Original", "Pineapple"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }, { "dba": ["C TOWN SUPERMARKET"], "street": ["330 GRAHAM AVE"], "city": ["BROOKLYN"], "state": ["NY"], "zip": ["11211"], "lat": ["40.71415"], "long": ["-73.94424"], "phone": ["7183888968"], "storeType": ["09"], "lastSold": ["20170328"], "distance": ["1"], "otherBrands": [{ "otherBrand": ["Hopped", "Original"] }], "packages": [{ "package": ["4/6"] }], "packageTypes": [{ "packageType": ["CAN"] }], "packageSizes": [{ "packageSize": ["4/6"] }] }], "start": "1", "end": "50", "total": "414" };
/*eslint-enable */

/*** EXPORTS FROM exports-loader ***/


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader 
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	}),
	getElement = (function(fn) {
		var memo = {};
		return function(selector) {
			if (typeof memo[selector] === "undefined") {
				memo[selector] = fn.call(this, selector);
			}
			return memo[selector]
		};
	})(function (styleTarget) {
		return document.querySelector(styleTarget)
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [],
	fixUrls = __webpack_require__(25);

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (typeof options.insertInto === "undefined") options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var styleTarget = getElement(options.insertInto)
	if (!styleTarget) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			styleTarget.insertBefore(styleElement, styleTarget.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			styleTarget.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		styleTarget.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	options.attrs.type = "text/css";

	attachTagAttrs(styleElement, options.attrs);
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	attachTagAttrs(linkElement, options.attrs);
	insertStyleElement(options, linkElement);
	return linkElement;
}

function attachTagAttrs(element, attrs) {
	Object.keys(attrs).forEach(function (key) {
		element.setAttribute(key, attrs[key]);
	});
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement, options);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
	and there is no publicPath defined then lets turn convertToAbsoluteUrls
	on by default.  Otherwise default to the convertToAbsoluteUrls option
	directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls){
		css = fixUrls(css);
	}

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(5);


/***/ })
/******/ ]);
});