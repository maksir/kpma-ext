import {provideRouter, RouterConfig} from '@angular/router';

import {UserService} from './services/user.service';

import {ContractorRoutes} from './views/contractor/contractor.routes';
import {MetaObjectRoutes} from './views/metaobject/metaobject.routes';
import {UserRoutes} from './views/user/user.routes';
import {MenuRoutes} from './views/menu/menu.routes';
import {DocTypeRoutes} from './views/doctype/doctype.routes';
import {ServiceRoutes} from './views/service/service.routes';
import {DocCardRoutes} from './views/doccard/doccard.routes';
import {DocPropRoutes} from './views/docprop/docprop.routes';


import {Dashboard} from './views/dashboard/dashboard.view';
import {SandBox} from './views/sandbox/sandbox.view';


const routes: RouterConfig = [
	...UserRoutes,
	...ContractorRoutes,
	...MetaObjectRoutes,
	...MenuRoutes,
	...DocTypeRoutes,
	...ServiceRoutes,
	...DocCardRoutes,
	...DocPropRoutes,
	{ path: 'dashboard', component: Dashboard, canActivate: [UserService]},
	{ path: 'sandbox', component: SandBox, canActivate: [UserService] },
	{ path: '', redirectTo: '/login', terminal: true }
	
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];