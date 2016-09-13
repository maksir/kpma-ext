"use strict";
var user_service_1 = require('../../services/user.service');
var clreport_view_1 = require('./clreport.view');
exports.ReportRoutes = [
    { path: 'report/clr', component: clreport_view_1.ClientRequestReport, canActivate: [user_service_1.UserService] }
];
//# sourceMappingURL=report.routes.js.map