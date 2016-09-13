"use strict";
var router_1 = require('@angular/router');
var user_service_1 = require('./services/user.service');
var contractor_routes_1 = require('./views/contractor/contractor.routes');
var metaobject_routes_1 = require('./views/metaobject/metaobject.routes');
var user_routes_1 = require('./views/user/user.routes');
var menu_routes_1 = require('./views/menu/menu.routes');
var doctype_routes_1 = require('./views/doctype/doctype.routes');
var service_routes_1 = require('./views/service/service.routes');
var doccard_routes_1 = require('./views/doccard/doccard.routes');
var docprop_routes_1 = require('./views/docprop/docprop.routes');
var restrict_routes_1 = require('./views/restrict/restrict.routes');
var report_routes_1 = require('./views/report/report.routes');
var dashboard_view_1 = require('./views/dashboard/dashboard.view');
var sandbox_view_1 = require('./views/sandbox/sandbox.view');
var routes = user_routes_1.UserRoutes.concat(contractor_routes_1.ContractorRoutes, metaobject_routes_1.MetaObjectRoutes, menu_routes_1.MenuRoutes, doctype_routes_1.DocTypeRoutes, service_routes_1.ServiceRoutes, doccard_routes_1.DocCardRoutes, docprop_routes_1.DocPropRoutes, restrict_routes_1.RestrictRoutes, report_routes_1.ReportRoutes, [
    { path: 'dashboard', component: dashboard_view_1.Dashboard, canActivate: [user_service_1.UserService] },
    { path: 'sandbox', component: sandbox_view_1.SandBox, canActivate: [user_service_1.UserService] },
    { path: '', redirectTo: '/login', terminal: true }
]);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=main.routes.js.map