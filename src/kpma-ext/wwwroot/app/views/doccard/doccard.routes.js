"use strict";
var user_service_1 = require('../../services/user.service');
var doccard_list_view_1 = require('./doccard.list.view');
var doccard_edit_view_1 = require('./doccard.edit.view');
var doccard_tree_view_1 = require('./doccard.tree.view');
exports.DocCardRoutes = [
    { path: 'doccard/list', component: doccard_list_view_1.DocCardList, canActivate: [user_service_1.UserService] },
    { path: 'doccard/tree', component: doccard_tree_view_1.DocCardTree, canActivate: [user_service_1.UserService] },
    { path: 'doccard/edit/:id', component: doccard_edit_view_1.DocCardEdit, canActivate: [user_service_1.UserService] },
    { path: 'doccard/edit/:id/:mode', component: doccard_edit_view_1.DocCardEdit, canActivate: [user_service_1.UserService] },
];
//# sourceMappingURL=doccard.routes.js.map