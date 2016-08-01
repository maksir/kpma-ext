import {RouterConfig} from '@angular/router';

import {UserService} from '../../services/user.service';

import {DocPropList} from './docprop.list.view';

export const DocPropRoutes: RouterConfig = [
	{ path: 'docprop/list', component: DocPropList, canActivate: [UserService] }
];