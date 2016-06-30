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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var MetaObjectService = (function () {
    function MetaObjectService(http) {
        this.http = http;
    }
    MetaObjectService.prototype.getList = function (parentId) {
        return this.http.get('/api/metaobject/list?parentId=' + parentId.toString()).map(function (res) { return res.json(); });
    };
    MetaObjectService.prototype.getOne = function (id) {
        return this.http.get('/api/metaobject/' + id.toString()).map(function (res) { return res.json(); });
    };
    MetaObjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MetaObjectService);
    return MetaObjectService;
}());
exports.MetaObjectService = MetaObjectService;
var MetaObjectViewModel = (function () {
    function MetaObjectViewModel() {
    }
    return MetaObjectViewModel;
}());
exports.MetaObjectViewModel = MetaObjectViewModel;
var MetaObjectDataModel = (function () {
    function MetaObjectDataModel() {
    }
    return MetaObjectDataModel;
}());
exports.MetaObjectDataModel = MetaObjectDataModel;
//# sourceMappingURL=metaobject.service.js.map