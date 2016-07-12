import {RouterConfig} from '@angular/router';

import {UserService} from '../../services/user.service';

import {UserList} from './user.list.view';
import {UserLogin} from './user.login.view';
import {UserSign} from './user.sign.view';
import {UserEdit} from './user.edit.view';
import {RoleList} from './role.list.view';

export const UserRoutes: RouterConfig = [
	{ path: 'login', component: UserLogin },
	{ path: 'login/:returnUrl', component: UserLogin },
	{ path: 'signup', component: UserSign },
	{ path: 'user/list', component: UserList, canActivate: [UserService] },
	{ path: 'role/list', component: RoleList, canActivate: [UserService] },
	{ path: 'user/edit/:id', component: UserEdit, canActivate: [UserService] },
	{ path: 'user/profile/:id', component: UserEdit, canActivate: [UserService] }
];


