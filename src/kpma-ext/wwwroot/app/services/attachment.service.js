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
var AttachmentService = (function () {
    function AttachmentService(http) {
        this.http = http;
    }
    AttachmentService.prototype.getList = function (metaObjectId, objectId) {
        return this.http.get('/api/attachment/list/' + metaObjectId + '/' + objectId).map(function (res) { return res.json(); });
    };
    AttachmentService.prototype.getModel = function (id) {
        return this.http.get('/api/attachment/' + id).map(function (res) { return res.json(); });
    };
    AttachmentService.prototype.saveModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(false);
        }
        return Rx_1.Observable.create(function (observer) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            formData.append("id", model.id);
            formData.append("name", model.name);
            formData.append("metaObjectId", model.metaObjectId);
            formData.append("objectId", model.objectId);
            if (model.file) {
                formData.append("file", model.file, model.file.name);
            }
            else {
                formData.append("file", null);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(true);
                        observer.complete();
                    }
                    else {
                        observer.next(false);
                        observer.complete();
                    }
                }
            };
            xhr.open('POST', '/api/attachment', true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.withCredentials = true;
            xhr.send(formData);
        });
    };
    AttachmentService.prototype.deleteModel = function (id) {
        if (!id) {
            return Rx_1.Observable.of(false);
        }
        return this.http.delete('/api/attachment/' + id).map(function (res) { return res.ok; });
    };
    AttachmentService.prototype.upload = function (model) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            formData.append("name", model.name);
            formData.append("file", model.file, model.file.name);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', '/api/attachment/upload', true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.withCredentials = true;
            xhr.send(formData);
        });
    };
    AttachmentService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AttachmentService);
    return AttachmentService;
}());
exports.AttachmentService = AttachmentService;
var AttachmentDataModel = (function () {
    function AttachmentDataModel() {
    }
    return AttachmentDataModel;
}());
exports.AttachmentDataModel = AttachmentDataModel;
var AttachmentViewModel = (function () {
    function AttachmentViewModel() {
    }
    return AttachmentViewModel;
}());
exports.AttachmentViewModel = AttachmentViewModel;
//# sourceMappingURL=attachment.service.js.map