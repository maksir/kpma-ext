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
var DocTypeService = (function () {
    function DocTypeService(http) {
        this.http = http;
    }
    DocTypeService.prototype.getGroupList = function () {
        return this.http.get('/api/doctype/group/list').map(function (res) { return res.json(); });
    };
    DocTypeService.prototype.getGroupModel = function (id) {
        return this.http.get('/api/doctype/group/' + id).map(function (res) { return res.json(); });
    };
    DocTypeService.prototype.saveGroupModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(model);
        }
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/doctype/group', body, { headers: headers }).map(function (res) {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return false;
            }
        });
    };
    DocTypeService.prototype.deleteGroupModel = function (id) {
        if (!id) {
            return Rx_1.Observable.of(false);
        }
        return this.http.delete('/api/doctype/group/' + id).map(function (res) { return res.ok; });
    };
    DocTypeService.prototype.getTypeList = function (groupId) {
        return this.http.get('/api/doctype/type/list?groupId=' + groupId).map(function (res) { return res.json(); });
    };
    DocTypeService.prototype.getTypeModel = function (id) {
        return this.http.get('/api/doctype/type/' + id).map(function (res) { return res.json(); });
    };
    DocTypeService.prototype.saveTypeModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(model);
        }
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/doctype/type', body, { headers: headers }).map(function (res) {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return false;
            }
        });
    };
    DocTypeService.prototype.deleteTypeModel = function (id) {
        if (!id) {
            return Rx_1.Observable.of(false);
        }
        return this.http.delete('/api/doctype/type/' + id).map(function (res) { return res.ok; });
    };
    DocTypeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DocTypeService);
    return DocTypeService;
}());
exports.DocTypeService = DocTypeService;
var DocTypeModel = (function () {
    function DocTypeModel() {
    }
    return DocTypeModel;
}());
exports.DocTypeModel = DocTypeModel;
var DocGroupModel = (function () {
    function DocGroupModel() {
    }
    return DocGroupModel;
}());
exports.DocGroupModel = DocGroupModel;
//# sourceMappingURL=doctype.service.js.map