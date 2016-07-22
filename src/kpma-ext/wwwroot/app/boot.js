/// <reference path="../../typings/globals/core-js/index.d.ts" />
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
//import {DomSanitizationService} from '@angular/platform-browser';
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var main_routes_1 = require('./main.routes');
var user_service_1 = require('./services/user.service');
var main_component_1 = require('./main.component');
require('./common/datetime.js');
//enableProdMode();
platform_browser_dynamic_1.bootstrap(main_component_1.MainAppComponent, [
    //DomSanitizationService,
    http_1.HTTP_PROVIDERS,
    user_service_1.UserService,
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    main_routes_1.APP_ROUTER_PROVIDERS
])
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=boot.js.map