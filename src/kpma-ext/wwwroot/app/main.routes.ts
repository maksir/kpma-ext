import {provideRouter} from '@angular/router';

import {UserService} from './services/user.service';

import {SandBox} from './views/sandbox/sandbox.view';
import {UserList} from './views/user/userlist.view';
import {UserLogin} from './views/user/userlogin.view';
import {UserSign} from './views/user/usersign.view';
import {UserEdit} from './views/user/useredit.view';
import {RoleList} from './views/user/rolelist.view';


const routes = [
	{ path: '', redirectTo: '/login', terminal: true },
	{ path: 'login', component: UserLogin },
	{ path: 'login/:returnUrl', component: UserLogin },
	{ path: 'signup', component: UserSign },
	{ path: 'user/list', component: UserList, canActivate: [UserService]},
	{ path: 'role/list', component: RoleList, canActivate: [UserService]},
	{ path: 'user/edit/:id', component: UserEdit, canActivate: [UserService]}
];

export const APP_ROUTER_PROVIDERS = [
	provideRouter(routes)
];