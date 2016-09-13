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
var main_component_1 = require('../../main.component');
var shadowbox_component_1 = require('../../components/shadowbox.component');
var DocTypeList = (function () {
    function DocTypeList(dtSrv, mainCmp) {
        this.dtSrv = dtSrv;
        this.mainCmp = mainCmp;
        this.groupList = [];
        this.typeList = [];
        this.statusList = [];
        this.addGroupModel = new doctype_service_1.DocGroupModel();
        this.addTypeModel = new doctype_service_1.DocTypeModel();
        this.addStatusModel = new doctype_service_1.DocStatusModel();
        this.freezeGroups = false;
        this.freezeTypes = false;
        this.freezeStatuses = false;
    }
    Object.defineProperty(DocTypeList.prototype, "selectedGroup", {
        get: function () {
            return this._selectedGroup;
        },
        set: function (value) {
            this._selectedGroup = value;
            this.selectedType = undefined;
            if (value) {
                this.addTypeModel.documentGroupId = value.id;
            }
            else {
                this.addTypeModel.documentGroupId = undefined;
            }
            this.refreshTypeList();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocTypeList.prototype, "selectedType", {
        get: function () {
            return this._selectedType;
        },
        set: function (value) {
            this._selectedType = value;
            if (value) {
                this.addStatusModel.documentTypeId = value.id;
            }
            else {
                this.addStatusModel.documentTypeId = undefined;
            }
            this.refreshStatusList();
        },
        enumerable: true,
        configurable: true
    });
    DocTypeList.prototype.ngOnInit = function () {
        this.refreshGroupList();
    };
    // group
    DocTypeList.prototype.refreshGroupList = function () {
        var _this = this;
        this.freezeGroups = true;
        this.dtSrv.getGroupList().subscribe(function (res) {
            _this.groupList = res;
            if (_this.selectedGroup) {
                var find = _this.groupList.filter(function (g) { return g.id == _this.selectedGroup.id; });
                if (find.length > 0) {
                    _this.selectedGroup = find[0];
                }
                else {
                    _this.selectedGroup = undefined;
                }
            }
        }, function (err) {
            _this.mainCmp.showError(err);
        }, function () {
            _this.freezeTypes = false;
        });
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
            _this._selectedGroup = res;
            _this.refreshGroupList();
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
            _this._selectedGroup = res;
            _this.refreshGroupList();
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
        if (confirm('Удалить группу "' + g.name + '" ?')) {
            this.dtSrv.deleteGroupModel(g.id).subscribe(function (res) {
                _this.selectedGroup = undefined;
                _this.editGroupModel = undefined;
                _this.refreshGroupList();
            }, function (err) { return console.log(err); });
        }
    };
    // type
    DocTypeList.prototype.refreshTypeList = function () {
        var _this = this;
        if (!this._selectedGroup) {
            this.typeList = [];
            return;
        }
        this.freezeTypes = true;
        this.dtSrv.getTypeList(this._selectedGroup.id).subscribe(function (res) {
            _this.typeList = res;
            if (_this.selectedType) {
                var find = _this.typeList.filter(function (g) { return g.id == _this.selectedType.id; });
                if (find.length > 0) {
                    _this.selectedType = find[0];
                }
                else {
                    _this.selectedType = undefined;
                }
            }
        }, function (err) {
            _this.mainCmp.showError(err);
        }, function () {
            _this.freezeTypes = false;
        });
    };
    DocTypeList.prototype.onSelectType = function (t) {
        this.selectedType = t;
    };
    DocTypeList.prototype.onAddType = function () {
        var _this = this;
        if (!this.addTypeModel.name || !this.addTypeModel.documentGroupId) {
            return;
        }
        this.dtSrv.saveTypeModel(this.addTypeModel).subscribe(function (res) {
            _this.addTypeModel = new doctype_service_1.DocTypeModel();
            _this.addTypeModel.documentGroupId = _this._selectedGroup.id;
            _this.refreshTypeList();
        }, function (err) {
            _this.mainCmp.showError(err);
        });
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
            _this.refreshTypeList();
        }, function (err) {
            _this.mainCmp.showError(err);
        });
    };
    DocTypeList.prototype.onCancelType = function () {
        this.editTypeModel = undefined;
    };
    DocTypeList.prototype.onDeleteType = function (t) {
        var _this = this;
        if (!t) {
            return;
        }
        if (confirm('Удалить тип "' + t.name + '" ?')) {
            this.dtSrv.deleteTypeModel(t.id).subscribe(function (res) {
                _this.refreshTypeList();
            }, function (err) {
                _this.mainCmp.showError(err);
            });
        }
    };
    // status
    DocTypeList.prototype.refreshStatusList = function () {
        var _this = this;
        if (!this._selectedType) {
            this.statusList = [];
            return;
        }
        this.freezeStatuses = true;
        this.dtSrv.getStatusList(this._selectedType.id).subscribe(function (res) {
            _this.statusList = res;
        }, function (err) { return console.log(err); }, function () {
            _this.freezeStatuses = false;
        });
    };
    DocTypeList.prototype.onAddStatus = function () {
        var _this = this;
        if (!this.addStatusModel.name || !this.addStatusModel.documentTypeId) {
            return;
        }
        this.dtSrv.saveStatusModel(this.addStatusModel).subscribe(function (res) {
            _this.addStatusModel = new doctype_service_1.DocStatusModel();
            _this.addStatusModel.documentTypeId = _this._selectedType.id;
            _this.refreshStatusList();
        }, function (err) { return console.log(err); });
    };
    DocTypeList.prototype.onEditStatus = function (s) {
        this.editStatusModel = s;
    };
    DocTypeList.prototype.onUpdateStatus = function () {
        var _this = this;
        if (!this.editStatusModel) {
            return;
        }
        this.dtSrv.saveStatusModel(this.editStatusModel).subscribe(function (res) {
            _this.editStatusModel = undefined;
            _this.refreshStatusList();
        }, function (err) { return console.log(err); });
    };
    DocTypeList.prototype.onCancelStatus = function () {
        this.editStatusModel = undefined;
    };
    DocTypeList.prototype.onDeleteStatus = function (s) {
        var _this = this;
        if (!s) {
            return;
        }
        if (confirm('Удалить статус "' + s.name + '" ?')) {
            this.dtSrv.deleteStatusModel(s.id).subscribe(function (res) { return _this.refreshStatusList(); }, function (err) { return console.log(err); });
        }
    };
    DocTypeList = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'doctype-list',
            templateUrl: 'doctype.list.html',
            directives: [common_1.CORE_DIRECTIVES, treeview_1.TreeView, shadowbox_component_1.ShadowBox],
            providers: [doctype_service_1.DocTypeService]
        }), 
        __metadata('design:paramtypes', [doctype_service_1.DocTypeService, main_component_1.MainAppComponent])
    ], DocTypeList);
    return DocTypeList;
}());
exports.DocTypeList = DocTypeList;
//# sourceMappingURL=doctype.list.view.js.map