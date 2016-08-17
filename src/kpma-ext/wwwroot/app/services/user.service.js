"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        this.retSubj = new Rx_1.Subject();
    }
    UserService.prototype.canActivate = function (route, state) {
        var _this = this;
        if (this.isLoggetIn()) {
            return Rx_1.Observable.create(function (observer) {
                _this.http.get('/api/user/permitions?url=' + route.url[0]).subscribe(function (res) {
                    route.params['permitions'] = res.json();
                    observer.next(true);
                }, function (err) {
                    route.params['permitions'] = new Permitions();
                    observer.next(false);
                }, function () {
                    observer.complete();
                });
            });
        }
        else {
            return Rx_1.Observable.create(function (observer) {
                _this.http.get('/api/user/current').subscribe(function (res) {
                    if (res.status == 200) {
                        _this.loggetIn = true;
                        _this._currentUser.next(res.json());
                        route.params['mo'] = 4;
                        observer.next(true);
                    }
                    else {
                        _this.loggetIn = false;
                        _this.router.navigateByUrl('/login?returnUrl=' + state.url);
                        observer.next(false);
                    }
                }, function (err) {
                    _this.loggetIn = false;
                    _this.router.navigateByUrl('/login?returnUrl=' + state.url);
                    observer.next(false);
                }, function () {
                    observer.complete();
                });
            });
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
            _this.loggetIn = res.ok;
            if (_this.loggetIn) {
                _this._currentUser.next(res.json());
            }
            return _this.loggetIn;
        });
    };
    UserService.prototype.logout = function () {
        this._currentUser.next(undefined);
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/user/logout', '', { headers: headers }).map(function (res) { return res.ok; });
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
    UserService.prototype.roleMenuList = function (roleId) {
        return this.http.get('/api/role/menu/' + roleId).map(function (res) { return res.json(); });
    };
    UserService.prototype.menuItemList = function (roleId) {
        return this.http.get('/api/role/menu/items/' + roleId).map(function (res) { return res.json(); });
    };
    UserService.prototype.roleMenuAdd = function (roleId, menuId) {
        return this.http.post('/api/role/menu/' + roleId + "/" + menuId, '').map(function (res) { return res.ok; });
    };
    UserService.prototype.roleMenuDelete = function (model) {
        return this.http.delete('/api/role/menu/' + model.roleId + '/' + model.menuId).map(function (res) { return res.ok; });
    };
    UserService.prototype.isLoggetIn = function () {
        return this.loggetIn;
    };
    // UserDepartment
    UserService.prototype.getUserDepList = function (userId) {
        return this.http.get('/api/user/dep/' + userId).map(function (res) { return res.json(); });
    };
    UserService.prototype.saveUserDep = function (userId, depId) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/json'
        });
        return this.http.post('/api/user/dep/' + userId + '/' + depId, '', { headers: headers }).map(function (res) { return res.ok; });
    };
    UserService.prototype.deleteUserDep = function (userId, depId) {
        return this.http.delete('/api/user/dep/' + userId + '/' + depId).map(function (res) { return res.ok; });
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
        this.rememberMe = false;
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
var DepartmentDataModel = (function () {
    function DepartmentDataModel() {
    }
    return DepartmentDataModel;
}());
exports.DepartmentDataModel = DepartmentDataModel;
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
var RoleMenuViewModel = (function () {
    function RoleMenuViewModel() {
    }
    return RoleMenuViewModel;
}());
exports.RoleMenuViewModel = RoleMenuViewModel;
var UserDepDataModel = (function () {
    function UserDepDataModel() {
    }
    return UserDepDataModel;
}());
exports.UserDepDataModel = UserDepDataModel;
var UserDepViewModel = (function (_super) {
    __extends(UserDepViewModel, _super);
    function UserDepViewModel() {
        _super.apply(this, arguments);
    }
    return UserDepViewModel;
}(UserDepDataModel));
exports.UserDepViewModel = UserDepViewModel;
var Permitions = (function () {
    function Permitions() {
    }
    return Permitions;
}());
exports.Permitions = Permitions;
//# sourceMappingURL=user.service.js.map