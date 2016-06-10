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
var router_deprecated_1 = require('@angular/router-deprecated');
var user_service_1 = require('../../services/user.service');
var Login = (function () {
    function Login(userSrv, //private data: RouteData,
        router) {
        //this.returnUrl = data.get('returnUrl');
        this.userSrv = userSrv;
        this.router = router;
        this.model = new user_service_1.UserLoginModel();
        this.returnUrl = '';
        this.loginForm = new common_1.ControlGroup({
            email: new common_1.Control('', common_1.Validators.required),
            password: new common_1.Control('', common_1.Validators.required),
            rememberMe: new common_1.Control('')
        });
    }
    Login.prototype.onSubmit = function () {
        var _this = this;
        this.userSrv.login(this.model).subscribe(function (result) {
            if (result && _this.returnUrl && _this.returnUrl.length > 0) {
                _this.router.navigateByUrl(_this.returnUrl, false);
            }
        }, function (err) {
            alert(err);
        });
    };
    Login = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-login',
            templateUrl: 'login.html',
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_deprecated_1.Router])
    ], Login);
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.view.js.map