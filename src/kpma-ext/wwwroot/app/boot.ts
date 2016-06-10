/// <reference path="../../typings/globals/core-js/index.d.ts" />

import {bootstrap}    from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';

import {MainAppComponent} from './main.component';



bootstrap(MainAppComponent, [HTTP_PROVIDERS]);