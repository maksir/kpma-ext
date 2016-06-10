/// <reference path="../../typings/globals/core-js/index.d.ts" />

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {MainAppComponent} from './main.component';



bootstrap(MainAppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);