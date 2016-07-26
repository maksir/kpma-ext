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
var router_1 = require('@angular/router');
var select_service_1 = require('./services/select.service');
var user_service_1 = require('./services/user.service');
var attachment_service_1 = require('./services/attachment.service');
var shadowbox_directive_1 = require('./directives/shadowbox.directive');
var menu_component_1 = require('./components/menu/menu.component');
var MainAppComponent = (function () {
    function MainAppComponent(userSrv) {
        var _this = this;
        this.userSrv = userSrv;
        this.currentUser = new user_service_1.UserViewModel();
        this.freeze = false;
        userSrv.currentUser.subscribe(function (res) { return _this.currentUser = res; }, function (err) { return console.log(err); }, function () { return console.log('done'); });
    }
    MainAppComponent.prototype.onChange = function () {
        this.freeze = !this.freeze;
        return false;
    };
    MainAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'main-app',
            template: "<main-menu></main-menu><router-outlet></router-outlet>",
            directives: [router_1.ROUTER_DIRECTIVES, shadowbox_directive_1.ShadowBoxDirective, menu_component_1.Menu],
            providers: [select_service_1.SelectService, attachment_service_1.AttachmentService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], MainAppComponent);
    return MainAppComponent;
}());
exports.MainAppComponent = MainAppComponent;
//# sourceMappingURL=main.component.js.map