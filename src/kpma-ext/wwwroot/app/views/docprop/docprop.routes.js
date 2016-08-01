"use strict";
var user_service_1 = require('../../services/user.service');
var docprop_list_view_1 = require('./docprop.list.view');
exports.DocPropRoutes = [
    { path: 'docprop/list', component: docprop_list_view_1.DocPropList, canActivate: [user_service_1.UserService] }
];
//# sourceMappingURL=docprop.routes.js.map