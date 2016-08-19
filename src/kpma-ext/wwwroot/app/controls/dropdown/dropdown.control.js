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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
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
        this.termInput = new forms_1.FormControl();
        this.doEmit = false;
        this.minTerm = 3;
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
            else if (this.items && (!this.selectedItem || this.selectedItem.id != this.value)) {
                this.selectValue(this.value);
            }
            else if (this.itemType && (!this.selectedItem || this.selectedItem.id != this.value)) {
                this.requestValue(this.value);
            }
        }
        if (changes['Items'] && this.items && this.value) {
            this.selectValue(this.value);
        }
        if (this.itemType == 'Enum' && this.term) {
            this.selSrv.getSelectList(this.itemType, this.parentId, this.term).subscribe(function (result) { return _this.LazyItems = result; }, function (error) { return console.log(error); }, function () { });
        }
        else if (this.itemType) {
            this.LazyQuery = this.termInput.valueChanges
                .filter(function (term) { return _this.termFilter(term); })
                .distinctUntilChanged()
                .switchMap(function (term) { return _this.selSrv.getSelectList(_this.itemType, _this.parentId, term); })
                .subscribe(function (result) { return _this.LazyItems = result; }, function (error) { return console.log(error); }, function () { });
            if (this.value) {
                this.requestValue(this.value);
            }
        }
        if (this.items && this.itemType) {
            this.LazyQuery = null;
            throw ("Нельзя устанавливать одновременно параметр items и itemType!");
        }
        if (this.items && changes['minTerm']) {
            throw ("Параметр minTerm используется только совместно с параметром itemType!");
        }
    };
    DropDown.prototype.termFilter = function (term) {
        if (this.minTerm == 0) {
            return true;
        }
        if (this.itemType == 'Enum') {
            return true;
        }
        return (!this.items) && (this.itemType) && (this.minTerm > 0) && term.length >= this.minTerm;
    };
    DropDown.prototype.writeValue = function (val) {
        this.value = val;
        if (this.items) {
            if (this.value) {
                this.selectValue(this.value);
            }
            else {
                this.selectedItem = null;
            }
        }
        else if (this.itemType) {
            if (this.value) {
                this.requestValue(this.value);
            }
            else {
                this.selectedItem = null;
            }
        }
    };
    DropDown.prototype.selectValue = function (val) {
        var f = this.items.filter(function (m) { return m.id == val; });
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
            this.selSrv.getSelectItemId(this.itemType, val).subscribe(function (result) {
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
        if (this.items) {
            return false;
        }
        if (this.itemType && this.itemType != 'Enum' && this.minTerm > 0 && this.searchValue.length < this.minTerm) {
            return this.showDropDown;
        }
        return false;
    };
    DropDown.prototype.showHide = function () {
        this.showDropDown = !this.showDropDown;
        if (!this.showDropDown) {
            this.searchValue = '';
            if (this.minTerm > 0) {
                this.LazyItems = [];
            }
        }
    };
    DropDown.prototype.hideForm = function () {
        this.searchValue = '';
        this.showDropDown = false;
        this.hoverItem = undefined;
    };
    DropDown.prototype.onSelectItem = function (i) {
        this.selectedItem = i;
        this.hideForm();
        this.doEmit = true;
        this.valueChange.emit(i.id);
    };
    DropDown.prototype.onHoverItem = function (i) {
        this.hoverItem = i;
    };
    DropDown.prototype.clearSelect = function () {
        this.selectedItem = null;
        this.hideForm();
        this.doEmit = true;
        this.valueChange.emit(null);
    };
    DropDown.prototype.onKeyDown = function (event) {
        if (this.showDropDown) {
            switch (event.keyCode) {
                case 13:
                    this.hoverSelect();
                    break;
                case 27:
                    this.hideForm();
                    break;
                case 38:
                    this.hoverUp();
                    break;
                case 40:
                    this.hoverDown();
                    break;
            }
        }
    };
    DropDown.prototype.hoverUp = function () {
        if (this.itemType) {
            if (!this.hoverItem) {
                return;
            }
            var i = this.LazyItems.indexOf(this.hoverItem);
            if (i > 0) {
                this.hoverItem = this.LazyItems[i - 1];
            }
        }
    };
    DropDown.prototype.hoverDown = function () {
        if (this.itemType) {
            if (!this.hoverItem) {
                this.hoverItem = this.LazyItems[0];
            }
            else {
                var i = this.LazyItems.indexOf(this.hoverItem);
                if (i < this.LazyItems.length - 1) {
                    this.hoverItem = this.LazyItems[i + 1];
                }
            }
        }
    };
    DropDown.prototype.hoverSelect = function () {
        if (this.hoverItem && this.showDropDown) {
            this.onSelectItem(this.hoverItem);
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
    ], DropDown.prototype, "items", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DropDown.prototype, "itemType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DropDown.prototype, "minTerm", void 0);
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
            directives: [common_1.CORE_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES],
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
var CUSTOM_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return DropDownVA; }), multi: true });
var DropDownVA = (function () {
    function DropDownVA(host) {
        this.host = host;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    DropDownVA.prototype.writeValue = function (value) {
        this.host.writeValue(value);
    };
    DropDownVA.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    DropDownVA.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    DropDownVA = __decorate([
        core_1.Directive({
            selector: 'dropdown',
            host: { '(valueChange)': 'onChange($event)' },
            providers: [CUSTOM_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [DropDown])
    ], DropDownVA);
    return DropDownVA;
}());
exports.DropDownVA = DropDownVA;
//# sourceMappingURL=dropdown.control.js.map