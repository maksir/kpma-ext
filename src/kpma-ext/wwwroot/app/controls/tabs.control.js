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
var Tab = (function () {
    function Tab() {
        this.active = false;
        this.disabled = false;
    }
    __decorate([
        core_1.Input('title'), 
        __metadata('design:type', String)
    ], Tab.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Tab.prototype, "active", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Tab.prototype, "disabled", void 0);
    Tab = __decorate([
        core_1.Component({
            selector: 'tab',
            template: "\n    <div *ngIf=\"active\" class=\"pane\">\n      <ng-content></ng-content>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Tab);
    return Tab;
}());
exports.Tab = Tab;
var Tabs = (function () {
    function Tabs() {
    }
    Tabs.prototype.ngAfterContentInit = function () {
        // get all active tabs
        var activeTabs = this.tabs.filter(function (tab) { return tab.active; });
        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    };
    Tabs.prototype.selectTab = function (tab) {
        if (tab.disabled) {
            return;
        }
        // deactivate all tabs
        this.tabs.toArray().forEach(function (tab) { return tab.active = false; });
        // activate the tab the user has clicked on.
        tab.active = true;
    };
    __decorate([
        core_1.ContentChildren(Tab), 
        __metadata('design:type', core_1.QueryList)
    ], Tabs.prototype, "tabs", void 0);
    Tabs = __decorate([
        core_1.Component({
            selector: 'tabs',
            template: "\n\t<ul class=\"nav nav-tabs\">\n      <li *ngFor=\"let tab of tabs\" (click)=\"selectTab(tab)\" [class.active]=\"tab.active\">\n        <a class=\"cursor-pointer\">{{tab.title}}</a>\n      </li>\n    </ul>\n    <ng-content></ng-content>\n\t",
            styles: ["\n\t\tli {\n\t\t\tcursor: pointer;\n\t\t}"],
            directives: [Tab]
        }), 
        __metadata('design:paramtypes', [])
    ], Tabs);
    return Tabs;
}());
exports.Tabs = Tabs;
//# sourceMappingURL=tabs.control.js.map