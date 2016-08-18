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
var doccard_service_1 = require('../../services/doccard.service');
var shadowbox_component_1 = require('../../components/shadowbox.component');
var DocCardList = (function () {
    function DocCardList(dcSrv) {
        this.dcSrv = dcSrv;
        this.list = [];
        this.freeze = false;
    }
    DocCardList.prototype.ngOnInit = function () {
        this.refreshList();
    };
    DocCardList.prototype.refreshList = function () {
        var _this = this;
        this.freeze = true;
        this.dcSrv.getList().subscribe(function (res) { return _this.list = res; }, function (err) { return console.log(err); }, function () { _this.freeze = false; });
    };
    DocCardList = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'doccard-list',
            templateUrl: 'doccard.list.html',
            directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES, shadowbox_component_1.ShadowBox],
            providers: [doccard_service_1.DocCardService]
        }), 
        __metadata('design:paramtypes', [doccard_service_1.DocCardService])
    ], DocCardList);
    return DocCardList;
}());
exports.DocCardList = DocCardList;
//# sourceMappingURL=doccard.list.view.js.map