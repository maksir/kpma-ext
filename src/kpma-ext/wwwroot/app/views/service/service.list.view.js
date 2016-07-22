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
var service_service_1 = require('../../services/service.service');
var ServiceList = (function () {
    function ServiceList(srvSrv) {
        this.srvSrv = srvSrv;
        this.list = [];
        this.addModel = new service_service_1.ServiceModel();
    }
    ServiceList.prototype.ngOnInit = function () {
        this.refreshList();
    };
    ServiceList.prototype.refreshList = function () {
        var _this = this;
        this.srvSrv.getList().subscribe(function (res) { return _this.list = res; }, function (err) { return console.log(err); });
    };
    ServiceList.prototype.onEdit = function (s) {
        this.editModel = s;
    };
    ServiceList.prototype.onDelete = function (s) {
        var _this = this;
        if (!s) {
            return;
        }
        this.editModel = undefined;
        this.srvSrv.deleteModel(s.id).subscribe(function (res) { return _this.refreshList(); }, function (err) { return console.log(err); });
    };
    ServiceList.prototype.onCancel = function () {
        this.editModel = undefined;
    };
    ServiceList.prototype.onUpdate = function () {
        var _this = this;
        if (!this.editModel) {
            return;
        }
        this.srvSrv.saveModel(this.editModel).subscribe(function (res) {
            _this.editModel = undefined;
            _this.refreshList();
        }, function (err) { return console.log(err); });
    };
    ServiceList.prototype.onAdd = function () {
        var _this = this;
        if (!this.addModel.name) {
            return;
        }
        this.srvSrv.saveModel(this.addModel).subscribe(function (res) {
            _this.addModel = new service_service_1.ServiceModel();
            _this.refreshList();
        }, function (err) { return console.log(err); });
    };
    ServiceList = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'service-list',
            templateUrl: 'service.list.html',
            directives: [common_1.CORE_DIRECTIVES],
            providers: [service_service_1.ServiceService]
        }), 
        __metadata('design:paramtypes', [service_service_1.ServiceService])
    ], ServiceList);
    return ServiceList;
}());
exports.ServiceList = ServiceList;
//# sourceMappingURL=service.list.view.js.map