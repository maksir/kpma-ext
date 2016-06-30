/// <reference path="../../typings/globals/core-js/index.d.ts" />

import {bootstrap} from '@angular/platform-browser-dynamic';
import {disableDeprecatedForms, provideForms } from '@angular/forms';
import {provide} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

import {APP_ROUTER_PROVIDERS} from './main.routes';

import {UserService} from './services/user.service';

import {MainAppComponent} from './main.component';


bootstrap(MainAppComponent, [
	HTTP_PROVIDERS,
	disableDeprecatedForms(),
	provideForms(),
	APP_ROUTER_PROVIDERS,
	UserService
])
.catch(err => console.error(err));