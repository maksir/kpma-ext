import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


import {UserService, UserLoginModel} from '../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'user-login',
	templateUrl: 'userlogin.html'
})
export class UserLogin {

	model: UserLoginModel = new UserLoginModel();
	//loginForm: ControlGroup;
	returnUrl = '';

	constructor(
		private route: ActivatedRoute,
		private userSrv: UserService, //private data: RouteData,
		private router: Router) {


		this.router.routerState.queryParams.subscribe(
			params => this.returnUrl = params['returnUrl'],
			err => console.log(err)
		);

		//this.loginForm = new ControlGroup({
		//	email: new Control('', Validators.required),
		//	password: new Control('', Validators.required),
		//	rememberMe: new Control('')
		//});
	}

	onClick(f) {

		let val = f.value;
	}

	onSubmit() {

		this.userSrv.login(this.model).subscribe(
			result => {
				if (result && this.returnUrl && this.returnUrl.length > 0) {
					this.router.navigateByUrl(this.returnUrl);
				}
			},
			err => {
				alert(err);
			}
		);

	}
}