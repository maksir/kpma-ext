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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
var UserService = (function () {
    function UserService(http, router) {
        this.http = http;
        this.router = router;
        this.loggetIn = false;
        this._currentUser = new Rx_1.Subject();
        this.currentUser = this._currentUser.asObservable();
    }
    UserService.prototype.canActivate = function (route, state) {
        if (this.isLoggetIn()) {
            return Rx_1.Observable.of(true);
        }
        else {
            this.router.navigateByUrl('/login?returnUrl=' + state.url);
            return Rx_1.Observable.of(false);
        }
    };
    UserService.prototype.sign = function (model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/user/sign', body, { headers: headers });
    };
    UserService.prototype.login = function (model) {
        var _this = this;
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/user/login', body, { headers: headers })
            .map(function (res) {
            _this.loggetIn = res.status == 200;
            if (_this.loggetIn) {
                _this._currentUser.next(res.json());
            }
            return _this.loggetIn;
        });
    };
    UserService.prototype.logout = function () {
    };
    UserService.prototype.userGet = function (id) {
        return this.http.get('/api/user/' + id).map(function (res) { return res.json(); });
    };
    UserService.prototype.userPost = function (model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/user', body, { headers: headers })
            .map(function (res) {
            return res.status == 200;
        });
    };
    UserService.prototype.userList = function () {
        return this.http.get('/api/user/list').map(function (res) { return res.json(); });
    };
    UserService.prototype.userRoles = function (userId) {
        return this.http.get('/api/user/roles/' + userId).map(function (res) { return res.json(); });
    };
    UserService.prototype.userRoleAdd = function (userId, roleId) {
        var model = new UserRoleViewModel();
        model.roleId = roleId;
        model.userId = userId;
        model.userName = '';
        model.roleName = '';
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/user/roles', body, { headers: headers })
            .map(function (res) {
            return res.status == 200;
        });
    };
    UserService.prototype.userRoleDel = function (model) {
        return this.http.delete('/api/user/roles/' + model.userId + '/' + model.roleId)
            .map(function (res) {
            return res.status == 200;
        });
    };
    UserService.prototype.roleGet = function (id) {
        return this.http.get('/api/role/' + id).map(function (res) { return res.json(); });
    };
    UserService.prototype.rolePost = function (model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/role', body, { headers: headers })
            .map(function (res) {
            return res.status == 200;
        });
    };
    UserService.prototype.roleList = function () {
        return this.http.get('/api/role/list').map(function (res) { return res.json(); });
    };
    UserService.prototype.menuList = function () {
        return this.http.get('/api/menu/list').map(function (res) { return res.json(); });
    };
    UserService.prototype.isLoggetIn = function () {
        return this.loggetIn;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
var UserSignModel = (function () {
    function UserSignModel() {
    }
    return UserSignModel;
}());
exports.UserSignModel = UserSignModel;
var UserLoginModel = (function () {
    function UserLoginModel() {
        this.rememeberMe = false;
    }
    return UserLoginModel;
}());
exports.UserLoginModel = UserLoginModel;
var UserViewModel = (function () {
    function UserViewModel() {
    }
    return UserViewModel;
}());
exports.UserViewModel = UserViewModel;
var RoleViewModel = (function () {
    function RoleViewModel() {
    }
    return RoleViewModel;
}());
exports.RoleViewModel = RoleViewModel;
var UserRoleViewModel = (function () {
    function UserRoleViewModel() {
    }
    return UserRoleViewModel;
}());
exports.UserRoleViewModel = UserRoleViewModel;
var MenuModel = (function () {
    function MenuModel() {
    }
    return MenuModel;
}());
exports.MenuModel = MenuModel;
//# sourceMappingURL=user.service.js.map