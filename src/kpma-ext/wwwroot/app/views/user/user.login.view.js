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
var user_service_1 = require('../../services/user.service');
var recaptcha_component_1 = require('../../components/recaptcha.component');
var UserLogin = (function () {
    function UserLogin(route, userSrv, //private data: RouteData,
        router) {
        var _this = this;
        this.route = route;
        this.userSrv = userSrv;
        this.router = router;
        this.model = new user_service_1.UserLoginModel();
        //loginForm: ControlGroup;
        this.returnUrl = '';
        this.captchaSuccess = false;
        this.router.routerState.queryParams.subscribe(function (params) { return _this.returnUrl = params['returnUrl']; }, function (err) { return console.log(err); });
        //this.loginForm = new ControlGroup({
        //	email: new Control('', Validators.required),
        //	password: new Control('', Validators.required),
        //	rememberMe: new Control('')
        //});
    }
    UserLogin.prototype.onClick = function (f) {
        var val = f.value;
    };
    UserLogin.prototype.onReCaptcha = function ($event) {
        this.captchaSuccess = true;
    };
    UserLogin.prototype.onSubmit = function () {
        var _this = this;
        this.userSrv.login(this.model).subscribe(function (result) {
            if (result && _this.returnUrl && _this.returnUrl.length > 0) {
                _this.router.navigateByUrl(_this.returnUrl);
            }
            else {
                _this.router.navigateByUrl('/dashboard');
            }
        }, function (err) {
            alert(err);
        });
    };
    UserLogin = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-login',
            templateUrl: 'user.login.html',
            directives: [recaptcha_component_1.ReCaptchaComponent]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, user_service_1.UserService, router_1.Router])
    ], UserLogin);
    return UserLogin;
}());
exports.UserLogin = UserLogin;
//# sourceMappingURL=user.login.view.js.map