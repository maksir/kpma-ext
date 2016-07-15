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
var doctype_service_1 = require('../../services/doctype.service');
var treeview_1 = require('../../controls/treeview');
var DocTypeList = (function () {
    function DocTypeList(dtSrv) {
        this.dtSrv = dtSrv;
        this.groupList = [];
        this.typeList = [];
        this.addGroupModel = new doctype_service_1.DocGroupModel();
        // модель добавления нового элемента
        this.addTypeModel = new doctype_service_1.DocuTypeModel();
    }
    DocTypeList.prototype.ngOnInit = function () {
    };
    DocTypeList.prototype.updateGroupList = function () {
        var _this = this;
        this.dtSrv.getGroupList().subscribe(function (res) { return _this.groupList = res; }, function (err) { return console.log(err); });
    };
    DocTypeList.prototype.updateTypeList = function () {
    };
    DocTypeList = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'doctype-list',
            templateUrl: 'doctype.list.html',
            directives: [common_1.CORE_DIRECTIVES, treeview_1.TreeView],
            providers: [doctype_service_1.DocTypeService]
        }), 
        __metadata('design:paramtypes', [doctype_service_1.DocTypeService])
    ], DocTypeList);
    return DocTypeList;
}());
exports.DocTypeList = DocTypeList;
//# sourceMappingURL=doctype.list.view.js.map