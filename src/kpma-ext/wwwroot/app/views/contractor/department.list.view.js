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
var contractor_service_1 = require('../../services/contractor.service');
var main_component_1 = require('../../main.component');
var shadowbox_component_1 = require('../../components/shadowbox.component');
var DepartmentList = (function () {
    function DepartmentList(contrSrv, mainCmp) {
        this.contrSrv = contrSrv;
        this.mainCmp = mainCmp;
        this.list = [];
        this.addModel = new contractor_service_1.DepartmentModel();
        this.freeze = false;
    }
    DepartmentList.prototype.ngOnInit = function () {
        this.refreshList();
    };
    DepartmentList.prototype.refreshList = function () {
        var _this = this;
        if (!this.contId) {
            this.list = [];
        }
        else {
            this.freeze = true;
            this.contrSrv.getDepList(this.contId).subscribe(function (res) {
                _this.list = res;
            }, function (err) {
                _this.mainCmp.showError(err);
            }, function () {
                _this.freeze = false;
            });
        }
    };
    DepartmentList.prototype.onEdit = function (s) {
        this.editModel = s;
    };
    DepartmentList.prototype.onDelete = function (s) {
        var _this = this;
        if (!s) {
            return;
        }
        this.editModel = undefined;
        this.mainCmp.showQuestion('Удалить службу: <strong>' + s.name + '</strong> ?').subscribe(function (answer) {
            if (answer) {
                _this.contrSrv.deleteDepModel(s.id).subscribe(function (res) {
                    _this.refreshList();
                }, function (err) {
                    _this.mainCmp.showError(err);
                });
            }
            else {
                return;
            }
        });
    };
    DepartmentList.prototype.onCancel = function () {
        this.editModel = undefined;
    };
    DepartmentList.prototype.onUpdate = function () {
        var _this = this;
        if (!this.editModel) {
            return;
        }
        this.freeze = true;
        this.contrSrv.saveDepModel(this.editModel).subscribe(function (res) {
            _this.editModel = undefined;
            _this.refreshList();
        }, function (err) {
            _this.mainCmp.showError(err);
        }, function () {
            _this.freeze = false;
        });
    };
    DepartmentList.prototype.onAdd = function () {
        var _this = this;
        if (!this.addModel.name) {
            return;
        }
        this.addModel.contractorId = this.contId;
        this.contrSrv.saveDepModel(this.addModel).subscribe(function (res) {
            _this.addModel = new contractor_service_1.DepartmentModel();
            _this.addModel.contractorId = _this.contId;
            _this.refreshList();
        }, function (err) {
            _this.mainCmp.showError(err);
        }, function () {
            _this.freeze = false;
        });
    };
    __decorate([
        core_1.Input('contractorId'), 
        __metadata('design:type', Number)
    ], DepartmentList.prototype, "contId", void 0);
    DepartmentList = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'department-list',
            templateUrl: 'department.list.html',
            directives: [common_1.CORE_DIRECTIVES, shadowbox_component_1.ShadowBox],
            providers: [contractor_service_1.ContractorService]
        }), 
        __metadata('design:paramtypes', [contractor_service_1.ContractorService, main_component_1.MainAppComponent])
    ], DepartmentList);
    return DepartmentList;
}());
exports.DepartmentList = DepartmentList;
//# sourceMappingURL=department.list.view.js.map