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
var SelectService = (function () {
    function SelectService(http) {
        this.http = http;
    }
    SelectService.prototype.getSelectList = function (typeName, parentId, term) {
        return this.http.get(encodeURI('/api/select/' + typeName + '?parentId=' + parentId + '&term=' + term))
            .map(function (res) { return res.json(); });
    };
    SelectService.prototype.getSelectItemId = function (typeName, itemId) {
        return this.http.get('/api/select/' + typeName + '/' + itemId)
            .map(function (res) { return res.json(); });
    };
    SelectService.prototype.getSelectItemCode = function (typeName, itemCode) {
        return this.http.get('/api/select?type=' + typeName + '&code=' + itemCode)
            .map(function (res) { return res.json(); });
    };
    SelectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SelectService);
    return SelectService;
}());
exports.SelectService = SelectService;
//# sourceMappingURL=select.service.js.map