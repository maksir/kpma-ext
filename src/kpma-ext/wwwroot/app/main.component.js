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
/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var Rx_1 = require('rxjs/Rx');
var select_service_1 = require('./services/select.service');
var user_service_1 = require('./services/user.service');
var attachment_service_1 = require('./services/attachment.service');
var menu_component_1 = require('./components/menu/menu.component');
var MainAppComponent = (function () {
    function MainAppComponent(userSrv) {
        var _this = this;
        this.userSrv = userSrv;
        this.currentUser = new user_service_1.UserViewModel();
        this.errorMessage = '';
        this.messageClass = '';
        this.messageHeader = '';
        this.messageBody = '';
        this._ok = new Rx_1.Subject();
        this.ok = this._ok.asObservable();
        userSrv.currentUser.subscribe(function (res) { return _this.currentUser = res; }, function (err) { return console.log(err); }, function () { return console.log('done'); });
    }
    MainAppComponent.prototype.showError = function (errorMessage) {
        this.errorMessage = errorMessage;
        $('#errorModal').modal('show');
    };
    MainAppComponent.prototype.showMessage = function (messageClass, messageHeader, messageBode) {
        this.messageHeader = messageHeader;
        this.messageClass = messageClass;
        this.messageBody = messageBode;
        $('#messageModal').modal('show');
    };
    MainAppComponent.prototype.onQuestCancelClick = function () {
        if (!this._ok.isUnsubscribed) {
            this._ok.next(false);
            this._ok.complete();
        }
    };
    MainAppComponent.prototype.onQuestOkClick = function () {
        if (!this._ok.isUnsubscribed) {
            this._ok.next(true);
            this._ok.complete();
        }
    };
    MainAppComponent.prototype.showQuestion = function (questText) {
        $('#questModal').modal('show');
        $('#questModal').on('hide.bs.modal', this.onQuestCancelClick.bind(this));
        return this.ok;
    };
    MainAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'main-app',
            templateUrl: 'main.html',
            directives: [router_1.ROUTER_DIRECTIVES, menu_component_1.Menu],
            providers: [select_service_1.SelectService, attachment_service_1.AttachmentService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], MainAppComponent);
    return MainAppComponent;
}());
exports.MainAppComponent = MainAppComponent;
//# sourceMappingURL=main.component.js.map