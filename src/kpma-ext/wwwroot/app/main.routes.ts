import {provideRouter, RouterConfig} from '@angular/router';

import {UserService} from './services/user.service';

import {ContractorRoutes} from './views/contractor/contractor.routes';
import {MetaObjectRoutes} from './views/metaobject/metaobject.routes';
import {UserRoutes} from './views/user/user.routes';
import {MenuRoutes} from './views/menu/menu.routes';
import {DocTypeRoutes} from './views/doctype/doctype.routes';
import {ServiceRoutes} from './views/service/service.routes';
import {DocCardRoutes} from './views/doccard/doccard.routes';



import {SandBox} from './views/sandbox/sandbox.view';


const routes: RouterConfig = [
	...UserRoutes,
	...ContractorRoutes,
	...MetaObjectRoutes,
	...MenuRoutes,
	...DocTypeRoutes,
	...ServiceRoutes,
	...DocCardRoutes,
	{ path: 'sandbox', component: SandBox },
	{ path: '', redirectTo: '/login', terminal: true }
	
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];