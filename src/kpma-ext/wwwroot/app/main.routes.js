"use strict";
var router_1 = require('@angular/router');
var contractor_routes_1 = require('./views/contractor/contractor.routes');
var metaobject_routes_1 = require('./views/metaobject/metaobject.routes');
var user_routes_1 = require('./views/user/user.routes');
var routes = user_routes_1.UserRoutes.concat(contractor_routes_1.ContractorRoutes, metaobject_routes_1.MetaObjectRoutes, [
    { path: '', redirectTo: '/login', terminal: true }
]);
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=main.routes.js.map