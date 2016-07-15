"use strict";
var user_service_1 = require('../../services/user.service');
var doctype_list_view_1 = require('./doctype.list.view');
exports.DocTypeRoutes = [
    { path: 'doctype/list', component: doctype_list_view_1.DocTypeList, canActivate: [user_service_1.UserService] }
];
//# sourceMappingURL=doctype.routes.js.map