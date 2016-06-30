import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {SelectService} from './services/select.service';
import {UserService, UserViewModel} from './services/user.service';

@Component({
	moduleId: module.id,
    selector: 'main-app',
    template: `<h4>Asp Net Core + Angular2 App</h4>
				<div>
				<a [routerLink]="['/signup']">Регистрация</a>
				<a [routerLink]="['/login']">Вход</a>
				<a [routerLink]="['/user/list']">Список пользователей</a>
				<a [routerLink]="['/role/list']">Список ролей</a>
				{{currentUser.name}}
				</div>
				<router-outlet></router-outlet>
	`,
	directives: [ROUTER_DIRECTIVES],
	providers: [SelectService]
})

export class MainAppComponent {

	currentUser = new UserViewModel();

	constructor(private userSrv: UserService) {

		userSrv.currentUser.subscribe(
			res => this.currentUser = res,
			err => console.log(err),
			() => console.log('done')
		);
	}

}