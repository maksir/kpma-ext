/// <reference path="../../typings/globals/core-js/index.d.ts" />
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var router_deprecated_1 = require('@angular/router-deprecated');
var main_component_1 = require('./main.component');
platform_browser_dynamic_1.bootstrap(main_component_1.MainAppComponent, [http_1.HTTP_PROVIDERS, router_deprecated_1.ROUTER_PROVIDERS]);
//# sourceMappingURL=boot.js.map