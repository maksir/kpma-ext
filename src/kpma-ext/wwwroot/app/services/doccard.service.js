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
var DocCardService = (function () {
    function DocCardService(http) {
        this.http = http;
    }
    DocCardService.prototype.getList = function () {
        return this.http.get('/api/doccard/list').map(function (res) { return res.json(); });
    };
    DocCardService.prototype.getModel = function (id) {
        return this.http.get('/api/doccard/' + id).map(function (res) { return res.json(); });
    };
    DocCardService.prototype.saveModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(model);
        }
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/doccard', body, { headers: headers }).map(function (res) {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return false;
            }
        });
    };
    DocCardService.prototype.deleteModel = function (id) {
        if (!id) {
            return Rx_1.Observable.of(false);
        }
        return this.http.delete('/api/doccard/' + id).map(function (res) { return res.ok; });
    };
    DocCardService.prototype.getGroupList = function (folderId) {
        return this.http.get('/api/doccard/group/' + folderId).map(function (res) { return res.json(); });
    };
    DocCardService.prototype.getDocList = function (folderId, groupId) {
        return this.http.get('/api/doccard/list/' + folderId + '?groupId=' + groupId).map(function (res) { return res.json(); });
    };
    DocCardService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DocCardService);
    return DocCardService;
}());
exports.DocCardService = DocCardService;
var DocCardViewModel = (function () {
    function DocCardViewModel() {
    }
    return DocCardViewModel;
}());
exports.DocCardViewModel = DocCardViewModel;
var DocCardDataModel = (function () {
    function DocCardDataModel() {
    }
    return DocCardDataModel;
}());
exports.DocCardDataModel = DocCardDataModel;
//# sourceMappingURL=doccard.service.js.map