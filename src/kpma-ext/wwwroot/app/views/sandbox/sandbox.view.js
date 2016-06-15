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
var tabs_control_1 = require('../../controls/tabs.control');
var shadowbox_control_1 = require('../../controls/shadowbox.control');
var dropdown_control_1 = require('../../controls/dropdown/dropdown.control');
var SandBox = (function () {
    function SandBox() {
    }
    SandBox = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sandbox',
            templateUrl: 'sandbox.html',
            styles: ['.panel-body { position: relative; }'],
            directives: [common_1.FORM_DIRECTIVES, tabs_control_1.Tab, tabs_control_1.Tabs, shadowbox_control_1.ShadowBox, dropdown_control_1.DropDown]
        }), 
        __metadata('design:paramtypes', [])
    ], SandBox);
    return SandBox;
}());
exports.SandBox = SandBox;
//# sourceMappingURL=sandbox.view.js.map