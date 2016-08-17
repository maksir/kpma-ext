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
var forms_1 = require('@angular/forms');
//import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
//import {RouteData, Router} from '@angular/router-deprecated';
var user_service_1 = require('../../services/user.service');
var dropdown_control_1 = require('../../controls/dropdown/dropdown.control');
var UserSign = (function () {
    function UserSign(userSrv) {
        this.userSrv = userSrv;
        this.regForm = new forms_1.FormGroup({
            name: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]),
            email: new forms_1.FormControl('', forms_1.Validators.required),
            password: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]),
            confirmPassword: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(6)]),
            contractorId: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    UserSign.prototype.onSubmit = function () {
        if (this.regForm.value.password != this.regForm.value.confirmPassword) {
            this.regForm.controls['confirmPassword'].setErrors({ 'notEquals': true });
            return;
        }
        if (!this.regForm.valid) {
            return;
        }
        this.userSrv.sign(this.regForm.value).subscribe(function (result) { }, function (err) { }, function () { });
    };
    UserSign = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-sign',
            templateUrl: 'user.sign.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES, dropdown_control_1.DropDown, dropdown_control_1.DropDownVA]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], UserSign);
    return UserSign;
}());
exports.UserSign = UserSign;
//# sourceMappingURL=user.sign.view.js.map