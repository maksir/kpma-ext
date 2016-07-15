import {RouterConfig} from '@angular/router';

import {UserService} from '../../services/user.service';

import {DocTypeList} from './doctype.list.view';

export const DocTypeRoutes: RouterConfig = [
	{ path: 'doctype/list', component: DocTypeList, canActivate: [UserService] }
];