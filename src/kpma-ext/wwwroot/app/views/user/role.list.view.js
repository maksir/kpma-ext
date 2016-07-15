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
var menu_service_1 = require('../../services/menu.service');
var dropdown_control_1 = require('../../controls/dropdown/dropdown.control');
var RoleList = (function () {
    function RoleList(userSrv, menuSrv) {
        this.userSrv = userSrv;
        this.menuSrv = menuSrv;
        this.roleList = [];
        this.insertRole = new user_service_1.RoleViewModel();
        this.menuList = [];
        this.menuItems = [];
        this.addMenuId = undefined;
    }
    RoleList.prototype.ngOnInit = function () {
        this.updateRoleList();
    };
    RoleList.prototype.updateRoleList = function () {
        var _this = this;
        this.userSrv.roleList().subscribe(function (res) { return _this.roleList = res; }, function (err) { return console.log(err); });
    };
    RoleList.prototype.onUpdaleRoleList = function () {
        this.editRole = undefined;
        this.selectedRole = undefined;
        this.updateRoleList();
        this.updateMenuList();
    };
    RoleList.prototype.onAddRole = function () {
        var _this = this;
        this.userSrv.rolePost(this.insertRole).subscribe(function (res) {
            _this.insertRole = new user_service_1.RoleViewModel();
            _this.updateRoleList();
        }, function (err) {
            console.log(err);
        });
    };
    RoleList.prototype.onEditRole = function (r) {
        this.editRole = r;
    };
    RoleList.prototype.onSaveRole = function () {
        var _this = this;
        if (this.editRole) {
            this.userSrv.rolePost(this.editRole).subscribe(function (res) {
                _this.updateRoleList();
                _this.editRole = undefined;
            }, function (err) { return console.log(err); });
        }
    };
    RoleList.prototype.onCancelRole = function () {
        this.editRole = undefined;
        this.updateRoleList();
    };
    RoleList.prototype.onSelectRole = function (r) {
        this.selectedRole = r;
        this.addMenuId = undefined;
        this.updateMenuList();
        this.updateMenuItemsList();
    };
    RoleList.prototype.updateMenuList = function () {
        var _this = this;
        if (!this.selectedRole) {
            this.menuList = [];
            return;
        }
        this.userSrv.roleMenuList(this.selectedRole.id).subscribe(function (res) { return _this.menuList = res; }, function (err) { return console.error(err); });
    };
    RoleList.prototype.updateMenuItemsList = function () {
        var _this = this;
        if (!this.selectedRole) {
            this.menuItems = [];
        }
        else {
            this.userSrv.menuItemList(this.selectedRole.id).subscribe(function (res) { return _this.menuItems = res; }, function (err) { return console.log(err); });
        }
    };
    RoleList.prototype.onAddMenu = function () {
        var _this = this;
        if (!this.addMenuId || !this.selectedRole) {
            return;
        }
        this.userSrv.roleMenuAdd(this.selectedRole.id, this.addMenuId).subscribe(function (res) {
            _this.addMenuId = undefined;
            _this.updateMenuList();
            _this.updateMenuItemsList();
        }, function (err) { return console.log(err); });
    };
    RoleList.prototype.onDeleteMenu = function (menu) {
        var _this = this;
        if (!menu) {
            return;
        }
        this.userSrv.roleMenuDelete(menu).subscribe(function (res) {
            _this.updateMenuList();
            _this.updateMenuItemsList();
        }, function (err) { return console.log(err); });
    };
    RoleList = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'role-list',
            templateUrl: 'role.list.html',
            directives: [dropdown_control_1.DropDown, dropdown_control_1.DropDownVA],
            providers: [menu_service_1.MenuService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, menu_service_1.MenuService])
    ], RoleList);
    return RoleList;
}());
exports.RoleList = RoleList;
//# sourceMappingURL=role.list.view.js.map