import {Component} from '@angular/core';
import {UserService, UserLoginModel} from '../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'user-login',
	templateUrl: 'login.html'
})
export class Login {

	model: UserLoginModel = {};

	constructor(private _userSrv: UserService){
		
	}

}