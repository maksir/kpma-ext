/// <reference path="../../typings/globals/core-js/index.d.ts" />

import {bootstrap} from '@angular/platform-browser-dynamic';
//import {DomSanitizationService} from '@angular/platform-browser';
import {disableDeprecatedForms, provideForms } from '@angular/forms';
import {enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

import {APP_ROUTER_PROVIDERS} from './main.routes';

import {UserService} from './services/user.service';

import {MainAppComponent} from './main.component';

//enableProdMode();
bootstrap(MainAppComponent, [
	//DomSanitizationService,
	HTTP_PROVIDERS,
	UserService,
	disableDeprecatedForms(),
	provideForms(),
	APP_ROUTER_PROVIDERS
])
.catch(err => console.error(err));