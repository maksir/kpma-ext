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
var common_1 = require('@angular/common');
//import {ROUTER_DIRECTIVES} from '@angular/router';
var chat_service_1 = require('../../services/chat.service');
var user_service_1 = require('../../services/user.service');
var main_component_1 = require('../../main.component');
var Chat = (function () {
    function Chat(chatSrv, mainComp) {
        this.chatSrv = chatSrv;
        this.mainComp = mainComp;
        //@Input() userId: number;
        this.list = [];
        this.user = new user_service_1.UserViewModel();
        this.addModel = new chat_service_1.ChatDateModel();
        this.user = mainComp.currentUser;
    }
    Chat.prototype.ngOnInit = function () {
    };
    Chat.prototype.ngOnChanges = function (changes) {
        this.refreshList();
        if (changes['departmentId']) {
            this.addModel.departmentId = this.departmentId;
        }
        if (changes['metaObjectId']) {
            this.addModel.metaObjectId = this.metaObjectId;
        }
        if (changes['objectId']) {
            this.addModel.objectId = this.objectId;
        }
    };
    Chat.prototype.refreshList = function () {
        var _this = this;
        if (!this.metaObjectId || !this.objectId) {
            this.list = [];
        }
        this.chatSrv.getList(this.metaObjectId, this.objectId).subscribe(function (res) { return _this.list = res; }, function (err) { return console.log(err); });
    };
    Chat.prototype.onAdd = function () {
        var _this = this;
        if (!this.addModel.messageText || !this.addModel.metaObjectId || !this.addModel.objectId) {
            return;
        }
        this.chatSrv.saveModel(this.addModel).subscribe(function (res) {
            _this.refreshList();
            _this.addModel.messageText = '';
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Chat.prototype, "metaObjectId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Chat.prototype, "objectId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Chat.prototype, "departmentId", void 0);
    Chat = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'chat',
            templateUrl: 'chat.html',
            directives: [common_1.CORE_DIRECTIVES],
            providers: [chat_service_1.ChatService]
        }), 
        __metadata('design:paramtypes', [chat_service_1.ChatService, main_component_1.MainAppComponent])
    ], Chat);
    return Chat;
}());
exports.Chat = Chat;
//# sourceMappingURL=chat.component.js.map