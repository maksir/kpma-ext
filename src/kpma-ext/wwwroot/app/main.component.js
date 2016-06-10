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
//import {RouteConfig, ROUTER_DIRECTIVES, RouterLink, ROUTER_PROVIDERS} from '@angular/router-deprecated';
var login_view_1 = require('./views/users/login.view');
var user_service_1 = require('./services/user.service');
var MainAppComponent = (function () {
    function MainAppComponent() {
    }
    MainAppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'main-app',
            template: "<h3>Asp Net Core + Angular2 App</h3>\n\t\t<user-login></user-login>\n\t",
            directives: [login_view_1.Login],
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [])
    ], MainAppComponent);
    return MainAppComponent;
}());
exports.MainAppComponent = MainAppComponent;
//# sourceMappingURL=main.component.js.map