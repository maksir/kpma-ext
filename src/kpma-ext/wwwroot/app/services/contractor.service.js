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
var ContractorService = (function () {
    function ContractorService(http) {
        this.http = http;
    }
    ContractorService.prototype.getContrList = function () {
        return this.http.get('/api/contractor/list').map(function (res) { return res.json(); });
    };
    ContractorService.prototype.getContrModel = function (id) {
        return this.http.get('/api/contractor/' + id).map(function (res) { return res.json(); });
    };
    ContractorService.prototype.saveContrModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(model);
        }
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/contractor', body, { headers: headers }).map(function (res) {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return false;
            }
        });
    };
    ContractorService.prototype.deleteContrModel = function (id) {
        if (!id) {
            return Rx_1.Observable.of(false);
        }
        return this.http.delete('/api/contractor/' + id).map(function (res) { return res.ok; });
    };
    // department
    ContractorService.prototype.getDepList = function (contId) {
        return this.http.get('/api/department/list/' + contId).map(function (res) { return res.json(); });
    };
    ContractorService.prototype.getDepModel = function (id) {
        return this.http.get('/api/department/' + id).map(function (res) { return res.json(); });
    };
    ContractorService.prototype.saveDepModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(model);
        }
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/department', body, { headers: headers }).map(function (res) {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return false;
            }
        });
    };
    ContractorService.prototype.deleteDepModel = function (id) {
        if (!id) {
            return Rx_1.Observable.of(false);
        }
        return this.http.delete('/api/department/' + id).map(function (res) { return res.ok; });
    };
    ContractorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ContractorService);
    return ContractorService;
}());
exports.ContractorService = ContractorService;
var ContractorModel = (function () {
    function ContractorModel() {
    }
    return ContractorModel;
}());
exports.ContractorModel = ContractorModel;
var DepartmentModel = (function () {
    function DepartmentModel() {
    }
    return DepartmentModel;
}());
exports.DepartmentModel = DepartmentModel;
//# sourceMappingURL=contractor.service.js.map