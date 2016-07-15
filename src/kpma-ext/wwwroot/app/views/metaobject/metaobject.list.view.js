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
var router_1 = require('@angular/router');
var metaobject_service_1 = require('../../services/metaobject.service');
var treeview_1 = require('../../controls/treeview');
var MetaObjectList = (function () {
    function MetaObjectList(moSrv) {
        this.moSrv = moSrv;
        this.moList = [];
        this.parentId = 0;
        this.root = [];
        this.root.push({ id: null, name: '...', children: [], isExpanded: true, bage: null, parent: null });
    }
    MetaObjectList.prototype.ngOnInit = function () {
        this.onRequestNodes(this.root[0]);
    };
    MetaObjectList.prototype.onSelectNode = function (node) {
        var _this = this;
        this.selectedNode = node;
        this.parentId = node.id ? node.id : 0;
        this.moSrv.getList(node.id).subscribe(function (res) { return _this.moList = res; }, function (err) { return console.log(err); });
    };
    MetaObjectList.prototype.onRequestNodes = function (node) {
        var _this = this;
        this.moSrv.getList(node.id).subscribe(function (res) { return _this.fillChildren(node, res); }, function (err) { return console.log(err); });
    };
    MetaObjectList.prototype.fillChildren = function (node, res) {
        res.forEach(function (item) { return node.children.push({
            id: item.id,
            name: item.name,
            children: null,
            isExpanded: false,
            bage: null,
            parent: node
        }); });
    };
    MetaObjectList.prototype.onTreeRefresh = function () {
        this.root[0].children = [];
        this.onRequestNodes(this.root[0]);
    };
    MetaObjectList = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'metaobject-list',
            templateUrl: 'metaobject.list.html',
            directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, treeview_1.TreeView],
            providers: [metaobject_service_1.MetaObjectService]
        }), 
        __metadata('design:paramtypes', [metaobject_service_1.MetaObjectService])
    ], MetaObjectList);
    return MetaObjectList;
}());
exports.MetaObjectList = MetaObjectList;
//# sourceMappingURL=metaobject.list.view.js.map