import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {UserService, UserLoginModel} from '../../services/user.service';

import {ReCaptchaComponent} from '../../components/recaptcha.component';

@Component({
	moduleId: module.id,
	selector: 'user-login',
	templateUrl: 'user.login.html',
	directives: [ReCaptchaComponent]
})
export class UserLogin {

	model: UserLoginModel = new UserLoginModel();
	//loginForm: ControlGroup;
	returnUrl = '';

	captchaSuccess = false;

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
	onReCaptcha($event) {

		this.captchaSuccess = true;
	}

	onSubmit() {

		this.userSrv.login(this.model).subscribe(
			result => {
				if (result && this.returnUrl && this.returnUrl.length > 0) {
					this.router.navigateByUrl(this.returnUrl);
				}
				else {
					this.router.navigateByUrl('/dashboard');
				}
			},
			err => {
				alert(err);
			}
		);

	}
}