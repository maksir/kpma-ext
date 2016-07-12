import {RouterConfig} from '@angular/router';

import {UserService} from '../../services/user.service';

import {MetaObjectList} from './metaobject.list.view';
import {MetaObjectEdit} from './metaobject.edit.view';


export const MetaObjectRoutes: RouterConfig = [
	{ path: 'metaobject/list', component: MetaObjectList, canActivate: [UserService] },
	{ path: 'metaobject/edit/:id', component: MetaObjectEdit, canActivate: [UserService] },
	{ path: 'metaobject/edit/:id/:mode', component: MetaObjectEdit, canActivate: [UserService] },
	{ path: 'metaobject/edit/:id/:mode/:parentId', component: MetaObjectEdit, canActivate: [UserService] },
];