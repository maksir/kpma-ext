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
//import {ROUTER_DIRECTIVES} from '@angular/router';
var docprop_service_1 = require('../../services/docprop.service');
var dropdown_control_1 = require('../../controls/dropdown/dropdown.control');
var DocPropList = (function () {
    function DocPropList(propSrv) {
        this.propSrv = propSrv;
        this.propList = [];
        this.addPropModel = new docprop_service_1.DocPropViewModel();
        this.fieldList = [];
    }
    DocPropList.prototype.ngOnInit = function () {
        this.refreshPropList();
    };
    DocPropList.prototype.refreshPropList = function () {
        var _this = this;
        this.propSrv.getPropList().subscribe(function (res) {
            _this.propList = res;
            _this.refreshFieldList();
            if (_this.selectedPropModel) {
                var ff = _this.propList.find(function (f) { return f.id == _this.selectedPropModel.id; });
                if (ff) {
                    _this.selectedPropModel = ff;
                }
            }
        }, function (err) { return console.log(err); });
    };
    DocPropList.prototype.onSelectProp = function (prop) {
        this.selectedPropModel = prop;
        this.refreshFieldList();
    };
    DocPropList.prototype.onDocGroupChange = function () {
        this.addPropModel.documentTypeId = undefined;
    };
    DocPropList.prototype.onAddProp = function () {
        var _this = this;
        if (!this.addPropModel.documentGroupId) {
            return;
        }
        this.propSrv.savePropModel(this.addPropModel).subscribe(function (res) {
            _this.selectedPropModel = res;
            _this.refreshPropList();
        }, function (err) { return console.log(err); });
    };
    DocPropList.prototype.onEditProp = function (prop) {
        this.selectedPropModel = prop;
        this.editPropModel = prop;
        this.refreshFieldList();
    };
    DocPropList.prototype.onDeleteProp = function (prop) {
        var _this = this;
        if (confirm('Удалить настройку?')) {
            this.propSrv.deletePropModel(prop.id).subscribe(function (res) {
                _this.selectedPropModel = undefined;
                _this.refreshPropList();
            }, function (err) { return console.log(err); });
        }
    };
    DocPropList.prototype.onCancelProp = function () {
        this.editPropModel = undefined;
    };
    DocPropList.prototype.onUpdateProp = function () {
        var _this = this;
        if (this.editPropModel) {
            this.propSrv.savePropModel(this.editPropModel).subscribe(function (res) {
                _this.saveFieldList();
            }, function (err) { return console.log(err); });
        }
    };
    DocPropList.prototype.saveFieldList = function () {
        var _this = this;
        this.propSrv.saveFieldModel(this.fieldList).subscribe(function (res) {
            _this.editPropModel = undefined;
            _this.refreshFieldList();
        }, function (err) { return console.log(err); });
    };
    DocPropList.prototype.refreshFieldList = function () {
        var _this = this;
        if (!this.selectedPropModel) {
            this.fieldList = [];
            return;
        }
        this.propSrv.getFieldList(this.selectedPropModel.id).subscribe(function (res) {
            _this.fieldList = res;
        }, function (err) { return console.log(err); });
    };
    DocPropList = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'docprop-list',
            templateUrl: 'docprop.list.html',
            directives: [common_1.CORE_DIRECTIVES, dropdown_control_1.DropDown, dropdown_control_1.DropDownVA],
            providers: [docprop_service_1.DocPropService]
        }), 
        __metadata('design:paramtypes', [docprop_service_1.DocPropService])
    ], DocPropList);
    return DocPropList;
}());
exports.DocPropList = DocPropList;
//# sourceMappingURL=docprop.list.view.js.map