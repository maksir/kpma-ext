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
var router_1 = require('@angular/router');
var doccard_service_1 = require('../../services/doccard.service');
var treeview_1 = require('../../controls/treeview');
var tabs_control_1 = require('../../controls/tabs.control');
var main_component_1 = require('../../main.component');
var attachment_list_view_1 = require('../attachment/attachment.list.view');
var chat_component_1 = require('../../components/chat/chat.component');
var shadowbox_component_1 = require('../../components/shadowbox.component');
var DocCardTree = (function () {
    function DocCardTree(docSrv, mainCmp) {
        this.docSrv = docSrv;
        this.mainCmp = mainCmp;
        this.root = [];
        this.docList = [];
        this.freezeDocList = false;
        this.freezeFolder = [false, false];
        this.root.push({ id: 1, name: 'Входящие', children: [], isExpanded: true, bage: 0, parent: null });
        this.root.push({ id: 2, name: 'Исходящие', children: [], isExpanded: true, bage: 0, parent: null });
        //this.root.push({ id: 3, name: 'Избранные', children: [], isExpanded: true, bage: 0, parent: null });
    }
    DocCardTree.prototype.ngOnInit = function () {
        this.refreshTree();
    };
    DocCardTree.prototype.onRequestNodes = function (node, folderI) {
        var _this = this;
        if (!node.parent) {
            this.docSrv.getGroupList(node.id).subscribe(function (res) {
                _this.fillNodes(res, node);
            }, function (err) {
                _this.mainCmp.showError(err);
            }, function () {
                _this.freezeFolder[folderI] = false;
            });
        }
    };
    DocCardTree.prototype.refreshTree = function () {
        this.freezeFolder[0] = true;
        this.freezeFolder[1] = true;
        this.onRequestNodes(this.root[0], 0);
        this.onRequestNodes(this.root[1], 1);
    };
    DocCardTree.prototype.fillNodes = function (res, parent) {
        var _this = this;
        parent.children = [];
        res.forEach(function (item) {
            var node = { id: item.id, name: item.name, children: [], isExpanded: false, bage: item.bage, parent: parent };
            parent.children.push(node);
            if (_this.selectedNode && _this.selectedNode.parent == parent && _this.selectedNode.id == item.id) {
                _this.selectedNode = node;
                _this.refreshDocList();
            }
        });
    };
    DocCardTree.prototype.onSelectNode = function (node) {
        this.selectedNode = node;
        this.refreshDocList();
    };
    DocCardTree.prototype.onSelectDoc = function (item) {
        this.selectedDoc = item;
    };
    DocCardTree.prototype.refreshDocList = function () {
        var _this = this;
        if (!this.selectedNode) {
            this.docList = [];
            return;
        }
        this.freezeDocList = true;
        var folderId = this.selectedNode.id;
        var groupId = undefined;
        if (this.selectedNode.parent) {
            folderId = this.selectedNode.parent.id;
            groupId = this.selectedNode.id;
        }
        this.docSrv.getDocList(folderId, groupId).subscribe(function (res) {
            _this.docList = res;
            if (_this.selectedDoc) {
                _this.selectedDoc = res.find(function (m) { return m.id == _this.selectedDoc.id; });
            }
        }, function (err) {
            _this.mainCmp.showError(err);
        }, function () {
            _this.freezeDocList = false;
        });
    };
    DocCardTree.prototype.getUserDepartment = function () {
        if (!this.selectedDoc) {
            return undefined;
        }
        if (this.selectedDoc.contractorFromId === this.mainCmp.currentUser.contractorId) {
            return this.selectedDoc.departmentFromId;
        }
        if (this.selectedDoc.contractorToId === this.mainCmp.currentUser.contractorId) {
            return this.selectedDoc.departmentToId;
        }
        return undefined;
    };
    DocCardTree = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'doccard-tree',
            templateUrl: 'doccard.tree.html',
            directives: [router_1.ROUTER_DIRECTIVES, treeview_1.TreeView, tabs_control_1.Tabs, tabs_control_1.Tab, attachment_list_view_1.AttachmentList, chat_component_1.Chat, shadowbox_component_1.ShadowBox],
            providers: [doccard_service_1.DocCardService]
        }), 
        __metadata('design:paramtypes', [doccard_service_1.DocCardService, main_component_1.MainAppComponent])
    ], DocCardTree);
    return DocCardTree;
}());
exports.DocCardTree = DocCardTree;
//# sourceMappingURL=doccard.tree.view.js.map