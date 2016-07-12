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
            selector: 'shadow-box',
            template: "\n\t\t<span>sdfs</span>\n\t\t<div *ngIf=\"show\" class=\"shadow-box\" >\n\t\t\t<div class=\"shadow-box-body\">\n\t\t\t<i class=\"fa fa-2x fa-spinner fa-spin\"></i>\n\t\t\t</div>\n\t\t</div>",
            styles: ["\n\t\t.shadow-box {\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tz-index: 1040;\n\t\t\tbackground-color: #000;\n\t\t\topacity: .3;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\ttext-align: center;\n\t\t}",
                ".shadow-box-body { \n\t\t\tmargin: auto;\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tbottom: 0;\n\t\t\tright: 0;\n\t\t\twidth: 50%;\n\t\t\theight: 50%;\n\t\t\tcolor: white;}"],
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], ShadowBox);
    return ShadowBox;
}());
exports.ShadowBox = ShadowBox;
var ShadowBoxDirective = (function () {
    function ShadowBoxDirective(componentResolver, injector, ngEl, vcr) {
        this.componentResolver = componentResolver;
        this.injector = injector;
        this.ngEl = ngEl;
        this.vcr = vcr;
        this._prevCondition = null;
    }
    Object.defineProperty(ShadowBoxDirective.prototype, "shadowbox", {
        set: function (newCondition) {
            //if (newCondition && (isBlank(this._prevCondition) || !this._prevCondition)) {
            //	this._renderer.setElementClass(this._ngEl.nativeElement, 'relative', true);
            //}
            //else {
            //	this._renderer.setElementClass(this._ngEl.nativeElement, 'relative', false);
            //}
            this._prevCondition = newCondition;
            if (this.copmRef) {
                this.copmRef.instance.show = newCondition;
            }
        },
        enumerable: true,
        configurable: true
    });
    ShadowBoxDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.componentResolver.resolveComponent(ShadowBox).then(function (factory) {
            //const injector = ReflectiveInjector.fromResolvedProviders([], this.vcr.injector);
            //this.vcr.insert(
            _this.copmRef = _this.vcr.createComponent(factory);
        });
    };
    ShadowBoxDirective = __decorate([
        core_1.Directive({
            selector: '[shadowbox]',
            host: {
                '[style.position]': '"relative"',
            },
            inputs: ['shadowbox']
        }), 
        __metadata('design:paramtypes', [core_1.ComponentResolver, core_1.Injector, core_1.ElementRef, core_1.ViewContainerRef])
    ], ShadowBoxDirective);
    return ShadowBoxDirective;
}());
exports.ShadowBoxDirective = ShadowBoxDirective;
//# sourceMappingURL=shadowbox.directive.js.map