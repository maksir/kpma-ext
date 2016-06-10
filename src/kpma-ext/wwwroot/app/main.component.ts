import {Component} from '@angular/core';
//import {RouteConfig, ROUTER_DIRECTIVES, RouterLink, ROUTER_PROVIDERS} from '@angular/router-deprecated';

import {Login} from './views/users/login.view';
import {UserService} from './services/user.service';

@Component({
	moduleId: module.id,
    selector: 'main-app',
    template: `<h3>Asp Net Core + Angular2 App</h3>
		<user-login></user-login>
	`,
	directives: [Login],
	providers: [UserService]
})
export class MainAppComponent {

}