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
        this.addTypeModel = new doctype_service_1.DocTypeModel();
    }
    Object.defineProperty(DocTypeList.prototype, "selectedGroup", {
        set: function (value) {
            this.selectGroupModel = value;
            if (value) {
                this.addTypeModel.documentGroupId = value.id;
            }
            else {
                this.addTypeModel.documentGroupId = undefined;
            }
            this.updateTypeList();
        },
        enumerable: true,
        configurable: true
    });
    DocTypeList.prototype.ngOnInit = function () {
        this.updateGroupList();
    };
    DocTypeList.prototype.updateGroupList = function () {
        var _this = this;
        this.dtSrv.getGroupList().subscribe(function (res) {
            _this.groupList = res;
            if (_this.selectGroupModel) {
                var ll = _this.groupList.filter(function (g) { return g.id == _this.selectGroupModel.id; });
                if (ll.length > 0) {
                    _this.selectedGroup = ll[0];
                }
            }
        }, function (err) { return console.log(err); });
    };
    DocTypeList.prototype.updateTypeList = function () {
        var _this = this;
        if (!this.selectGroupModel) {
            this.typeList = [];
        }
        else {
            this.dtSrv.getTypeList(this.selectGroupModel.id).subscribe(function (res) { return _this.typeList = res; }, function (err) { return console.log(err); });
        }
    };
    DocTypeList.prototype.onSelectGroup = function (g) {
        this.selectedGroup = g;
    };
    DocTypeList.prototype.onAddGroup = function () {
        var _this = this;
        if (!this.addGroupModel.name) {
            return;
        }
        this.dtSrv.saveGroupModel(this.addGroupModel).subscribe(function (res) {
            _this.addGroupModel = new doctype_service_1.DocGroupModel();
            _this.selectGroupModel = res;
            _this.updateGroupList();
        }, function (err) { return console.log(err); });
    };
    DocTypeList.prototype.onEditGroup = function (g) {
        this.editGroupModel = g;
        this.selectedGroup = g;
    };
    DocTypeList.prototype.onUpdateGroup = function () {
        var _this = this;
        if (!this.editGroupModel) {
            return;
        }
        this.dtSrv.saveGroupModel(this.editGroupModel).subscribe(function (res) {
            _this.editGroupModel = undefined;
            _this.selectGroupModel = res;
            _this.updateGroupList();
        }, function (err) { return console.log(err); });
    };
    DocTypeList.prototype.onCancelGroup = function () {
        this.editGroupModel = undefined;
    };
    DocTypeList.prototype.onDeleteGroup = function (g) {
        var _this = this;
        if (!g) {
            return;
        }
        this.dtSrv.deleteGroupModel(g.id).subscribe(function (res) {
            _this.selectGroupModel = undefined;
            _this.editGroupModel = undefined;
            _this.updateGroupList();
            _this.updateTypeList();
        }, function (err) { return console.log(err); });
    };
    DocTypeList.prototype.onAddType = function () {
        var _this = this;
        if (!this.addTypeModel.name || !this.addTypeModel.documentGroupId) {
            return;
        }
        this.dtSrv.saveTypeModel(this.addTypeModel).subscribe(function (res) {
            _this.addTypeModel = new doctype_service_1.DocTypeModel();
            _this.addTypeModel.documentGroupId = _this.selectGroupModel.id;
            _this.updateTypeList();
        }, function (err) { return console.log(err); });
    };
    DocTypeList.prototype.onEditType = function (t) {
        this.editTypeModel = t;
    };
    DocTypeList.prototype.onUpdateType = function () {
        var _this = this;
        if (!this.editTypeModel) {
            return;
        }
        this.dtSrv.saveTypeModel(this.editTypeModel).subscribe(function (res) {
            _this.editTypeModel = undefined;
            _this.updateTypeList();
        }, function (err) { return console.log(err); });
    };
    DocTypeList.prototype.onCancelType = function () {
        this.editTypeModel = undefined;
    };
    DocTypeList.prototype.onDeleteType = function (t) {
        var _this = this;
        if (!t) {
            return;
        }
        this.dtSrv.deleteTypeModel(t.id).subscribe(function (res) {
            _this.updateTypeList();
        }, function (err) { return console.log(err); });
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