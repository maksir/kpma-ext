import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


import {UserService, UserLoginModel} from '../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'user-logout',
	templateUrl: 'user.logout.html'
})
export class UserLogout {

	constructor(private userSrv: UserService) { }

	onClickLogout() {
		this.userSrv.logout();
	}
}