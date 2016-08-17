import {Component} from '@angular/core';

import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';
//import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
//import {RouteData, Router} from '@angular/router-deprecated';

import {UserService, UserSignModel} from '../../services/user.service';

import {DropDown, DropDownVA} from '../../controls/dropdown/dropdown.control';

@Component({
	moduleId: module.id,
	selector: 'user-sign',
	templateUrl: 'user.sign.html',
	directives: [REACTIVE_FORM_DIRECTIVES, DropDown, DropDownVA]
})
export class UserSign {

	regForm: FormGroup;

	constructor(private userSrv: UserService) {

		this.regForm = new FormGroup({
			name: new FormControl('', [Validators.required, Validators.minLength(3)]),
			email: new FormControl('', Validators.required),
			password: new FormControl('', [Validators.required, Validators.minLength(6)]),
			confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
			contractorId: new FormControl('', Validators.required)
		});
	}

	onSubmit() {

		if (this.regForm.value.password != this.regForm.value.confirmPassword) {
			this.regForm.controls['confirmPassword'].setErrors({ 'notEquals': true });
			return;
		}

		if (!this.regForm.valid) {
			return;
		}

		this.userSrv.sign(this.regForm.value).subscribe(
			result => { },
			err => { },
			() => { }
		);
	}
}
