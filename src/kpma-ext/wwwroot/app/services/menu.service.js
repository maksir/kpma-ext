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
var Rx_1 = require('rxjs/Rx');
var MenuService = (function () {
    function MenuService(http) {
        this.http = http;
    }
    MenuService.prototype.getList = function (parentId) {
        return this.http.get('/api/menu/list?parentId=' + parentId).map(function (res) { return res.json(); });
    };
    MenuService.prototype.getModel = function (id) {
        return this.http.get('/api/menu/' + id).map(function (res) { return res.json(); });
    };
    MenuService.prototype.saveModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(model);
        }
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/menu/save', body, { headers: headers }).map(function (res) {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return false;
            }
        });
    };
    MenuService.prototype.delModel = function (id) {
        return Rx_1.Observable.of(false);
    };
    MenuService.prototype.getUserMenu = function () {
        return this.http.get('/api/menu/user').map(function (res) { return res.json(); });
    };
    MenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
var MenuViewModel = (function () {
    function MenuViewModel() {
    }
    return MenuViewModel;
}());
exports.MenuViewModel = MenuViewModel;
//# sourceMappingURL=menu.service.js.map