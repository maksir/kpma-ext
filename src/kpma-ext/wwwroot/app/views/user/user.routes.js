"use strict";
var user_service_1 = require('../../services/user.service');
var user_list_view_1 = require('./user.list.view');
var user_login_view_1 = require('./user.login.view');
var user_sign_view_1 = require('./user.sign.view');
var user_edit_view_1 = require('./user.edit.view');
var role_list_view_1 = require('./role.list.view');
var user_profile_view_1 = require('./user.profile.view');
exports.UserRoutes = [
    { path: 'login', component: user_login_view_1.UserLogin },
    { path: 'login/:returnUrl', component: user_login_view_1.UserLogin },
    { path: 'signup', component: user_sign_view_1.UserSign },
    { path: 'user/list', component: user_list_view_1.UserList, canActivate: [user_service_1.UserService] },
    { path: 'role/list', component: role_list_view_1.RoleList, canActivate: [user_service_1.UserService] },
    { path: 'user/edit/:id', component: user_edit_view_1.UserEdit, canActivate: [user_service_1.UserService] },
    { path: 'user/profile', component: user_profile_view_1.UserProfile, canActivate: [user_service_1.UserService] }
];
//# sourceMappingURL=user.routes.js.map