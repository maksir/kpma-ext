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
var dropdown_control_1 = require('../../controls/dropdown/dropdown.control');
var UserEdit = (function () {
    function UserEdit(userSrv, router, route) {
        this.userSrv = userSrv;
        this.router = router;
        this.route = route;
        this.model = new user_service_1.UserViewModel();
        this.addRole = new user_service_1.UserRoleViewModel();
        this.userId = +this.route.snapshot.params['id'];
    }
    UserEdit.prototype.ngOnInit = function () {
        var _this = this;
        this.userSrv.userGet(this.userId).subscribe(function (res) {
            _this.model = res;
            _this.updateRoleList();
        }, function (err) { return console.log(err); });
    };
    UserEdit.prototype.updateRoleList = function () {
        var _this = this;
        this.userSrv.userRoles(this.userId).subscribe(function (res) { return _this.roleList = res; });
    };
    UserEdit.prototype.onBackBtn = function () {
        window.history.back();
    };
    UserEdit.prototype.onSubmit = function () {
        this.userSrv.userPost(this.model).subscribe(function (res) { }, function (err) { return console.log(err); });
    };
    UserEdit.prototype.onClickAddRole = function () {
        var _this = this;
        if (this.addRole.roleId) {
            this.userSrv.userRoleAdd(this.userId, this.addRole.roleId).subscribe(function (res) {
                _this.addRole.roleId = undefined;
                _this.updateRoleList();
            }, function (err) { return console.log(err); });
        }
    };
    UserEdit.prototype.onClickDelRole = function (r) {
        var _this = this;
        this.userSrv.userRoleDel(r).subscribe(function (res) {
            _this.updateRoleList();
        }, function (err) { return console.log(err); });
    };
    UserEdit = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-edit',
            templateUrl: 'user.edit.html',
            directives: [dropdown_control_1.DropDown, dropdown_control_1.DropDownVA]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router, router_1.ActivatedRoute])
    ], UserEdit);
    return UserEdit;
}());
exports.UserEdit = UserEdit;
//# sourceMappingURL=user.edit.view.js.map