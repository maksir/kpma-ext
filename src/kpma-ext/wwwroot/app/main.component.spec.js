"use strict";
var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var main_component_1 = require('./main.component');
var user_service_1 = require('./services/user.service');
testing_1.beforeEachProviders(function () { return [main_component_1.MainAppComponent, user_service_1.UserService, http_1.HTTP_PROVIDERS]; });
testing_1.describe('App: Ng2cli01', function () {
    testing_1.it('should create the app', testing_1.inject([main_component_1.MainAppComponent], function (app) {
        testing_1.expect(app).toBeTruthy();
    }));
    testing_1.it('should have as title \'app works!\'', testing_1.inject([main_component_1.MainAppComponent], function (app) {
        testing_1.expect(app.currentUser).toBeTruthy();
    }));
});
//# sourceMappingURL=main.component.spec.js.map