import {RouterConfig} from '@angular/router';

import {UserService} from '../../services/user.service';

import {MenuList} from './menu.list.view';


export const MenuRoutes: RouterConfig = [
	{ path: 'menu/list', component: MenuList, canActivate: [UserService] }
];