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
var doccard_service_1 = require('../../services/doccard.service');
var treeview_1 = require('../../controls/treeview');
var shadowbox_component_1 = require('../../components/shadowbox.component');
var main_component_1 = require('../../main.component');
var Dashboard = (function () {
    function Dashboard(docSrv, mainCmp) {
        this.docSrv = docSrv;
        this.mainCmp = mainCmp;
        this.root = [];
        this.freez = false;
        this.root.push({ id: 1, name: 'Входящие', children: [], isExpanded: true, bage: 0, parent: null });
        this.root.push({ id: 2, name: 'Исходящие', children: [], isExpanded: true, bage: 0, parent: null });
    }
    Dashboard.prototype.ngOnInit = function () {
        this.onRequestNodes(this.root[0]);
        this.onRequestNodes(this.root[1]);
    };
    Dashboard.prototype.onSelectNode = function ($event) {
    };
    Dashboard.prototype.onRequestNodes = function (node) {
        var _this = this;
        if (!node.parent) {
            this.docSrv.getGroupList(node.id).subscribe(function (res) { return _this.fillNodes(res, node); }, function (err) { return console.log(err); });
        }
    };
    Dashboard.prototype.fillNodes = function (res, parent) {
        parent.children = [];
        res.forEach(function (item) {
            parent.children.push({ id: item.id, name: item.name, children: [], isExpanded: false, bage: item.bage, parent: null });
        });
    };
    Dashboard.prototype.shadow = function () {
        //this.freez = !this.freez;
        var _this = this;
        this.mainCmp.showQuestion('Вопрос года!').subscribe(function (res) {
            if (res) {
                //this.mainCmp.showMessage('alert-success', 'Ura!', 'OK');
                var r = 0;
            }
            else {
                var r = 0;
            }
        }, function (err) { return _this.mainCmp.showError(err); });
        return false;
    };
    Dashboard = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard',
            templateUrl: 'dashboard.html',
            directives: [treeview_1.TreeView, shadowbox_component_1.ShadowBox],
            providers: [doccard_service_1.DocCardService]
        }), 
        __metadata('design:paramtypes', [doccard_service_1.DocCardService, main_component_1.MainAppComponent])
    ], Dashboard);
    return Dashboard;
}());
exports.Dashboard = Dashboard;
//# sourceMappingURL=dashboard.view.js.map