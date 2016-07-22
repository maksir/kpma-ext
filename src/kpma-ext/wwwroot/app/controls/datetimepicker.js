/// <reference path="../../../typings/moment/moment.d.ts" />
/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/bootstrap.v3.datetimepicker/bootstrap.v3.datetimepicker.d.ts" />
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
//import 'rxjs/Rx';
var CUSTOM_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return DateTimePicker; }), multi: true });
var DateTimePicker = (function () {
    function DateTimePicker() {
        this.disabled = false;
        this.valueChange = new core_1.EventEmitter();
        this.doEvent = true;
        this.i9d = false;
        this.dpShow = false;
        // функционал ngModel
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    DateTimePicker.prototype.ngAfterViewInit = function () {
        if (!this.i9d) {
            this._input = $(this.input.nativeElement);
            this._group = $(this.group.nativeElement);
            this._group.datetimepicker(this.options);
            if (this.value) {
                this._group.data('DateTimePicker').date(this.value);
            }
            this._group.on('dp.change', this.onValueChange.bind(this));
            this._group.on('dp.show', this.onShownCalendar.bind(this));
            this._group.on('dp.hide', this.onHideCalendar.bind(this));
            this.i9d = true;
        }
    };
    DateTimePicker.prototype.ngOnDestroy = function () {
        if (this._group.data('DateTimePicker')) {
            this._group.data('DateTimePicker').destroy();
        }
    };
    DateTimePicker.prototype.ngOnChanges = function (changes) {
        if (changes['value']) {
            var _newVal = changes['value'].currentValue;
            if (this.i9d && !this.dpShow) {
                this.doEvent = false;
                this._group.data('DateTimePicker').date(_newVal);
                this.doEvent = true;
            }
        }
        if (changes['disabled']) {
            if (!this.disabled && this.i9d) {
                this._group.data('DateTimePicker').enable();
            }
        }
    };
    DateTimePicker.prototype.onShownCalendar = function ($event) {
        this.dpShow = true;
    };
    DateTimePicker.prototype.onHideCalendar = function ($event) {
        this.dpShow = false;
    };
    DateTimePicker.prototype.onValueChange = function ($event) {
        if (!this.i9d) {
            return;
        }
        if (this.doEvent) {
            var moment_1 = this._group.data('DateTimePicker').date();
            if (moment_1) {
                var ret = moment_1.format('DD.MM.YYYY HH:mm:ss');
                this.valueChange.emit(ret);
                this.onChange(ret);
            }
            else {
                this.valueChange.emit(undefined);
                this.onChange(undefined);
            }
        }
    };
    DateTimePicker.prototype.MomentToDate = function (m) {
        return new Date(m.year(), m.month(), m.date(), m.hours(), m.minutes(), m.seconds());
    };
    DateTimePicker.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    DateTimePicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    DateTimePicker.prototype.writeValue = function (val) {
        this.value = val;
    };
    __decorate([
        core_1.ViewChild('group'), 
        __metadata('design:type', core_1.ElementRef)
    ], DateTimePicker.prototype, "group", void 0);
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], DateTimePicker.prototype, "input", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DateTimePicker.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DateTimePicker.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DateTimePicker.prototype, "disabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DateTimePicker.prototype, "valueChange", void 0);
    DateTimePicker = __decorate([
        core_1.Component({
            selector: 'date-time',
            template: "\n\t\t<div #group class='input-group date'>\n\t\t\t<input #input [disabled]=\"disabled\" (focus)=\"onTouched()\" type='text' class=\"form-control\" />\n\t\t\t<span class=\"input-group-addon\">\n\t\t\t\t<span class=\"fa fa-calendar\"></span>\n\t\t\t</span>\n\t\t</div>",
            providers: [CUSTOM_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], DateTimePicker);
    return DateTimePicker;
}());
exports.DateTimePicker = DateTimePicker;
//@Directive({
//	selector: 'date-time',
//	host: { '(valueChange)': 'onChange($event)' },
//	providers: [CUSTOM_VALUE_ACCESSOR]
//})
//export class DateTimeVA implements ControlValueAccessor {
//	onChange = (_) => { };
//	onTouched = () => { };
//	constructor(private host: DateTimePicker) {
//	}
//	writeValue(value: any): void {
//		this.host.value = value;
//	}
//	registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
//	registerOnTouched(fn: () => void): void { this.onTouched = fn; }
//} 
//# sourceMappingURL=datetimepicker.js.map