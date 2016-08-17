import {RouterConfig} from '@angular/router';

import {UserService} from '../../services/user.service';

import {RestrictList} from './restrict.list.view';

export const RestrictRoutes: RouterConfig = [
	{ path: 'restrict/list', component: RestrictList, canActivate: [UserService] }
];
