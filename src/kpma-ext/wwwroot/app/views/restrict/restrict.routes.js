"use strict";
var user_service_1 = require('../../services/user.service');
var restrict_list_view_1 = require('./restrict.list.view');
exports.RestrictRoutes = [
    { path: 'restrict/list', component: restrict_list_view_1.RestrictList, canActivate: [user_service_1.UserService] }
];
//# sourceMappingURL=restrict.routes.js.map