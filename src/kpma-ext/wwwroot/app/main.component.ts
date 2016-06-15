import {Component} from '@angular/core';
//import {RouteConfig, ROUTER_DIRECTIVES, RouterLink, ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {SandBox} from './views/sandbox/sandbox.view';

import {Login} from './views/users/login.view';
import {Sign} from './views/users/sign.view';

import {SelectService} from './services/select.service';
import {UserService} from './services/user.service';

@Component({
	moduleId: module.id,
    selector: 'main-app',
    template: `<h3>Asp Net Core + Angular2 App</h3>
		<sandbox></sandbox>
	`,
	directives: [SandBox],
	providers: [UserService, SelectService]
})
export class MainAppComponent {

}