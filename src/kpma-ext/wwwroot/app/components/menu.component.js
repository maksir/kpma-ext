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
var router_1 = require('@angular/router');
var user_service_1 = require('../services/user.service');
var Menu = (function () {
    function Menu(userSrv) {
        this.userSrv = userSrv;
    }
    Menu.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.userSrv.currentUser.subscribe(function (res) {
            _this.currentUser = res;
            _this.updateMenu();
        }, function (err) { return console.log(err); });
    };
    Menu.prototype.updateMenu = function () {
        if (this.userSrv.isLoggetIn()) {
            this.userSrv.menuList();
        }
    };
    Menu = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'main-menu',
            templateUrl: 'menu.html',
            directives: [common_1.CORE_DIRECTIVES, router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], Menu);
    return Menu;
}());
exports.Menu = Menu;
//# sourceMappingURL=menu.component.js.map