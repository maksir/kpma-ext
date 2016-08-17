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
var ServiceService = (function () {
    function ServiceService(http) {
        this.http = http;
    }
    ServiceService.prototype.getList = function () {
        return this.http.get('/api/service/list').map(function (res) { return res.json(); });
    };
    ServiceService.prototype.getModel = function (id) {
        return this.http.get('/api/service/' + id).map(function (res) { return res.json(); });
    };
    ServiceService.prototype.saveModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(model);
        }
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/service', body, { headers: headers }).map(function (res) {
            if (res.ok) {
                return res.json();
            }
            else {
                return false;
            }
        });
    };
    ServiceService.prototype.deleteModel = function (id) {
        if (!id) {
            return Rx_1.Observable.of(false);
        }
        return this.http.delete('/api/service/' + id).map(function (res) { return res.ok; });
    };
    ServiceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ServiceService);
    return ServiceService;
}());
exports.ServiceService = ServiceService;
var ServiceModel = (function () {
    function ServiceModel() {
    }
    return ServiceModel;
}());
exports.ServiceModel = ServiceModel;
//# sourceMappingURL=service.service.js.map