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
var RestrictService = (function () {
    function RestrictService(http) {
        this.http = http;
    }
    RestrictService.prototype.getList = function (contrId, depId, moId) {
        return this.http.get('/api/restrict/list?contrId=' + contrId + '&depId=' + depId + '&moId=' + moId).map(function (res) { return res.json(); });
    };
    RestrictService.prototype.saveModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(model);
        }
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/restrict', body, { headers: headers }).map(function (res) {
            if (res.ok) {
                return res.json();
            }
            else {
                return false;
            }
        });
    };
    RestrictService.prototype.deleteModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(false);
        }
        return this.http.delete('/api/restrict/' + model.departmentId + '/' + model.metaObjectId + '/' + model.objectId).map(function (res) { return res.ok; });
    };
    RestrictService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RestrictService);
    return RestrictService;
}());
exports.RestrictService = RestrictService;
var DataRestrictDataModel = (function () {
    function DataRestrictDataModel() {
    }
    return DataRestrictDataModel;
}());
exports.DataRestrictDataModel = DataRestrictDataModel;
var DataRestrictViewModel = (function (_super) {
    __extends(DataRestrictViewModel, _super);
    function DataRestrictViewModel() {
        _super.apply(this, arguments);
    }
    return DataRestrictViewModel;
}(DataRestrictDataModel));
exports.DataRestrictViewModel = DataRestrictViewModel;
//# sourceMappingURL=restrict.service.js.map