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
//import {RouteData, Router} from '@angular/router-deprecated';
var user_service_1 = require('../../services/user.service');
var Sign = (function () {
    function Sign(fb, userSrv) {
        this.fb = fb;
        this.userSrv = userSrv;
        this.model = new user_service_1.UserSignModel();
        this.regForm = new common_1.ControlGroup({
            Name: new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(3)])),
            Email: new common_1.Control('', common_1.Validators.required),
            Password: new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(6)])),
            ConfirmPassword: new common_1.Control('', common_1.Validators.required)
        });
    }
    Sign.prototype.onSubmit = function () {
        if (this.model.password != this.model.confirmPassword) {
            this.regForm.controls['confirmPassword'].setErrors({ 'notEquals': true });
            return;
        }
        if (!this.regForm.valid) {
            return;
        }
        this.userSrv.sign(this.model).subscribe(function (result) { }, function (err) { }, function () { });
    };
    Sign = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-sign',
            templateUrl: 'sign.html',
            directives: [common_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, user_service_1.UserService])
    ], Sign);
    return Sign;
}());
exports.Sign = Sign;
//# sourceMappingURL=sign.view.js.map