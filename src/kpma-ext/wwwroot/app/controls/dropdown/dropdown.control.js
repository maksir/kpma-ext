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
var common_1 = require("@angular/common");
require('rxjs/Rx');
var select_service_1 = require('../../services/select.service');
var search_pipe_1 = require('../../pipes/search.pipe');
var DropDownItem = (function () {
    function DropDownItem(id, text) {
        this.id = id;
        this.text = text;
    }
    return DropDownItem;
}());
exports.DropDownItem = DropDownItem;
var DropDown = (function () {
    function DropDown(element, selSrv) {
        this.element = element;
        this.selSrv = selSrv;
        this.placeholder = 'Значение не выбрано...';
        this.showDropDown = false;
        this.searchValue = '';
        this.termInput = new common_1.Control();
        this.doEmit = false;
        this.MinTerm = 3;
        this.disabled = false;
        this.allowClear = false;
        this.valueChange = new core_1.EventEmitter();
    }
    DropDown.prototype.ngAfterContentInit = function () {
    };
    DropDown.prototype.ngAfterViewInit = function () {
    };
    DropDown.prototype.ngAfterViewChecked = function () {
        if (this.showDropDown && this.input) {
            this.input.nativeElement.focus(true);
        }
    };
    DropDown.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['value']) {
            if (this.doEmit) {
                this.doEmit = false;
            }
            else if (this.Items && (!this.selectedItem || this.selectedItem.id != this.value)) {
                this.selectValue(this.value);
            }
            else if (this.ItemType && (!this.selectedItem || this.selectedItem.id != this.value)) {
                this.requestValue(this.value);
            }
        }
        if (changes['Items'] && this.Items && this.value) {
            this.selectValue(this.value);
        }
        if (this.ItemType == 'Enum' && this.term) {
            this.selSrv.getSelectList(this.ItemType, this.parentId, this.term).subscribe(function (result) { return _this.LazyItems = result; }, function (error) { return console.log(error); }, function () { });
        }
        else if (this.ItemType) {
            this.LazyQuery = this.termInput.valueChanges
                .filter(function (term) { return _this.termFilter(term); })
                .distinctUntilChanged()
                .switchMap(function (term) { return _this.selSrv.getSelectList(_this.ItemType, _this.parentId, term); })
                .subscribe(function (result) { return _this.LazyItems = result; }, function (error) { return console.log(error); }, function () { });
            if (this.value) {
                this.requestValue(this.value);
            }
        }
        if (this.Items && this.ItemType) {
            this.LazyQuery = null;
            throw ("Нельзя устанавливать одновременно параметр Item и ItemType!");
        }
        if (this.Items && changes['MinTerm']) {
            throw ("Параметр MinTerm используется только совместно с параметром ItemType!");
        }
    };
    DropDown.prototype.termFilter = function (term) {
        if (this.MinTerm == 0) {
            return true;
        }
        if (this.ItemType == 'Enum') {
            return true;
        }
        return (!this.Items) && (this.ItemType) && (this.MinTerm) && term.length >= this.MinTerm;
    };
    DropDown.prototype.writeValue = function (val) {
        this.value = val;
        if (this.Items) {
            if (this.value) {
                this.selectValue(this.value);
            }
            else {
                this.selectedItem = null;
            }
        }
        else if (this.ItemType) {
            if (this.value) {
                this.requestValue(this.value);
            }
            else {
                this.selectedItem = null;
            }
        }
    };
    DropDown.prototype.selectValue = function (val) {
        var f = this.Items.filter(function (m) { return m.id == val; });
        if (f[0]) {
            this.selectedItem = f[0];
            this.value = val;
        }
        else {
            this.selectedItem = null;
        }
    };
    DropDown.prototype.requestValue = function (val) {
        var _this = this;
        if (val) {
            this.selSrv.getSelectItemId(this.ItemType, val).subscribe(function (result) {
                if (result) {
                    _this.value = val;
                    _this.selectedItem = result[0];
                }
            }, function (error) { return console.log(error); });
        }
    };
    DropDown.prototype.getItemText = function (item) {
        if (!this.searchValue) {
            return item.text;
        }
        if (this.searchValue.length > 0) {
            var ilower = item.text.toLowerCase();
            var slower = this.searchValue.toLowerCase();
            var result = '';
            var start = 0;
            var end = 0;
            var count = this.searchValue.length;
            while (true) {
                end = ilower.indexOf(slower, start);
                if (end < 0) {
                    result += item.text.substring(start);
                    break;
                }
                else {
                    result += (item.text.substring(start, end) + '<u class="bg-info">' + item.text.substring(end, end + count) + '</u>');
                    start = end + count;
                }
            }
            return result; //item.text.replace(this.searchValue, "<span class='bg-info'>" + this.searchValue + "</span>");
        }
    };
    DropDown.prototype.showHelpText = function () {
        if (this.Items) {
            return false;
        }
        if (this.ItemType && this.ItemType != 'Enum' && this.searchValue.length < this.MinTerm) {
            return this.showDropDown;
        }
        return false;
    };
    DropDown.prototype.showHide = function () {
        this.showDropDown = !this.showDropDown;
        if (!this.showDropDown) {
            this.searchValue = '';
            this.LazyItems = [];
        }
    };
    DropDown.prototype.hideForm = function () {
        this.searchValue = '';
        this.showDropDown = false;
    };
    DropDown.prototype.onSelectItem = function (i) {
        this.selectedItem = i;
        this.hideForm();
        this.doEmit = true;
        this.valueChange.emit(i.id);
    };
    DropDown.prototype.clearSelect = function () {
        this.selectedItem = null;
        this.hideForm();
        this.doEmit = true;
        this.valueChange.emit(null);
    };
    DropDown.prototype.onKeyDown = function (event) {
        if (this.showDropDown && event.keyCode == 27) {
            this.hideForm();
        }
    };
    DropDown.prototype.trackEvent = function ($event) {
        if (this.showDropDown && !this.eventTriggeredInsideHost($event)) {
            this.hideForm();
        }
    };
    DropDown.prototype.eventTriggeredInsideHost = function (event) {
        var current = event.target;
        var host = this.element.nativeElement;
        do {
            if (current === host) {
                return true;
            }
            if (current && current.className && current.className.indexOf('buttondown') >= 0) {
                return true;
            }
            current = current.parentNode;
        } while (current);
        return (false);
    };
    __decorate([
        core_1.ViewChild('input'), 
        __metadata('design:type', core_1.ElementRef)
    ], DropDown.prototype, "input", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DropDown.prototype, "Items", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DropDown.prototype, "ItemType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DropDown.prototype, "MinTerm", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DropDown.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DropDown.prototype, "allowClear", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DropDown.prototype, "parentId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DropDown.prototype, "term", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DropDown.prototype, "value", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DropDown.prototype, "valueChange", void 0);
    DropDown = __decorate([
        core_1.Component({
            selector: 'dropdown',
            moduleId: module.id,
            templateUrl: 'dropdown.html',
            styleUrls: ['dropdown.css'],
            pipes: [search_pipe_1.SearchPipe],
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            host: {
                "(document: click)": "trackEvent($event)",
                "(document: keydown)": "onKeyDown($event)"
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, select_service_1.SelectService])
    ], DropDown);
    return DropDown;
}());
exports.DropDown = DropDown;
var CUSTOM_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return DropdownValueAccessor; }), multi: true });
var DropdownValueAccessor = (function () {
    function DropdownValueAccessor(host) {
        this.host = host;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    DropdownValueAccessor.prototype.writeValue = function (value) {
        this.host.writeValue(value);
    };
    DropdownValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    DropdownValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    DropdownValueAccessor = __decorate([
        core_1.Directive({
            selector: 'dropdown',
            host: { '(valueChange)': 'onChange($event)' },
            providers: [CUSTOM_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [DropDown])
    ], DropdownValueAccessor);
    return DropdownValueAccessor;
}());
exports.DropdownValueAccessor = DropdownValueAccessor;
//# sourceMappingURL=dropdown.control.js.map