import {RouterConfig} from '@angular/router';

import {UserService} from '../../services/user.service';

import {ServiceList} from './service.list.view';

export const ServiceRoutes: RouterConfig = [
	{ path: 'service/list', component: ServiceList, canActivate: [UserService] }
];
