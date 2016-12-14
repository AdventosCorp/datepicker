angular.module('datepicker', []).component('datepicker', {
        bindings: {
            date: '=',
            disabled: '@'
        },
        template: `
        <style>
            datepicker {
                font-family: "Segoe UI Light", "Segoe UI", Segoe, Tahoma, Helvetica, Arial, sans-serif;
            }

            datepicker *{
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                box-sizing: border-box;
            }

            datepicker .datepicker-container {
                width: 100%;
                position: relative;
            }

            datepicker .datepicker-container.disabled,
            datepicker .datepicker-container.disabled .datepicker-input,
            datepicker .datepicker-container.disabled .datepicker-fake-input input {
                background-color: #ebebe4 !important;
            }

            datepicker .datepicker-input {
                width: 100%;
                height: 34px;
                background-color: #fff;
                padding: 6px 12px;
                border: 1px solid #ccc;
                font-size: 14px;
                line-height: 1.42857143;
                color: #555;
            }

            datepicker .datepicker-fake-input input{
                width: 2em;
                border: 0;
                outline: 0;
                text-align: center;
                font-size: 14px;
            }

            datepicker .datepicker-fake-input input::-webkit-outer-spin-button,
            datepicker .datepicker-fake-input input::-webkit-inner-spin-button {
                display: none;
                -webkit-appearance: none;
                margin: 0;
            }

            datepicker .datepicker-icon {
                position: absolute;
                top: 7px;
                right: 12px;
                cursor: pointer;
            }

            datepicker .datepicker-icon-clear {
                display: none;
                position: absolute;
                top: 7px;
                right: 30px;
                cursor: pointer;
            }

            datepicker .datepicker-icon-clear:hover {
                color: red;
            }

            datepicker:hover .datepicker-icon-clear{
                display: block;
            }

            datepicker .datepicker-picker {
                border: 1px solid #ccc;
                background-color: white;
                position: absolute;
                top: 33px;
                left: 0;
                width: 100%;
                padding: 6px 12px;
            }

            datepicker .datepicker-selector{
                display: inline-block;
                text-align: center;
                width: 100%;
                font-weight: bold;
                padding: 0 12px;
            }

            datepicker .datepicker-selector button{
                background-color: transparent;
                border: 0;
                font-weight: bold;
                outline: 0;
                cursor: pointer;
            }

            datepicker .datepicker-calendar {
                margin-top: 10px;
                display: inline-table;
            }

            datepicker .datepicker-day {
                display: inline-block;
                width: 14.2%;
                line-height: 30px;
                text-align: center;
            }

            datepicker .datepicker-date {
                cursor: pointer;
            }

            datepicker .datepicker-date:hover {
                background-color: #337ab7;
                color: #fff;
            }

            datepicker .datepicker-today {
                background-color: #eee;
            }

            datepicker .datepicker-selected {
                background-color: #2d679a !important;
                color: #fff;
            }

            datepicker .datepicker-weekday {
                font-weight: bold;
            }
        </style>

        <div class="datepicker-container" ng-class="{ 'disabled': $ctrl.disabled }">
            <div class="datepicker-input">
                <div class="datepicker-fake-input">
                    <input type="number" placeholder="MM" ng-model="$ctrl.selected_month" ng-blur="$ctrl.update_selected_date()" ng-disabled="$ctrl.disabled" /> <span>/</span>
                    <input type="number" placeholder="DD" ng-model="$ctrl.selected_day" ng-blur="$ctrl.update_selected_date()" ng-disabled="$ctrl.disabled" /> <span>/</span>
                    <input type="number" placeholder="YYYY" ng-model="$ctrl.selected_year" ng-blur="$ctrl.update_selected_date()" ng-disabled="$ctrl.disabled" style="width:3em;"/>
                </div>
                <span class="datepicker-icon" ng-click="$ctrl.toggle_calendar()">▼</span>
                <span class="datepicker-icon-clear" ng-if="$ctrl.date && !$ctrl.disabled" ng-click="$ctrl.clear()">x</span>
            </div>
            <div class="datepicker-picker" ng-show="$ctrl.show_calendar">
                <div class="datepicker-selector">
                    <button type="button" ng-click="$ctrl.change_month(-1)" style="float:left;"> « </button>
                    <span>{{$ctrl.get_calendar_date()}}</span>
                    <button type="button" ng-click="$ctrl.change_month(1)" style="float:right;"> » </button>
                </div>

                <div class="datepicker-calendar">
                    <div class="datepicker-day datepicker-weekday">Su</div>
                    <div class="datepicker-day datepicker-weekday">Mo</div>
                    <div class="datepicker-day datepicker-weekday">Tu</div>
                    <div class="datepicker-day datepicker-weekday">We</div>
                    <div class="datepicker-day datepicker-weekday">Th</div>
                    <div class="datepicker-day datepicker-weekday">Fr</div>
                    <div class="datepicker-day datepicker-weekday">Sa</div>

                    <div class="datepicker-day" ng-repeat="day in $ctrl.get_empty_days()"> </div>
                    <div class="datepicker-day datepicker-date" ng-repeat="day in $ctrl.get_month_days()" ng-click="$ctrl.set_date(day)" ng-class="{ 'datepicker-today': $ctrl.is_day_today(day), 'datepicker-selected': $ctrl.is_day_selected(day)}">{{day}}</div>
                </div>
            </div>
        </div>
        `,
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
                    self.selected_month = self.today.getMonth();
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
