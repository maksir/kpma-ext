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
var ShadowBox = (function () {
    function ShadowBox() {
        this.show = false;
        var t = this.show;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ShadowBox.prototype, "show", void 0);
    ShadowBox = __decorate([
        core_1.Component({
            selector: '[shadow-box]',
            template: "\n\t\t<div *ngIf=\"show\" class=\"shadow-box\" >\n\t\t\t<i class=\"fa fa-2x fa-spinner fa-pulse\"></i>\n\t\t</div>\n\t\t<ng-content></ng-content>",
            styles: ["\n\t\t:host {\n\t\t\tposition: relative;\n\t\t}",
                ".shadow-box {\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tz-index: 1040;\n\t\t\tbackground-color: #000;\n\t\t\topacity: .3;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\ttext-align: center;\n\t\t}",
                "i { \n\t\t\tposition: absolute;\n\t\t\ttop: 45%;\n\t\t\tleft: 50%;\n\t\t\tcolor: white;}"],
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ShadowBox);
    return ShadowBox;
}());
exports.ShadowBox = ShadowBox;
//# sourceMappingURL=shadowbox.component.js.map