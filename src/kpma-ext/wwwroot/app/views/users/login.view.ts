import {Component} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
import {RouteData, Router} from '@angular/router-deprecated';

import {UserService, UserLoginModel} from '../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'user-login',
	templateUrl: 'login.html',
	directives: [FORM_DIRECTIVES]
})
export class Login {

	model: UserLoginModel = new UserLoginModel();
	loginForm: ControlGroup;
	returnUrl = '';

	constructor(
		private userSrv: UserService, //private data: RouteData,
		private router: Router) {

		//this.returnUrl = data.get('returnUrl');

		this.loginForm = new ControlGroup({
			email: new Control('', Validators.required),
			password: new Control('', Validators.required),
			rememberMe: new Control('')
		});
	}

	onSubmit() {

		this.userSrv.login(this.model).subscribe(
			result => {
				if (result && this.returnUrl && this.returnUrl.length > 0) {
					this.router.navigateByUrl(this.returnUrl, false);
				}
			},
			err => {
				alert(err);
			}
		);

	}
}