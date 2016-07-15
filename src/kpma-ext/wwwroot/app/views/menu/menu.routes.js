"use strict";
var user_service_1 = require('../../services/user.service');
var menu_list_view_1 = require('./menu.list.view');
exports.MenuRoutes = [
    { path: 'menu/list', component: menu_list_view_1.MenuList, canActivate: [user_service_1.UserService] }
];
//# sourceMappingURL=menu.routes.js.map