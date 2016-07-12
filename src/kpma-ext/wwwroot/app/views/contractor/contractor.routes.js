"use strict";
var user_service_1 = require('../../services/user.service');
var contractor_list_view_1 = require('./contractor.list.view');
var contractor_edit_view_1 = require('./contractor.edit.view');
exports.ContractorRoutes = [
    { path: 'contractor/list', component: contractor_list_view_1.ContractorList, canActivate: [user_service_1.UserService] },
    { path: 'contractor/edit/:id', component: contractor_edit_view_1.ContractorEdit, canActivate: [user_service_1.UserService] }
];
//# sourceMappingURL=contractor.routes.js.map