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
var user_service_1 = require('../../services/user.service');
var RoleList = (function () {
    function RoleList(userSrv) {
        this.userSrv = userSrv;
        this.roleList = [];
        this.insertRole = new user_service_1.RoleViewModel();
    }
    RoleList.prototype.ngOnInit = function () {
        this.updateRoleList();
    };
    RoleList.prototype.updateRoleList = function () {
        var _this = this;
        this.userSrv.roleList().subscribe(function (res) { return _this.roleList = res; }, function (err) { return console.log(err); });
    };
    RoleList.prototype.onUpdaleList = function () {
        this.editRole = undefined;
        this.updateRoleList();
    };
    RoleList.prototype.onClickAdd = function () {
        var _this = this;
        this.userSrv.rolePost(this.insertRole).subscribe(function (res) {
            _this.insertRole = new user_service_1.RoleViewModel();
            _this.updateRoleList();
        }, function (err) {
            console.log(err);
        });
    };
    RoleList.prototype.onClickEdit = function (r) {
        this.editRole = r;
    };
    RoleList.prototype.onClickSave = function () {
        var _this = this;
        if (this.editRole) {
            this.userSrv.rolePost(this.editRole).subscribe(function (res) {
                _this.updateRoleList();
                _this.editRole = undefined;
            }, function (err) { return console.log(err); });
        }
    };
    RoleList.prototype.onClickCancel = function () {
        this.editRole = undefined;
        this.updateRoleList();
    };
    RoleList = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'role-list',
            templateUrl: 'rolelist.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], RoleList);
    return RoleList;
}());
exports.RoleList = RoleList;
//# sourceMappingURL=rolelist.view.js.map