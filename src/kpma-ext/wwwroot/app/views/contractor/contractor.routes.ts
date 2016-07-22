import {RouterConfig} from '@angular/router';

import {UserService} from '../../services/user.service';

import {ContractorList} from './contractor.list.view';
import {ContractorEdit} from './contractor.edit.view';

export const ContractorRoutes: RouterConfig  = [
	{ path: 'contractor/list', component: ContractorList, canActivate: [UserService] },
	{ path: 'contractor/edit/:id', component: ContractorEdit, canActivate: [UserService]},
	{ path: 'contractor/edit/:id/:mode', component: ContractorEdit, canActivate: [UserService] }
];