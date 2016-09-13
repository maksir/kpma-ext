import {RouterConfig} from '@angular/router';

import {UserService} from '../../services/user.service';

import {ClientRequestReport} from './clreport.view';

export const ReportRoutes: RouterConfig = [
	{ path: 'report/clr', component: ClientRequestReport, canActivate: [UserService] }
];