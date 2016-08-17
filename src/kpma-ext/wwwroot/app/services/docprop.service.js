"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var DocPropService = (function () {
    function DocPropService(http) {
        this.http = http;
    }
    DocPropService.prototype.getPropList = function () {
        return this.http.get('/api/docprop/list').map(function (res) { return res.json(); });
    };
    DocPropService.prototype.getPropModel = function (id) {
        return this.http.get('/api/docprop/' + id).map(function (res) { return res.json(); });
    };
    DocPropService.prototype.savePropModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(model);
        }
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/docprop', body, { headers: headers }).map(function (res) {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return false;
            }
        });
    };
    DocPropService.prototype.deletePropModel = function (id) {
        if (!id) {
            return Rx_1.Observable.of(false);
        }
        return this.http.delete('/api/docprop/' + id).map(function (res) { return res.ok; });
    };
    DocPropService.prototype.getFieldList = function (propId) {
        return this.http.get('/api/docprop/field/list/' + propId).map(function (res) { return res.json(); });
    };
    DocPropService.prototype.saveFieldModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(false);
        }
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/docprop/field', body, { headers: headers }).map(function (res) {
            return res.ok;
        });
    };
    DocPropService.prototype.deleteFieldModel = function (id) {
        if (!id) {
            return Rx_1.Observable.of(false);
        }
        return this.http.delete('/api/docprop/field' + id).map(function (res) { return res.ok; });
    };
    DocPropService.prototype.getPropFieldList = function (docTypeId) {
        return this.http.get('/api/docprop/proplist/' + docTypeId).map(function (res) { return res.json(); });
    };
    DocPropService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DocPropService);
    return DocPropService;
}());
exports.DocPropService = DocPropService;
var DocPropDataModel = (function () {
    function DocPropDataModel() {
    }
    return DocPropDataModel;
}());
exports.DocPropDataModel = DocPropDataModel;
var DocPropViewModel = (function (_super) {
    __extends(DocPropViewModel, _super);
    function DocPropViewModel() {
        _super.apply(this, arguments);
    }
    return DocPropViewModel;
}(DocPropDataModel));
exports.DocPropViewModel = DocPropViewModel;
var DocFieldModel = (function () {
    function DocFieldModel() {
    }
    return DocFieldModel;
}());
exports.DocFieldModel = DocFieldModel;
//# sourceMappingURL=docprop.service.js.map