import {Component} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
//import {RouteData, Router} from '@angular/router-deprecated';

import {UserService, UserSignModel} from '../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'user-sign',
	templateUrl: 'sign.html',
	directives: [FORM_DIRECTIVES]
})
export class Sign {

	model: UserSignModel = new UserSignModel();

	regForm: ControlGroup;

	constructor(private fb: FormBuilder, private userSrv: UserService) {

		this.regForm = new ControlGroup({
			Name: new Control('', Validators.compose([Validators.required, Validators.minLength(3)])),
			Email: new Control('', Validators.required),
			Password: new Control('', Validators.compose([Validators.required, Validators.minLength(6)])),
			ConfirmPassword: new Control('', Validators.required)
		});
		
	}

	onSubmit() {

		if (this.model.password != this.model.confirmPassword) {
			this.regForm.controls['confirmPassword'].setErrors({ 'notEquals': true });
			return;
		}

		if (!this.regForm.valid) {
			return;
		}

		this.userSrv.sign(this.model).subscribe(
			result => { },
			err => { },
			() => { }
		);
	}
}
