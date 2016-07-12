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
require('rxjs/Rx');
var TreeViewComponent = (function () {
    function TreeViewComponent() {
        this.onSelectedChanged = new core_1.EventEmitter();
        this.onRequestNodes = new core_1.EventEmitter();
    }
    TreeViewComponent.prototype.onSelectNode = function (node) {
        this.onSelectedChanged.emit(node);
    };
    TreeViewComponent.prototype.onExpand = function (node) {
        node.isExpanded = !node.isExpanded;
        if (node.isExpanded && node.children.length == 0) {
            this.onRequestNodes.emit(node);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TreeViewComponent.prototype, "Nodes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeViewComponent.prototype, "SelectedNode", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TreeViewComponent.prototype, "CanExpand", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TreeViewComponent.prototype, "isRoot", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeViewComponent.prototype, "onSelectedChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TreeViewComponent.prototype, "onRequestNodes", void 0);
    TreeViewComponent = __decorate([
        core_1.Component({
            selector: "tree-view",
            template: "\n\t\t<ul class=\"treenodes {{isRoot? 'noderoot' : '' }}\">\n\t\t\t<li *ngFor=\"let node of Nodes\" class=\"treenode\">\n\t\t\t\t<i *ngIf=\"CanExpand\" class=\"nodebutton fa fa-{{node.isExpanded ? 'minus' : 'plus'}}-square-o\"\n\t\t\t\t   (click)=\"onExpand(node)\">\n\t\t\t\t</i>\n\t\t\t\t<div class=\"nodeinfo\">\n\t\t\t\t\t<i *ngIf=\"!CanExpand\" class=\"nodeicon fa fa-file-o\"></i>\n\t\t\t\t\t<i *ngIf=\"CanExpand\" class=\"nodeicon fa fa-tags\"></i>\n\n\t\t\t\t\t<span class=\"nodetext {{node == SelectedNode ? 'bg-info text-bold' : ''}} {{isRoot? 'noderoot' : '' }}\"\n\t\t\t\t\t\t  (click)=\"onSelectNode(node)\">\n\t\t\t\t\t\t{{node.name}}\n\t\t\t\t\t</span>\n\t\t\t\t\t<span *ngIf=\"node.bage > 0\" class=\"nodebage badge\">{{node.bage}}</span>\n\n\t\t\t\t\t<tree-view [Nodes]=\"node.children\"\n\t\t\t\t\t\t\t   [SelectedNode]=\"SelectedNode\"\n\t\t\t\t\t\t\t   (onSelectedChanged)=\"onSelectNode($event)\"\n\t\t\t\t\t\t\t   (onRequestNodes)=\"onRequest($event)\"\n\t\t\t\t\t\t\t   *ngIf=\"node.isExpanded\">\n\t\t\t\t\t</tree-view>\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t</ul>\n\t",
            styles: ['.treenodes {display:table; list-style-type: none; padding-left: 16px;}',
                '.treenodes.noderoot {padding-left: 0;}',
                '.treenode {display: table-row; list-style-type: none;}',
                '.nodebutton {display:table-cell; cursor: pointer;}',
                '.nodeinfo {display:table-cell; padding-left: 5px; list-style-type: none;}',
                '.nodeicon {}',
                '.nodetext {color: #31708f; padding-left: 3px; padding-right: 3px; cursor: pointer;}',
                '.nodetext.noderoot {font-size: 16px; font-weight: bold;}'
            ],
            directives: [TreeViewComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], TreeViewComponent);
    return TreeViewComponent;
}());
exports.TreeViewComponent = TreeViewComponent;
//# sourceMappingURL=treeview.js.map