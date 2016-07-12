"use strict";
var user_service_1 = require('../../services/user.service');
var metaobject_list_view_1 = require('./metaobject.list.view');
var metaobject_edit_view_1 = require('./metaobject.edit.view');
exports.MetaObjectRoutes = [
    { path: 'metaobject/list', component: metaobject_list_view_1.MetaObjectList, canActivate: [user_service_1.UserService] },
    { path: 'metaobject/edit/:id', component: metaobject_edit_view_1.MetaObjectEdit, canActivate: [user_service_1.UserService] },
    { path: 'metaobject/edit/:id/:mode', component: metaobject_edit_view_1.MetaObjectEdit, canActivate: [user_service_1.UserService] },
    { path: 'metaobject/edit/:id/:mode/:parentId', component: metaobject_edit_view_1.MetaObjectEdit, canActivate: [user_service_1.UserService] },
];
//# sourceMappingURL=metaobject.routes.js.map