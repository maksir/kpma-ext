"use strict";
var user_service_1 = require('../../services/user.service');
var service_list_view_1 = require('./service.list.view');
exports.ServiceRoutes = [
    { path: 'service/list', component: service_list_view_1.ServiceList, canActivate: [user_service_1.UserService] }
];
//# sourceMappingURL=service.routes.js.map