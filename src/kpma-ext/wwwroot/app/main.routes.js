"use strict";
var router_1 = require('@angular/router');
var user_service_1 = require('./services/user.service');
var userlist_view_1 = require('./views/user/userlist.view');
var userlogin_view_1 = require('./views/user/userlogin.view');
var usersign_view_1 = require('./views/user/usersign.view');
var useredit_view_1 = require('./views/user/useredit.view');
var rolelist_view_1 = require('./views/user/rolelist.view');
var routes = [
    { path: '', redirectTo: '/login', terminal: true },
    { path: 'login', component: userlogin_view_1.UserLogin },
    { path: 'login/:returnUrl', component: userlogin_view_1.UserLogin },
    { path: 'signup', component: usersign_view_1.UserSign },
    { path: 'user/list', component: userlist_view_1.UserList, canActivate: [user_service_1.UserService] },
    { path: 'role/list', component: rolelist_view_1.RoleList, canActivate: [user_service_1.UserService] },
    { path: 'user/edit/:id', component: useredit_view_1.UserEdit, canActivate: [user_service_1.UserService] }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=main.routes.js.map