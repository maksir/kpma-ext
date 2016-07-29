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
var ChatService = (function () {
    function ChatService(http) {
        this.http = http;
    }
    ChatService.prototype.getList = function (metaObjectId, objectId, departmentId) {
        return this.http.get('/api/chat/list/' + metaObjectId + '/' + objectId + '/' + departmentId).map(function (res) { return res.json(); });
    };
    ChatService.prototype.getModel = function (id) {
        return this.http.get('/api/chat/' + id).map(function (res) { return res.json(); });
    };
    ChatService.prototype.saveModel = function (model) {
        if (!model) {
            return Rx_1.Observable.of(model);
        }
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/chat', body, { headers: headers }).map(function (res) {
            if (res.status == 200) {
                return res.json();
            }
            else {
                return false;
            }
        });
    };
    ChatService.prototype.deleteModel = function (id) {
        if (!id) {
            return Rx_1.Observable.of(false);
        }
        return this.http.delete('/api/chat/' + id).map(function (res) { return res.ok; });
    };
    ChatService.prototype.markAsReaded = function (metaObjectId, objectId, departmentId) {
        if (!metaObjectId || !objectId || !departmentId) {
            return Rx_1.Observable.of(false);
        }
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/chat/read/' + metaObjectId + '/' + objectId + '/' + departmentId, '', { headers: headers }).map(function (res) { return res.ok; });
    };
    ChatService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ChatService);
    return ChatService;
}());
exports.ChatService = ChatService;
var ChatDateModel = (function () {
    function ChatDateModel() {
    }
    return ChatDateModel;
}());
exports.ChatDateModel = ChatDateModel;
var ChatViewModel = (function (_super) {
    __extends(ChatViewModel, _super);
    function ChatViewModel() {
        _super.apply(this, arguments);
    }
    return ChatViewModel;
}(ChatDateModel));
exports.ChatViewModel = ChatViewModel;
//# sourceMappingURL=chat.service.js.map