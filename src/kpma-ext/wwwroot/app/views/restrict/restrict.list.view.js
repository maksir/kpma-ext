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
var restrict_service_1 = require('../../services/restrict.service');
var metaobject_service_1 = require('../../services/metaobject.service');
var dropdown_control_1 = require('../../controls/dropdown/dropdown.control');
var RestrictList = (function () {
    function RestrictList(resSrv, moSrv) {
        this.resSrv = resSrv;
        this.moSrv = moSrv;
        this.list = [];
        this.addRestrictModel = new restrict_service_1.DataRestrictViewModel();
        this.addMetaObjectModel = new metaobject_service_1.MetaObjectDataModel();
    }
    Object.defineProperty(RestrictList.prototype, "selectedContrId", {
        get: function () {
            return this._selectedContrId;
        },
        set: function (value) {
            if (this._selectedContrId != value) {
                this._selectedContrId = value;
                this.refreshList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RestrictList.prototype, "selectedDepId", {
        get: function () {
            return this._selectedDepId;
        },
        set: function (value) {
            if (this._selectedDepId != value) {
                this._selectedDepId = value;
                this.refreshList();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RestrictList.prototype, "selectedMoId", {
        get: function () {
            return this._selectedMoId;
        },
        set: function (value) {
            if (this._selectedMoId != value) {
                this._selectedMoId = value;
                this.refreshList();
            }
        },
        enumerable: true,
        configurable: true
    });
    RestrictList.prototype.ngOnInit = function () {
        this.refreshList();
    };
    RestrictList.prototype.refreshList = function () {
        var _this = this;
        this.resSrv.getList(this.selectedContrId, this.selectedDepId, this.selectedMoId).subscribe(function (res) { return _this.list = res; }, function (err) { return console.log(err); });
    };
    RestrictList.prototype.onAddMetaObjectChanged = function (metaObjectId) {
        var _this = this;
        if (metaObjectId) {
            this.moSrv.getModel(metaObjectId).subscribe(function (res) { return _this.addMetaObjectModel = res; }, function (err) { return console.log(err); });
        }
        else {
            this.addMetaObjectModel = new metaobject_service_1.MetaObjectDataModel();
        }
    };
    RestrictList.prototype.onAdd = function () {
        var _this = this;
        if (!this.addRestrictModel.departmentId || !this.addRestrictModel.metaObjectId || !this.addRestrictModel.objectId) {
            return;
        }
        this.resSrv.saveModel(this.addRestrictModel).subscribe(function (res) { return _this.refreshList(); }, function (err) { return console.log(err); });
    };
    RestrictList.prototype.onDelete = function (item) {
        var _this = this;
        if (!item) {
            return;
        }
        this.resSrv.deleteModel(item).subscribe(function (res) { return _this.refreshList(); }, function (err) { return console.log(err); });
    };
    RestrictList = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'restrict-list',
            templateUrl: 'restrict.list.html',
            directives: [common_1.CORE_DIRECTIVES, dropdown_control_1.DropDown, dropdown_control_1.DropDownVA],
            providers: [restrict_service_1.RestrictService, metaobject_service_1.MetaObjectService]
        }), 
        __metadata('design:paramtypes', [restrict_service_1.RestrictService, metaobject_service_1.MetaObjectService])
    ], RestrictList);
    return RestrictList;
}());
exports.RestrictList = RestrictList;
//# sourceMappingURL=restrict.list.view.js.map