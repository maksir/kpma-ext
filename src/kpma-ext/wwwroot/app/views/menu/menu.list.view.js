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
var menu_service_1 = require('../../services/menu.service');
var treeview_1 = require('../../controls/treeview');
var MenuList = (function () {
    function MenuList(menuSrv) {
        this.menuSrv = menuSrv;
        // элементы дерева и выбранная ветка
        this.root = [];
        // элементы списка, подчиненные выбранной ветке
        this.menuList = [];
        // модель добавления нового элемента
        this.addModel = new menu_service_1.MenuModel();
        this.root.push({ id: null, name: '...', children: [], isExpanded: true, bage: null, parent: null });
        this.selectedNode = this.root[0];
    }
    MenuList.prototype.ngOnInit = function () {
        this.onRequestNodes(this.root[0]);
        this.updateList();
    };
    MenuList.prototype.onTreeRefresh = function () {
        this.onRequestNodes(this.selectedNode);
    };
    MenuList.prototype.onSelectNode = function (node) {
        this.selectedNode = node;
        this.addModel.parentId = node.id;
        this.updateList();
    };
    MenuList.prototype.onRequestNodes = function (node) {
        var _this = this;
        if (!node) {
            return;
        }
        this.menuSrv.getList(node.id).subscribe(function (res) { return _this.fillChildren(node, res); }, function (err) { return console.log(err); });
    };
    MenuList.prototype.fillChildren = function (node, res) {
        node.children = [];
        res.forEach(function (item) { return node.children.push({
            id: item.id,
            name: item.name,
            children: null,
            isExpanded: false,
            bage: null,
            parent: node
        }); });
    };
    MenuList.prototype.updateList = function () {
        var _this = this;
        if (this.selectedNode) {
            this.menuSrv.getList(this.selectedNode.id).subscribe(function (res) { return _this.menuList = res; }, function (err) { return console.log(err); });
        }
        else {
            this.menuList = [];
        }
    };
    MenuList.prototype.onAdd = function () {
        var _this = this;
        this.menuSrv.saveModel(this.addModel).subscribe(function (res) {
            _this.addModel = new menu_service_1.MenuModel();
            _this.addModel.parentId = _this.selectedNode.id;
            _this.onRequestNodes(_this.selectedNode);
            _this.updateList();
        });
    };
    MenuList.prototype.onEdit = function (item) {
        this.editModel = item;
    };
    MenuList.prototype.onCancel = function () {
        this.editModel = undefined;
    };
    MenuList.prototype.onDelete = function (item) {
    };
    MenuList.prototype.onSave = function () {
        var _this = this;
        if (!this.editModel) {
            return;
        }
        this.menuSrv.saveModel(this.editModel).subscribe(function (res) {
            _this.onRequestNodes(_this.selectedNode);
            _this.updateList();
            _this.editModel = undefined;
        }, function (err) { return console.log(err); });
    };
    MenuList = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'menu-list',
            templateUrl: 'menu.list.html',
            directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, treeview_1.TreeView],
            providers: [menu_service_1.MenuService]
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService])
    ], MenuList);
    return MenuList;
}());
exports.MenuList = MenuList;
//# sourceMappingURL=menu.list.view.js.map