(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define("datepicker", ["angular"], factory);
	else if(typeof exports === 'object')
		exports["datepicker"] = factory(require("angular"));
	else
		root["datepicker"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var angular = __webpack_require__(1);
	var template = __webpack_require__(2);
	__webpack_require__(3);
	
	angular.module('datepicker', []).component('datepicker', {
	        bindings: {
	            date: '=',
	            disabled: '@'
	        },
	        template: template,
	        controller: function ($scope, $timeout, $element, $document) {
	
	            Date.isLeapYear = function (year) {
	                return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
	            };
	
	            Date.getDaysInMonth = function (year, month) {
	                return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
	            };
	
	            Date.prototype.isLeapYear = function () {
	                return Date.isLeapYear(this.getFullYear());
	            };
	
	            Date.prototype.getDaysInMonth = function () {
	                return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
	            };
	
	            Date.prototype.addMonths = function (value) {
	                var n = this.getDate();
	                this.setDate(1);
	                this.setMonth(this.getMonth() + value);
	                this.setDate(Math.min(n, this.getDaysInMonth()));
	                return this;
	            };
	
	            var self = this;
	            self.show_calendar = false;
	            self.today = new Date();
	            self.visible_date = new Date();
	
	            self.get_calendar_date = function () {
	                var months = [
	                    "January",
	                    "February",
	                    "March",
	                    "April",
	                    "May",
	                    "June",
	                    "July",
	                    "August",
	                    "September",
	                    "October",
	                    "November",
	                    "December"
	                ];
	                return months[self.visible_date.getMonth()] + " " + self.visible_date.getFullYear();
	            }
	
	            self.get_month_days = function () {
	                var d = new Date(self.visible_date);
	                var days_n = d.getDaysInMonth();
	                var days = [];
	                for (var i = 0; i < days_n; i++) {
	                    days.push(i + 1);
	                }
	                return days;
	            }
	
	            self.get_empty_days = function () {
	                var d = new Date(self.visible_date);
	                d.setDate(1);
	                var days_n = d.getDay();
	                var days = [];
	                for (var i = 0; i < days_n; i++) {
	                    days.push(i);
	                }
	                return days;
	            }
	
	            self.is_day_today = function (n) {
	                if (self.visible_date.getMonth() !== self.today.getMonth()) return false;
	                if (self.visible_date.getFullYear() !== self.today.getFullYear()) return false;
	                if (n !== self.today.getDate()) return false;
	
	                return true;
	            }
	
	            self.is_day_selected = function (n) {
	                if (!self.date) return;
	
	                if (self.visible_date.getMonth() !== self.date.getMonth()) return false;
	                if (self.visible_date.getFullYear() !== self.date.getFullYear()) return false;
	                if (n !== self.date.getDate()) return false;
	
	                return true;
	            }
	
	            self.clear = function () {
	                if (self.disabled) return;
	                self.date = null;
	                self.selected_day = null;
	                self.selected_month = null;
	                self.selected_year = null;
	            }
	
	            self.open_calendar = function () {
	                if (self.date) {
	                    self.visible_date = new Date(self.date);
	                } else {
	                    self.visible_date = new Date(self.today);
	                }
	
	                self.show_calendar = true;
	            }
	
	            self.toggle_calendar = function () {
	                if (self.show_calendar == false) {
	                    self.open_calendar();
	                } else {
	                    self.show_calendar = false;
	                }
	            }
	
	            self.set_date = function (n) {
	                if (self.disabled) return;
	
	                self.date = new Date(self.visible_date);
	                self.date.setDate(n);
	                self.show_calendar = false;
	            }
	
	            self.change_month = function (n) {
	                var m = self.visible_date.getMonth();
	                var y = self.visible_date.getFullYear();
	
	                m += n;
	
	                if (m > 11) {
	                    m = 0;
	                    y += 1;
	                }
	
	                if (m < 0) {
	                    m = 11;
	                    y -= 1;
	                }
	
	                self.visible_date.setMonth(m);
	                self.visible_date.setFullYear(y);
	            }
	
	            self.update_selected_date = function () {
	                console.log("update");
	                if (!self.selected_month && !self.selected_day && !self.selected_year) return;
	                if (!self.date) self.date = new Date();
	
	                // Year
	                if (self.selected_year) {
	                    if (self.selected_year > 9999) self.selected_year = 9999;
	                    if (self.selected_year < 1) self.selected_year = 1;
	                } else {
	                    self.selected_year = self.today.getFullYear();
	                }
	
	                // Month
	                if (self.selected_month) {
	                    if (self.selected_month > 12) self.selected_month = 12;
	                    if (self.selected_month < 1) self.selected_month = 1;
	                } else {
	                    self.selected_month = self.today.getMonth() + 1;
	                }
	
	                // Date
	                if (self.selected_day) {
	                    var d = new Date(self.date);
	                    var old_day = d.getDate();
	                    d.setMonth(self.selected_month - 1);
	                    if(d.getDate() != old_day){
	                        d.setDate(0);
	                    }
	                    var max = d.getDaysInMonth();
	                    if (self.selected_day > max) self.selected_day = max;
	                    if (self.selected_day < 1) self.selected_day = 1;
	                } else {
	                    self.selected_day = self.today.getDate();
	                }
	
	                // Update model
	                self.date.setFullYear(self.selected_year);
	                self.date.setMonth(self.selected_month - 1);
	                self.date.setDate(self.selected_day);
	
	                self.visible_date = new Date(self.date);
	            }
	
	            $scope.$watch('$ctrl.date', function (newValue, oldValue) {
	                if (self.date) {
	                    self.selected_day = self.date.getDate();
	                    self.selected_month = self.date.getMonth() + 1;
	                    self.selected_year = self.date.getFullYear();
	                    self.update_selected_date();
	                }
	            });
	
	            $scope.$watch('$ctrl.show_calendar', function (newValue, oldValue) {
	                if (newValue !== oldValue && newValue == true) {
	                    $document.bind('click', onClick);
	                } else if (newValue !== oldValue && newValue == false) {
	                    $document.unbind('click', onClick);
	                }
	            });
	
	            var onClick = function (event) {
	                var isChild = $element[0].contains(event.target);
	                var isSelf = $element[0] == event.target;
	                var isInside = isChild || isSelf;
	                if (!isInside) {
	                    $timeout(function () {
	                        self.show_calendar = false;
	                    }, 10);
	                }
	            }
	        }
	    })
	    .name;


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = "<div class=\"datepicker-container\" ng-class=\"{ 'disabled': $ctrl.disabled }\">\n    <div class=\"datepicker-input\">\n        <div class=\"datepicker-fake-input\" ng-click=\"$ctrl.open_calendar()\">\n            <input type=\"number\" placeholder=\"MM\" min=\"1\" max=\"12\" ng-model=\"$ctrl.selected_month\" ng-blur=\"$ctrl.update_selected_date()\" ng-disabled=\"$ctrl.disabled\" /> <span>/</span>\n            <input type=\"number\" placeholder=\"DD\" min=\"1\" max=\"31\" ng-model=\"$ctrl.selected_day\" ng-blur=\"$ctrl.update_selected_date()\" ng-disabled=\"$ctrl.disabled\" /> <span>/</span>\n            <input type=\"number\" placeholder=\"YYYY\" min=\"1000\" max=\"9999\" ng-model=\"$ctrl.selected_year\" ng-blur=\"$ctrl.update_selected_date()\" ng-disabled=\"$ctrl.disabled\" style=\"width:3em;\"/>\n        </div>\n        <span class=\"datepicker-icon datepicker-icon-arrow\" ng-click=\"$ctrl.toggle_calendar()\"></span>\n        <span class=\"datepicker-icon datepicker-icon-clear\" ng-if=\"$ctrl.date && !$ctrl.disabled\" ng-click=\"$ctrl.clear()\"></span>\n    </div>\n    <div class=\"datepicker-picker\" ng-show=\"$ctrl.show_calendar\">\n        <div class=\"datepicker-selector\">\n            <button type=\"button\" ng-click=\"$ctrl.change_month(-1)\" style=\"float:left;\"> « </button>\n            <span>{{$ctrl.get_calendar_date()}}</span>\n            <button type=\"button\" ng-click=\"$ctrl.change_month(1)\" style=\"float:right;\"> » </button>\n        </div>\n\n        <div class=\"datepicker-calendar\">\n            <div class=\"datepicker-day datepicker-weekday\">Su</div>\n            <div class=\"datepicker-day datepicker-weekday\">Mo</div>\n            <div class=\"datepicker-day datepicker-weekday\">Tu</div>\n            <div class=\"datepicker-day datepicker-weekday\">We</div>\n            <div class=\"datepicker-day datepicker-weekday\">Th</div>\n            <div class=\"datepicker-day datepicker-weekday\">Fr</div>\n            <div class=\"datepicker-day datepicker-weekday\">Sa</div>\n\n            <div class=\"datepicker-day\" ng-repeat=\"day in $ctrl.get_empty_days()\"> </div>\n            <div class=\"datepicker-day datepicker-date\" ng-repeat=\"day in $ctrl.get_month_days()\" ng-click=\"$ctrl.set_date(day)\" ng-class=\"{ 'datepicker-today': $ctrl.is_day_today(day), 'datepicker-selected': $ctrl.is_day_selected(day)}\">{{day}}</div>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!!./style.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports
	
	
	// module
	exports.push([module.id, "datepicker {\n    font-family: \"Segoe UI Light\", \"Segoe UI\", Segoe, Tahoma, Helvetica, Arial, sans-serif;\n}\n\ndatepicker * {\n    /*-webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;*/\n    box-sizing: border-box;\n}\n\ndatepicker .datepicker-container {\n    width: 100%;\n    position: relative;\n}\n\ndatepicker .datepicker-container.disabled, datepicker .datepicker-container.disabled .datepicker-input, datepicker .datepicker-container.disabled .datepicker-fake-input input {\n    background-color: #ebebe4 !important;\n}\n\ndatepicker .datepicker-input {\n    width: 100%;\n    height: 34px;\n    background-color: #fff;\n    padding: 6px 12px;\n    border: 1px solid #ccc;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: rgb(68, 68, 68);\n}\n\ndatepicker .datepicker-fake-input input {\n    width: 2em;\n    border: 0;\n    outline: 0;\n    text-align: center;\n    font-size: 14px;\n    color: rgb(68, 68, 68);\n    background-color: transparent;\n}\n\ndatepicker .datepicker-fake-input input::-webkit-outer-spin-button, datepicker .datepicker-fake-input input::-webkit-inner-spin-button {\n    display: none;\n    -webkit-appearance: none;\n    margin: 0;\n}\n\ndatepicker .datepicker-fake-input input[type=number] {\n    -moz-appearance:textfield;\n}\n\ndatepicker .datepicker-icon {\n    background-size: 24px 24px;\n    height: 24px;\n    width: 24px;\n}\n\ndatepicker .datepicker-icon-arrow {\n    position: absolute;\n    top: 7px;\n    right: 6px;\n    cursor: pointer;\n    background: url(" + __webpack_require__(6) + ");\n}\n\ndatepicker .datepicker-icon-clear {\n    display: none;\n    position: absolute;\n    top: 7px;\n    right: 30px;\n    cursor: pointer;\n    background: url(" + __webpack_require__(7) + ");\n}\n\ndatepicker .datepicker-icon-clear:hover {\n    color: red;\n}\n\ndatepicker:hover .datepicker-icon-clear {\n    display: block;\n}\n\ndatepicker .datepicker-picker {\n    border: 1px solid #ccc;\n    background-color: white;\n    position: absolute;\n    top: 33px;\n    left: 0;\n    width: 100%;\n    padding: 6px 12px;\n    max-width: 300px;\n    z-index: 1;\n}\n\ndatepicker .datepicker-picker *{\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    outline: 0;\n}\n\ndatepicker .datepicker-selector {\n    display: inline-block;\n    text-align: center;\n    width: 100%;\n    font-weight: 700;\n    padding: 0 12px;\n    font-size: 13px;\n    color: rgb(68, 68, 68);\n    letter-spacing: 0.01em;\n}\n\ndatepicker .datepicker-selector button {\n    background-color: transparent;\n    border: 0;\n    font-weight: bold;\n    outline: 0;\n    cursor: pointer;\n    color: rgb(68, 68, 68);\n}\n\ndatepicker .datepicker-calendar {\n    margin-top: 10px;\n    display: inline-table;\n}\n\ndatepicker .datepicker-day {\n    display: inline-block;\n    width: 14.2%;\n    line-height: 30px;\n    text-align: center;\n    padding: 0.5em;\n}\n\ndatepicker .datepicker-date {\n    background-color: transparent;\n    cursor: pointer;\n    font-size: 13px;\n    border-width: initial;\n    border-style: none;\n    border-color: initial;\n    border-image: initial;\n    padding: 0.2em 0.3em;\n    margin: 0px;\n    color: rgb(68, 68, 68);\n    font-weight: 200;\n}\n\ndatepicker .datepicker-date:hover {\n    background-color: rgb(228, 240, 255);\n    color: rgb(68, 68, 68);\n    -webkit-border-radius: 4px;\n    -moz-border-radius: 4px;\n    border-radius: 4px;\n}\n\ndatepicker .datepicker-today {\n    background-color: #eee;\n    -webkit-border-radius: 4px;\n    -moz-border-radius: 4px;\n    border-radius: 4px;\n}\n\ndatepicker .datepicker-selected, datepicker .datepicker-selected:hover {\n    background-color: rgb(9, 99, 209);\n    color: rgb(255, 255, 255);\n    text-shadow: rgba(0, 0, 0, 0.498039) 0px 1px 1px;\n    -webkit-border-radius: 4px;\n    -moz-border-radius: 4px;\n    border-radius: 4px;\n}\n\ndatepicker .datepicker-weekday {\n    font-weight: 600;\n    font-size: 10px;\n    color: rgb(68, 68, 68);\n}\n", "", {"version":3,"sources":["/./src/style.css"],"names":[],"mappings":"AAAA;IACI,uFAAuF;CAC1F;;AAED;IACI;;;;;wBAKoB;IACpB,uBAAuB;CAC1B;;AAED;IACI,YAAY;IACZ,mBAAmB;CACtB;;AAED;IACI,qCAAqC;CACxC;;AAED;IACI,YAAY;IACZ,aAAa;IACb,uBAAuB;IACvB,kBAAkB;IAClB,uBAAuB;IACvB,gBAAgB;IAChB,wBAAwB;IACxB,uBAAuB;CAC1B;;AAED;IACI,WAAW;IACX,UAAU;IACV,WAAW;IACX,mBAAmB;IACnB,gBAAgB;IAChB,uBAAuB;IACvB,8BAA8B;CACjC;;AAED;IACI,cAAc;IACd,yBAAyB;IACzB,UAAU;CACb;;AAED;IACI,0BAA0B;CAC7B;;AAED;IACI,2BAA2B;IAC3B,aAAa;IACb,YAAY;CACf;;AAED;IACI,mBAAmB;IACnB,SAAS;IACT,WAAW;IACX,gBAAgB;IAChB,0CAAyC;CAC5C;;AAED;IACI,cAAc;IACd,mBAAmB;IACnB,SAAS;IACT,YAAY;IACZ,gBAAgB;IAChB,0CAAoC;CACvC;;AAED;IACI,WAAW;CACd;;AAED;IACI,eAAe;CAClB;;AAED;IACI,uBAAuB;IACvB,wBAAwB;IACxB,mBAAmB;IACnB,UAAU;IACV,QAAQ;IACR,YAAY;IACZ,kBAAkB;IAClB,iBAAiB;IACjB,WAAW;CACd;;AAED;IACI,4BAA4B;IAC5B,0BAA0B;IAC1B,yBAAyB;IACzB,uBAAuB;IACvB,sBAAsB;IACtB,kBAAkB;IAClB,WAAW;CACd;;AAED;IACI,sBAAsB;IACtB,mBAAmB;IACnB,YAAY;IACZ,iBAAiB;IACjB,gBAAgB;IAChB,gBAAgB;IAChB,uBAAuB;IACvB,uBAAuB;CAC1B;;AAED;IACI,8BAA8B;IAC9B,UAAU;IACV,kBAAkB;IAClB,WAAW;IACX,gBAAgB;IAChB,uBAAuB;CAC1B;;AAED;IACI,iBAAiB;IACjB,sBAAsB;CACzB;;AAED;IACI,sBAAsB;IACtB,aAAa;IACb,kBAAkB;IAClB,mBAAmB;IACnB,eAAe;CAClB;;AAED;IACI,8BAA8B;IAC9B,gBAAgB;IAChB,gBAAgB;IAChB,sBAAsB;IACtB,mBAAmB;IACnB,sBAAsB;IACtB,sBAAsB;IACtB,qBAAqB;IACrB,YAAY;IACZ,uBAAuB;IACvB,iBAAiB;CACpB;;AAED;IACI,qCAAqC;IACrC,uBAAuB;IACvB,2BAA2B;IAC3B,wBAAwB;IACxB,mBAAmB;CACtB;;AAED;IACI,uBAAuB;IACvB,2BAA2B;IAC3B,wBAAwB;IACxB,mBAAmB;CACtB;;AAED;IACI,kCAAkC;IAClC,0BAA0B;IAC1B,iDAAiD;IACjD,2BAA2B;IAC3B,wBAAwB;IACxB,mBAAmB;CACtB;;AAED;IACI,iBAAiB;IACjB,gBAAgB;IAChB,uBAAuB;CAC1B","file":"style.css","sourcesContent":["datepicker {\n    font-family: \"Segoe UI Light\", \"Segoe UI\", Segoe, Tahoma, Helvetica, Arial, sans-serif;\n}\n\ndatepicker * {\n    /*-webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;*/\n    box-sizing: border-box;\n}\n\ndatepicker .datepicker-container {\n    width: 100%;\n    position: relative;\n}\n\ndatepicker .datepicker-container.disabled, datepicker .datepicker-container.disabled .datepicker-input, datepicker .datepicker-container.disabled .datepicker-fake-input input {\n    background-color: #ebebe4 !important;\n}\n\ndatepicker .datepicker-input {\n    width: 100%;\n    height: 34px;\n    background-color: #fff;\n    padding: 6px 12px;\n    border: 1px solid #ccc;\n    font-size: 14px;\n    line-height: 1.42857143;\n    color: rgb(68, 68, 68);\n}\n\ndatepicker .datepicker-fake-input input {\n    width: 2em;\n    border: 0;\n    outline: 0;\n    text-align: center;\n    font-size: 14px;\n    color: rgb(68, 68, 68);\n    background-color: transparent;\n}\n\ndatepicker .datepicker-fake-input input::-webkit-outer-spin-button, datepicker .datepicker-fake-input input::-webkit-inner-spin-button {\n    display: none;\n    -webkit-appearance: none;\n    margin: 0;\n}\n\ndatepicker .datepicker-fake-input input[type=number] {\n    -moz-appearance:textfield;\n}\n\ndatepicker .datepicker-icon {\n    background-size: 24px 24px;\n    height: 24px;\n    width: 24px;\n}\n\ndatepicker .datepicker-icon-arrow {\n    position: absolute;\n    top: 7px;\n    right: 6px;\n    cursor: pointer;\n    background: url('images/down_arrow.svg');\n}\n\ndatepicker .datepicker-icon-clear {\n    display: none;\n    position: absolute;\n    top: 7px;\n    right: 30px;\n    cursor: pointer;\n    background: url('images/clear.svg');\n}\n\ndatepicker .datepicker-icon-clear:hover {\n    color: red;\n}\n\ndatepicker:hover .datepicker-icon-clear {\n    display: block;\n}\n\ndatepicker .datepicker-picker {\n    border: 1px solid #ccc;\n    background-color: white;\n    position: absolute;\n    top: 33px;\n    left: 0;\n    width: 100%;\n    padding: 6px 12px;\n    max-width: 300px;\n    z-index: 1;\n}\n\ndatepicker .datepicker-picker *{\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    outline: 0;\n}\n\ndatepicker .datepicker-selector {\n    display: inline-block;\n    text-align: center;\n    width: 100%;\n    font-weight: 700;\n    padding: 0 12px;\n    font-size: 13px;\n    color: rgb(68, 68, 68);\n    letter-spacing: 0.01em;\n}\n\ndatepicker .datepicker-selector button {\n    background-color: transparent;\n    border: 0;\n    font-weight: bold;\n    outline: 0;\n    cursor: pointer;\n    color: rgb(68, 68, 68);\n}\n\ndatepicker .datepicker-calendar {\n    margin-top: 10px;\n    display: inline-table;\n}\n\ndatepicker .datepicker-day {\n    display: inline-block;\n    width: 14.2%;\n    line-height: 30px;\n    text-align: center;\n    padding: 0.5em;\n}\n\ndatepicker .datepicker-date {\n    background-color: transparent;\n    cursor: pointer;\n    font-size: 13px;\n    border-width: initial;\n    border-style: none;\n    border-color: initial;\n    border-image: initial;\n    padding: 0.2em 0.3em;\n    margin: 0px;\n    color: rgb(68, 68, 68);\n    font-weight: 200;\n}\n\ndatepicker .datepicker-date:hover {\n    background-color: rgb(228, 240, 255);\n    color: rgb(68, 68, 68);\n    -webkit-border-radius: 4px;\n    -moz-border-radius: 4px;\n    border-radius: 4px;\n}\n\ndatepicker .datepicker-today {\n    background-color: #eee;\n    -webkit-border-radius: 4px;\n    -moz-border-radius: 4px;\n    border-radius: 4px;\n}\n\ndatepicker .datepicker-selected, datepicker .datepicker-selected:hover {\n    background-color: rgb(9, 99, 209);\n    color: rgb(255, 255, 255);\n    text-shadow: rgba(0, 0, 0, 0.498039) 0px 1px 1px;\n    -webkit-border-radius: 4px;\n    -moz-border-radius: 4px;\n    border-radius: 4px;\n}\n\ndatepicker .datepicker-weekday {\n    font-weight: 600;\n    font-size: 10px;\n    color: rgb(68, 68, 68);\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNDQ0NDQ0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik03LjQxIDcuODRMMTIgMTIuNDJsNC41OS00LjU4TDE4IDkuMjVsLTYgNi02LTZ6Ii8+CiAgICA8cGF0aCBkPSJNMC0uNzVoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+"

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNDQ0NDQ0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg=="

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

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
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
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
	}
	
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
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
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
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
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
			update = updateLink.bind(null, styleElement);
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
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
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


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxMjZhZTkxMDg2NWFhNWFmYTUxMyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYW5ndWxhclwiIiwid2VicGFjazovLy8uL3NyYy90ZW1wbGF0ZS5odG1sIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5jc3M/YWNhOSIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9kb3duX2Fycm93LnN2ZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2NsZWFyLnN2ZyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF1RDtBQUN2RDs7QUFFQSw4QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJkYXRlcGlja2VyXCIsIFtcImFuZ3VsYXJcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZGF0ZXBpY2tlclwiXSA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImRhdGVwaWNrZXJcIl0gPSBmYWN0b3J5KHJvb3RbXCJhbmd1bGFyXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDEyNmFlOTEwODY1YWE1YWZhNTEzIiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlLmh0bWwnKTtcbnJlcXVpcmUoJy4vc3R5bGUuY3NzJyk7XG5cbmFuZ3VsYXIubW9kdWxlKCdkYXRlcGlja2VyJywgW10pLmNvbXBvbmVudCgnZGF0ZXBpY2tlcicsIHtcbiAgICAgICAgYmluZGluZ3M6IHtcbiAgICAgICAgICAgIGRhdGU6ICc9JyxcbiAgICAgICAgICAgIGRpc2FibGVkOiAnQCdcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoJHNjb3BlLCAkdGltZW91dCwgJGVsZW1lbnQsICRkb2N1bWVudCkge1xuXG4gICAgICAgICAgICBEYXRlLmlzTGVhcFllYXIgPSBmdW5jdGlvbiAoeWVhcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAoKCh5ZWFyICUgNCA9PT0gMCkgJiYgKHllYXIgJSAxMDAgIT09IDApKSB8fCAoeWVhciAlIDQwMCA9PT0gMCkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgRGF0ZS5nZXREYXlzSW5Nb250aCA9IGZ1bmN0aW9uICh5ZWFyLCBtb250aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbMzEsIChEYXRlLmlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4KSwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdW21vbnRoXTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIERhdGUucHJvdG90eXBlLmlzTGVhcFllYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGUuaXNMZWFwWWVhcih0aGlzLmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgRGF0ZS5wcm90b3R5cGUuZ2V0RGF5c0luTW9udGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGUuZ2V0RGF5c0luTW9udGgodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgRGF0ZS5wcm90b3R5cGUuYWRkTW9udGhzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSB0aGlzLmdldERhdGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGUoMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRNb250aCh0aGlzLmdldE1vbnRoKCkgKyB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRlKE1hdGgubWluKG4sIHRoaXMuZ2V0RGF5c0luTW9udGgoKSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgc2VsZi5zaG93X2NhbGVuZGFyID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLnRvZGF5ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHNlbGYudmlzaWJsZV9kYXRlID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgICAgc2VsZi5nZXRfY2FsZW5kYXJfZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9udGhzID0gW1xuICAgICAgICAgICAgICAgICAgICBcIkphbnVhcnlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJGZWJydWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICBcIk1hcmNoXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQXByaWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJNYXlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJKdW5lXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiSnVseVwiLFxuICAgICAgICAgICAgICAgICAgICBcIkF1Z3VzdFwiLFxuICAgICAgICAgICAgICAgICAgICBcIlNlcHRlbWJlclwiLFxuICAgICAgICAgICAgICAgICAgICBcIk9jdG9iZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJOb3ZlbWJlclwiLFxuICAgICAgICAgICAgICAgICAgICBcIkRlY2VtYmVyXCJcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIHJldHVybiBtb250aHNbc2VsZi52aXNpYmxlX2RhdGUuZ2V0TW9udGgoKV0gKyBcIiBcIiArIHNlbGYudmlzaWJsZV9kYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuZ2V0X21vbnRoX2RheXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZShzZWxmLnZpc2libGVfZGF0ZSk7XG4gICAgICAgICAgICAgICAgdmFyIGRheXNfbiA9IGQuZ2V0RGF5c0luTW9udGgoKTtcbiAgICAgICAgICAgICAgICB2YXIgZGF5cyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF5c19uOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZGF5cy5wdXNoKGkgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRheXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuZ2V0X2VtcHR5X2RheXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZShzZWxmLnZpc2libGVfZGF0ZSk7XG4gICAgICAgICAgICAgICAgZC5zZXREYXRlKDEpO1xuICAgICAgICAgICAgICAgIHZhciBkYXlzX24gPSBkLmdldERheSgpO1xuICAgICAgICAgICAgICAgIHZhciBkYXlzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXlzX247IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBkYXlzLnB1c2goaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLmlzX2RheV90b2RheSA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYudmlzaWJsZV9kYXRlLmdldE1vbnRoKCkgIT09IHNlbGYudG9kYXkuZ2V0TW9udGgoKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnZpc2libGVfZGF0ZS5nZXRGdWxsWWVhcigpICE9PSBzZWxmLnRvZGF5LmdldEZ1bGxZZWFyKCkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAobiAhPT0gc2VsZi50b2RheS5nZXREYXRlKCkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLmlzX2RheV9zZWxlY3RlZCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLmRhdGUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnZpc2libGVfZGF0ZS5nZXRNb250aCgpICE9PSBzZWxmLmRhdGUuZ2V0TW9udGgoKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnZpc2libGVfZGF0ZS5nZXRGdWxsWWVhcigpICE9PSBzZWxmLmRhdGUuZ2V0RnVsbFllYXIoKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChuICE9PSBzZWxmLmRhdGUuZ2V0RGF0ZSgpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kaXNhYmxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNlbGYuZGF0ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZF9kYXkgPSBudWxsO1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRfbW9udGggPSBudWxsO1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRfeWVhciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYub3Blbl9jYWxlbmRhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlzaWJsZV9kYXRlID0gbmV3IERhdGUoc2VsZi5kYXRlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnZpc2libGVfZGF0ZSA9IG5ldyBEYXRlKHNlbGYudG9kYXkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYuc2hvd19jYWxlbmRhciA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYudG9nZ2xlX2NhbGVuZGFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNob3dfY2FsZW5kYXIgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vcGVuX2NhbGVuZGFyKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93X2NhbGVuZGFyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLnNldF9kYXRlID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRlID0gbmV3IERhdGUoc2VsZi52aXNpYmxlX2RhdGUpO1xuICAgICAgICAgICAgICAgIHNlbGYuZGF0ZS5zZXREYXRlKG4pO1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvd19jYWxlbmRhciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLmNoYW5nZV9tb250aCA9IGZ1bmN0aW9uIChuKSB7XG4gICAgICAgICAgICAgICAgdmFyIG0gPSBzZWxmLnZpc2libGVfZGF0ZS5nZXRNb250aCgpO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gc2VsZi52aXNpYmxlX2RhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICAgICAgICAgIG0gKz0gbjtcblxuICAgICAgICAgICAgICAgIGlmIChtID4gMTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHkgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbSA9IDExO1xuICAgICAgICAgICAgICAgICAgICB5IC09IDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi52aXNpYmxlX2RhdGUuc2V0TW9udGgobSk7XG4gICAgICAgICAgICAgICAgc2VsZi52aXNpYmxlX2RhdGUuc2V0RnVsbFllYXIoeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYudXBkYXRlX3NlbGVjdGVkX2RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGVcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLnNlbGVjdGVkX21vbnRoICYmICFzZWxmLnNlbGVjdGVkX2RheSAmJiAhc2VsZi5zZWxlY3RlZF95ZWFyKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKCFzZWxmLmRhdGUpIHNlbGYuZGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBZZWFyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRfeWVhcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZF95ZWFyID4gOTk5OSkgc2VsZi5zZWxlY3RlZF95ZWFyID0gOTk5OTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRfeWVhciA8IDEpIHNlbGYuc2VsZWN0ZWRfeWVhciA9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZF95ZWFyID0gc2VsZi50b2RheS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIE1vbnRoXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRfbW9udGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRfbW9udGggPiAxMikgc2VsZi5zZWxlY3RlZF9tb250aCA9IDEyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZF9tb250aCA8IDEpIHNlbGYuc2VsZWN0ZWRfbW9udGggPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRfbW9udGggPSBzZWxmLnRvZGF5LmdldE1vbnRoKCkgKyAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIERhdGVcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZF9kYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBuZXcgRGF0ZShzZWxmLmRhdGUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkX2RheSA9IGQuZ2V0RGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBkLnNldE1vbnRoKHNlbGYuc2VsZWN0ZWRfbW9udGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoZC5nZXREYXRlKCkgIT0gb2xkX2RheSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLnNldERhdGUoMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1heCA9IGQuZ2V0RGF5c0luTW9udGgoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRfZGF5ID4gbWF4KSBzZWxmLnNlbGVjdGVkX2RheSA9IG1heDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWRfZGF5IDwgMSkgc2VsZi5zZWxlY3RlZF9kYXkgPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRfZGF5ID0gc2VsZi50b2RheS5nZXREYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIG1vZGVsXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRlLnNldEZ1bGxZZWFyKHNlbGYuc2VsZWN0ZWRfeWVhcik7XG4gICAgICAgICAgICAgICAgc2VsZi5kYXRlLnNldE1vbnRoKHNlbGYuc2VsZWN0ZWRfbW9udGggLSAxKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGUuc2V0RGF0ZShzZWxmLnNlbGVjdGVkX2RheSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnZpc2libGVfZGF0ZSA9IG5ldyBEYXRlKHNlbGYuZGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goJyRjdHJsLmRhdGUnLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkX2RheSA9IHNlbGYuZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRfbW9udGggPSBzZWxmLmRhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRfeWVhciA9IHNlbGYuZGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZGF0ZV9zZWxlY3RlZF9kYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goJyRjdHJsLnNob3dfY2FsZW5kYXInLCBmdW5jdGlvbiAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSAmJiBuZXdWYWx1ZSA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICRkb2N1bWVudC5iaW5kKCdjbGljaycsIG9uQ2xpY2spO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3VmFsdWUgIT09IG9sZFZhbHVlICYmIG5ld1ZhbHVlID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICRkb2N1bWVudC51bmJpbmQoJ2NsaWNrJywgb25DbGljayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBvbkNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGlzQ2hpbGQgPSAkZWxlbWVudFswXS5jb250YWlucyhldmVudC50YXJnZXQpO1xuICAgICAgICAgICAgICAgIHZhciBpc1NlbGYgPSAkZWxlbWVudFswXSA9PSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgdmFyIGlzSW5zaWRlID0gaXNDaGlsZCB8fCBpc1NlbGY7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0luc2lkZSkge1xuICAgICAgICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dfY2FsZW5kYXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG4gICAgLm5hbWU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYW5ndWxhclwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJkYXRlcGlja2VyLWNvbnRhaW5lclxcXCIgbmctY2xhc3M9XFxcInsgJ2Rpc2FibGVkJzogJGN0cmwuZGlzYWJsZWQgfVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImRhdGVwaWNrZXItaW5wdXRcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiZGF0ZXBpY2tlci1mYWtlLWlucHV0XFxcIiBuZy1jbGljaz1cXFwiJGN0cmwub3Blbl9jYWxlbmRhcigpXFxcIj5cXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBwbGFjZWhvbGRlcj1cXFwiTU1cXFwiIG1pbj1cXFwiMVxcXCIgbWF4PVxcXCIxMlxcXCIgbmctbW9kZWw9XFxcIiRjdHJsLnNlbGVjdGVkX21vbnRoXFxcIiBuZy1ibHVyPVxcXCIkY3RybC51cGRhdGVfc2VsZWN0ZWRfZGF0ZSgpXFxcIiBuZy1kaXNhYmxlZD1cXFwiJGN0cmwuZGlzYWJsZWRcXFwiIC8+IDxzcGFuPi88L3NwYW4+XFxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgcGxhY2Vob2xkZXI9XFxcIkREXFxcIiBtaW49XFxcIjFcXFwiIG1heD1cXFwiMzFcXFwiIG5nLW1vZGVsPVxcXCIkY3RybC5zZWxlY3RlZF9kYXlcXFwiIG5nLWJsdXI9XFxcIiRjdHJsLnVwZGF0ZV9zZWxlY3RlZF9kYXRlKClcXFwiIG5nLWRpc2FibGVkPVxcXCIkY3RybC5kaXNhYmxlZFxcXCIgLz4gPHNwYW4+Lzwvc3Bhbj5cXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBwbGFjZWhvbGRlcj1cXFwiWVlZWVxcXCIgbWluPVxcXCIxMDAwXFxcIiBtYXg9XFxcIjk5OTlcXFwiIG5nLW1vZGVsPVxcXCIkY3RybC5zZWxlY3RlZF95ZWFyXFxcIiBuZy1ibHVyPVxcXCIkY3RybC51cGRhdGVfc2VsZWN0ZWRfZGF0ZSgpXFxcIiBuZy1kaXNhYmxlZD1cXFwiJGN0cmwuZGlzYWJsZWRcXFwiIHN0eWxlPVxcXCJ3aWR0aDozZW07XFxcIi8+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJkYXRlcGlja2VyLWljb24gZGF0ZXBpY2tlci1pY29uLWFycm93XFxcIiBuZy1jbGljaz1cXFwiJGN0cmwudG9nZ2xlX2NhbGVuZGFyKClcXFwiPjwvc3Bhbj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJkYXRlcGlja2VyLWljb24gZGF0ZXBpY2tlci1pY29uLWNsZWFyXFxcIiBuZy1pZj1cXFwiJGN0cmwuZGF0ZSAmJiAhJGN0cmwuZGlzYWJsZWRcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbGVhcigpXFxcIj48L3NwYW4+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJkYXRlcGlja2VyLXBpY2tlclxcXCIgbmctc2hvdz1cXFwiJGN0cmwuc2hvd19jYWxlbmRhclxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkYXRlcGlja2VyLXNlbGVjdG9yXFxcIj5cXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XFxcImJ1dHRvblxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmNoYW5nZV9tb250aCgtMSlcXFwiIHN0eWxlPVxcXCJmbG9hdDpsZWZ0O1xcXCI+IMKrIDwvYnV0dG9uPlxcbiAgICAgICAgICAgIDxzcGFuPnt7JGN0cmwuZ2V0X2NhbGVuZGFyX2RhdGUoKX19PC9zcGFuPlxcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cXFwiYnV0dG9uXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2hhbmdlX21vbnRoKDEpXFxcIiBzdHlsZT1cXFwiZmxvYXQ6cmlnaHQ7XFxcIj4gwrsgPC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImRhdGVwaWNrZXItY2FsZW5kYXJcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImRhdGVwaWNrZXItZGF5IGRhdGVwaWNrZXItd2Vla2RheVxcXCI+U3U8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkYXRlcGlja2VyLWRheSBkYXRlcGlja2VyLXdlZWtkYXlcXFwiPk1vPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZGF0ZXBpY2tlci1kYXkgZGF0ZXBpY2tlci13ZWVrZGF5XFxcIj5UdTwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImRhdGVwaWNrZXItZGF5IGRhdGVwaWNrZXItd2Vla2RheVxcXCI+V2U8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkYXRlcGlja2VyLWRheSBkYXRlcGlja2VyLXdlZWtkYXlcXFwiPlRoPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZGF0ZXBpY2tlci1kYXkgZGF0ZXBpY2tlci13ZWVrZGF5XFxcIj5GcjwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImRhdGVwaWNrZXItZGF5IGRhdGVwaWNrZXItd2Vla2RheVxcXCI+U2E8L2Rpdj5cXG5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkYXRlcGlja2VyLWRheVxcXCIgbmctcmVwZWF0PVxcXCJkYXkgaW4gJGN0cmwuZ2V0X2VtcHR5X2RheXMoKVxcXCI+IDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImRhdGVwaWNrZXItZGF5IGRhdGVwaWNrZXItZGF0ZVxcXCIgbmctcmVwZWF0PVxcXCJkYXkgaW4gJGN0cmwuZ2V0X21vbnRoX2RheXMoKVxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLnNldF9kYXRlKGRheSlcXFwiIG5nLWNsYXNzPVxcXCJ7ICdkYXRlcGlja2VyLXRvZGF5JzogJGN0cmwuaXNfZGF5X3RvZGF5KGRheSksICdkYXRlcGlja2VyLXNlbGVjdGVkJzogJGN0cmwuaXNfZGF5X3NlbGVjdGVkKGRheSl9XFxcIj57e2RheX19PC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XFxuXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90ZW1wbGF0ZS5odG1sXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEhLi9zdHlsZS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzP3NvdXJjZU1hcCEhLi9zdHlsZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/c291cmNlTWFwISEuL3N0eWxlLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiZGF0ZXBpY2tlciB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiU2Vnb2UgVUkgTGlnaHRcXFwiLCBcXFwiU2Vnb2UgVUlcXFwiLCBTZWdvZSwgVGFob21hLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbn1cXG5cXG5kYXRlcGlja2VyICoge1xcbiAgICAvKi13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcXG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIHVzZXItc2VsZWN0OiBub25lOyovXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuZGF0ZXBpY2tlciAuZGF0ZXBpY2tlci1jb250YWluZXIuZGlzYWJsZWQsIGRhdGVwaWNrZXIgLmRhdGVwaWNrZXItY29udGFpbmVyLmRpc2FibGVkIC5kYXRlcGlja2VyLWlucHV0LCBkYXRlcGlja2VyIC5kYXRlcGlja2VyLWNvbnRhaW5lci5kaXNhYmxlZCAuZGF0ZXBpY2tlci1mYWtlLWlucHV0IGlucHV0IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ViZWJlNCAhaW1wb3J0YW50O1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWlucHV0IHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMzRweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgcGFkZGluZzogNnB4IDEycHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XFxuICAgIGNvbG9yOiByZ2IoNjgsIDY4LCA2OCk7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItZmFrZS1pbnB1dCBpbnB1dCB7XFxuICAgIHdpZHRoOiAyZW07XFxuICAgIGJvcmRlcjogMDtcXG4gICAgb3V0bGluZTogMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGNvbG9yOiByZ2IoNjgsIDY4LCA2OCk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWZha2UtaW5wdXQgaW5wdXQ6Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24sIGRhdGVwaWNrZXIgLmRhdGVwaWNrZXItZmFrZS1pbnB1dCBpbnB1dDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXG4gICAgbWFyZ2luOiAwO1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWZha2UtaW5wdXQgaW5wdXRbdHlwZT1udW1iZXJdIHtcXG4gICAgLW1vei1hcHBlYXJhbmNlOnRleHRmaWVsZDtcXG59XFxuXFxuZGF0ZXBpY2tlciAuZGF0ZXBpY2tlci1pY29uIHtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAyNHB4IDI0cHg7XFxuICAgIGhlaWdodDogMjRweDtcXG4gICAgd2lkdGg6IDI0cHg7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItaWNvbi1hcnJvdyB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA3cHg7XFxuICAgIHJpZ2h0OiA2cHg7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4vaW1hZ2VzL2Rvd25fYXJyb3cuc3ZnXCIpICsgXCIpO1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWljb24tY2xlYXIge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogN3B4O1xcbiAgICByaWdodDogMzBweDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyByZXF1aXJlKFwiLi9pbWFnZXMvY2xlYXIuc3ZnXCIpICsgXCIpO1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWljb24tY2xlYXI6aG92ZXIge1xcbiAgICBjb2xvcjogcmVkO1xcbn1cXG5cXG5kYXRlcGlja2VyOmhvdmVyIC5kYXRlcGlja2VyLWljb24tY2xlYXIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuZGF0ZXBpY2tlciAuZGF0ZXBpY2tlci1waWNrZXIge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDMzcHg7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwYWRkaW5nOiA2cHggMTJweDtcXG4gICAgbWF4LXdpZHRoOiAzMDBweDtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuZGF0ZXBpY2tlciAuZGF0ZXBpY2tlci1waWNrZXIgKntcXG4gICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIG91dGxpbmU6IDA7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItc2VsZWN0b3Ige1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIHBhZGRpbmc6IDAgMTJweDtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBjb2xvcjogcmdiKDY4LCA2OCwgNjgpO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wMWVtO1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLXNlbGVjdG9yIGJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICBvdXRsaW5lOiAwO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGNvbG9yOiByZ2IoNjgsIDY4LCA2OCk7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItY2FsZW5kYXIge1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtdGFibGU7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItZGF5IHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB3aWR0aDogMTQuMiU7XFxuICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDAuNWVtO1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWRhdGUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIGJvcmRlci13aWR0aDogaW5pdGlhbDtcXG4gICAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgICBib3JkZXItY29sb3I6IGluaXRpYWw7XFxuICAgIGJvcmRlci1pbWFnZTogaW5pdGlhbDtcXG4gICAgcGFkZGluZzogMC4yZW0gMC4zZW07XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBjb2xvcjogcmdiKDY4LCA2OCwgNjgpO1xcbiAgICBmb250LXdlaWdodDogMjAwO1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWRhdGU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjI4LCAyNDAsIDI1NSk7XFxuICAgIGNvbG9yOiByZ2IoNjgsIDY4LCA2OCk7XFxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLXRvZGF5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItc2VsZWN0ZWQsIGRhdGVwaWNrZXIgLmRhdGVwaWNrZXItc2VsZWN0ZWQ6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoOSwgOTksIDIwOSk7XFxuICAgIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICAgIHRleHQtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuNDk4MDM5KSAwcHggMXB4IDFweDtcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItd2Vla2RheSB7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIGZvbnQtc2l6ZTogMTBweDtcXG4gICAgY29sb3I6IHJnYig2OCwgNjgsIDY4KTtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSx1RkFBdUY7Q0FDMUY7O0FBRUQ7SUFDSTs7Ozs7d0JBS29CO0lBQ3BCLHVCQUF1QjtDQUMxQjs7QUFFRDtJQUNJLFlBQVk7SUFDWixtQkFBbUI7Q0FDdEI7O0FBRUQ7SUFDSSxxQ0FBcUM7Q0FDeEM7O0FBRUQ7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixrQkFBa0I7SUFDbEIsdUJBQXVCO0lBQ3ZCLGdCQUFnQjtJQUNoQix3QkFBd0I7SUFDeEIsdUJBQXVCO0NBQzFCOztBQUVEO0lBQ0ksV0FBVztJQUNYLFVBQVU7SUFDVixXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGdCQUFnQjtJQUNoQix1QkFBdUI7SUFDdkIsOEJBQThCO0NBQ2pDOztBQUVEO0lBQ0ksY0FBYztJQUNkLHlCQUF5QjtJQUN6QixVQUFVO0NBQ2I7O0FBRUQ7SUFDSSwwQkFBMEI7Q0FDN0I7O0FBRUQ7SUFDSSwyQkFBMkI7SUFDM0IsYUFBYTtJQUNiLFlBQVk7Q0FDZjs7QUFFRDtJQUNJLG1CQUFtQjtJQUNuQixTQUFTO0lBQ1QsV0FBVztJQUNYLGdCQUFnQjtJQUNoQiwwQ0FBeUM7Q0FDNUM7O0FBRUQ7SUFDSSxjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLFNBQVM7SUFDVCxZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLDBDQUFvQztDQUN2Qzs7QUFFRDtJQUNJLFdBQVc7Q0FDZDs7QUFFRDtJQUNJLGVBQWU7Q0FDbEI7O0FBRUQ7SUFDSSx1QkFBdUI7SUFDdkIsd0JBQXdCO0lBQ3hCLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1YsUUFBUTtJQUNSLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLFdBQVc7Q0FDZDs7QUFFRDtJQUNJLDRCQUE0QjtJQUM1QiwwQkFBMEI7SUFDMUIseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsa0JBQWtCO0lBQ2xCLFdBQVc7Q0FDZDs7QUFFRDtJQUNJLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2Qix1QkFBdUI7Q0FDMUI7O0FBRUQ7SUFDSSw4QkFBOEI7SUFDOUIsVUFBVTtJQUNWLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLHVCQUF1QjtDQUMxQjs7QUFFRDtJQUNJLGlCQUFpQjtJQUNqQixzQkFBc0I7Q0FDekI7O0FBRUQ7SUFDSSxzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsZUFBZTtDQUNsQjs7QUFFRDtJQUNJLDhCQUE4QjtJQUM5QixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLHNCQUFzQjtJQUN0QixxQkFBcUI7SUFDckIsWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixpQkFBaUI7Q0FDcEI7O0FBRUQ7SUFDSSxxQ0FBcUM7SUFDckMsdUJBQXVCO0lBQ3ZCLDJCQUEyQjtJQUMzQix3QkFBd0I7SUFDeEIsbUJBQW1CO0NBQ3RCOztBQUVEO0lBQ0ksdUJBQXVCO0lBQ3ZCLDJCQUEyQjtJQUMzQix3QkFBd0I7SUFDeEIsbUJBQW1CO0NBQ3RCOztBQUVEO0lBQ0ksa0NBQWtDO0lBQ2xDLDBCQUEwQjtJQUMxQixpREFBaUQ7SUFDakQsMkJBQTJCO0lBQzNCLHdCQUF3QjtJQUN4QixtQkFBbUI7Q0FDdEI7O0FBRUQ7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLHVCQUF1QjtDQUMxQlwiLFwiZmlsZVwiOlwic3R5bGUuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImRhdGVwaWNrZXIge1xcbiAgICBmb250LWZhbWlseTogXFxcIlNlZ29lIFVJIExpZ2h0XFxcIiwgXFxcIlNlZ29lIFVJXFxcIiwgU2Vnb2UsIFRhaG9tYSwgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG59XFxuXFxuZGF0ZXBpY2tlciAqIHtcXG4gICAgLyotd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XFxuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xcbiAgICB1c2VyLXNlbGVjdDogbm9uZTsqL1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItY29udGFpbmVyLmRpc2FibGVkLCBkYXRlcGlja2VyIC5kYXRlcGlja2VyLWNvbnRhaW5lci5kaXNhYmxlZCAuZGF0ZXBpY2tlci1pbnB1dCwgZGF0ZXBpY2tlciAuZGF0ZXBpY2tlci1jb250YWluZXIuZGlzYWJsZWQgLmRhdGVwaWNrZXItZmFrZS1pbnB1dCBpbnB1dCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlYmViZTQgIWltcG9ydGFudDtcXG59XFxuXFxuZGF0ZXBpY2tlciAuZGF0ZXBpY2tlci1pbnB1dCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDM0cHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICAgIHBhZGRpbmc6IDZweCAxMnB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjQyODU3MTQzO1xcbiAgICBjb2xvcjogcmdiKDY4LCA2OCwgNjgpO1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWZha2UtaW5wdXQgaW5wdXQge1xcbiAgICB3aWR0aDogMmVtO1xcbiAgICBib3JkZXI6IDA7XFxuICAgIG91dGxpbmU6IDA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBjb2xvcjogcmdiKDY4LCA2OCwgNjgpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG59XFxuXFxuZGF0ZXBpY2tlciAuZGF0ZXBpY2tlci1mYWtlLWlucHV0IGlucHV0Ojotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uLCBkYXRlcGlja2VyIC5kYXRlcGlja2VyLWZha2UtaW5wdXQgaW5wdXQ6Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxuICAgIG1hcmdpbjogMDtcXG59XFxuXFxuZGF0ZXBpY2tlciAuZGF0ZXBpY2tlci1mYWtlLWlucHV0IGlucHV0W3R5cGU9bnVtYmVyXSB7XFxuICAgIC1tb3otYXBwZWFyYW5jZTp0ZXh0ZmllbGQ7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItaWNvbiB7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMjRweCAyNHB4O1xcbiAgICBoZWlnaHQ6IDI0cHg7XFxuICAgIHdpZHRoOiAyNHB4O1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWljb24tYXJyb3cge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogN3B4O1xcbiAgICByaWdodDogNnB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJhY2tncm91bmQ6IHVybCgnaW1hZ2VzL2Rvd25fYXJyb3cuc3ZnJyk7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItaWNvbi1jbGVhciB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiA3cHg7XFxuICAgIHJpZ2h0OiAzMHB4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGJhY2tncm91bmQ6IHVybCgnaW1hZ2VzL2NsZWFyLnN2ZycpO1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWljb24tY2xlYXI6aG92ZXIge1xcbiAgICBjb2xvcjogcmVkO1xcbn1cXG5cXG5kYXRlcGlja2VyOmhvdmVyIC5kYXRlcGlja2VyLWljb24tY2xlYXIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuZGF0ZXBpY2tlciAuZGF0ZXBpY2tlci1waWNrZXIge1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDMzcHg7XFxuICAgIGxlZnQ6IDA7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBwYWRkaW5nOiA2cHggMTJweDtcXG4gICAgbWF4LXdpZHRoOiAzMDBweDtcXG4gICAgei1pbmRleDogMTtcXG59XFxuXFxuZGF0ZXBpY2tlciAuZGF0ZXBpY2tlci1waWNrZXIgKntcXG4gICAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xcbiAgICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAgIG91dGxpbmU6IDA7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItc2VsZWN0b3Ige1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICAgIHBhZGRpbmc6IDAgMTJweDtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBjb2xvcjogcmdiKDY4LCA2OCwgNjgpO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4wMWVtO1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLXNlbGVjdG9yIGJ1dHRvbiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICBvdXRsaW5lOiAwO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGNvbG9yOiByZ2IoNjgsIDY4LCA2OCk7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItY2FsZW5kYXIge1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtdGFibGU7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItZGF5IHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICB3aWR0aDogMTQuMiU7XFxuICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHBhZGRpbmc6IDAuNWVtO1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWRhdGUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIGJvcmRlci13aWR0aDogaW5pdGlhbDtcXG4gICAgYm9yZGVyLXN0eWxlOiBub25lO1xcbiAgICBib3JkZXItY29sb3I6IGluaXRpYWw7XFxuICAgIGJvcmRlci1pbWFnZTogaW5pdGlhbDtcXG4gICAgcGFkZGluZzogMC4yZW0gMC4zZW07XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBjb2xvcjogcmdiKDY4LCA2OCwgNjgpO1xcbiAgICBmb250LXdlaWdodDogMjAwO1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLWRhdGU6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjI4LCAyNDAsIDI1NSk7XFxuICAgIGNvbG9yOiByZ2IoNjgsIDY4LCA2OCk7XFxuICAgIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG5cXG5kYXRlcGlja2VyIC5kYXRlcGlja2VyLXRvZGF5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItc2VsZWN0ZWQsIGRhdGVwaWNrZXIgLmRhdGVwaWNrZXItc2VsZWN0ZWQ6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoOSwgOTksIDIwOSk7XFxuICAgIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxuICAgIHRleHQtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuNDk4MDM5KSAwcHggMXB4IDFweDtcXG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogNHB4O1xcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxufVxcblxcbmRhdGVwaWNrZXIgLmRhdGVwaWNrZXItd2Vla2RheSB7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIGZvbnQtc2l6ZTogMTBweDtcXG4gICAgY29sb3I6IHJnYig2OCwgNjgsIDY4KTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwid2VicGFjazovL1wifV0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlcj9zb3VyY2VNYXAhLi9zcmMvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5Qm1hV3hzUFNJak5EUTBORFEwSWlCb1pXbG5hSFE5SWpJMElpQjJhV1YzUW05NFBTSXdJREFnTWpRZ01qUWlJSGRwWkhSb1BTSXlOQ0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajRLSUNBZ0lEeHdZWFJvSUdROUlrMDNMalF4SURjdU9EUk1NVElnTVRJdU5ESnNOQzQxT1MwMExqVTRUREU0SURrdU1qVnNMVFlnTmkwMkxUWjZJaTgrQ2lBZ0lDQThjR0YwYUNCa1BTSk5NQzB1TnpWb01qUjJNalJJTUhvaUlHWnBiR3c5SW01dmJtVWlMejRLUEM5emRtYytcIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ltYWdlcy9kb3duX2Fycm93LnN2Z1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCbWFXeHNQU0lqTkRRME5EUTBJaUJvWldsbmFIUTlJakkwSWlCMmFXVjNRbTk0UFNJd0lEQWdNalFnTWpRaUlIZHBaSFJvUFNJeU5DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNEtJQ0FnSUR4d1lYUm9JR1E5SWsweE9TQTJMalF4VERFM0xqVTVJRFVnTVRJZ01UQXVOVGtnTmk0ME1TQTFJRFVnTmk0ME1TQXhNQzQxT1NBeE1pQTFJREUzTGpVNUlEWXVOREVnTVRrZ01USWdNVE11TkRFZ01UY3VOVGtnTVRrZ01Ua2dNVGN1TlRrZ01UTXVOREVnTVRKNklpOCtDaUFnSUNBOGNHRjBhQ0JrUFNKTk1DQXdhREkwZGpJMFNEQjZJaUJtYVd4c1BTSnViMjVsSWk4K0Nqd3ZjM1puUGc9PVwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW1hZ2VzL2NsZWFyLnN2Z1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=