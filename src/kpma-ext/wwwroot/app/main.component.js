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
var MainAppComponent = (function () {
    function MainAppComponent(userSrv) {
        var _this = this;
        this.userSrv = userSrv;
        this.currentUser = new user_service_1.UserViewModel();
        userSrv.currentUser.subscribe(function (res) { return _this.currentUser = res; }, function (err) { return console.log(err); }, function () { return console.log('done'); });
    }
    MainAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'main-app',
            template: "<h4>Asp Net Core + Angular2 App</h4>\n\t\t\t\t<div>\n\t\t\t\t<a [routerLink]=\"['/signup']\">\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F</a>\n\t\t\t\t<a [routerLink]=\"['/login']\">\u0412\u0445\u043E\u0434</a>\n\t\t\t\t<a [routerLink]=\"['/user/list']\">\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439</a>\n\t\t\t\t<a [routerLink]=\"['/role/list']\">\u0421\u043F\u0438\u0441\u043E\u043A \u0440\u043E\u043B\u0435\u0439</a>\n\t\t\t\t{{currentUser.name}}\n\t\t\t\t</div>\n\t\t\t\t<router-outlet></router-outlet>\n\t",
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [select_service_1.SelectService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], MainAppComponent);
    return MainAppComponent;
}());
exports.MainAppComponent = MainAppComponent;
//# sourceMappingURL=main.component.js.map