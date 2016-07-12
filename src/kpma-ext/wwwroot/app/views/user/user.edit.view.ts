import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {UserService, UserViewModel, UserRoleViewModel} from '../../services/user.service';

import {DropDown, DropdownValueAccessor} from '../../controls/dropdown/dropdown.control';

@Component({
	moduleId: module.id,
	selector: 'user-edit',
	templateUrl: 'user.edit.html',
	directives: [DropDown, DropdownValueAccessor]
})
export class UserEdit implements OnInit {

	model: UserViewModel = new UserViewModel();
	userId: number;
	roleList: UserRoleViewModel[];
	addRole: UserRoleViewModel = new UserRoleViewModel();

	constructor(private userSrv: UserService, private router: Router, private route: ActivatedRoute) {

		this.userId = +this.route.snapshot.params['id'];
	}

	ngOnInit() {

		this.userSrv.userGet(this.userId).subscribe(
			res => {
				this.model = res;
				this.updateRoleList();
			},
			err => console.log(err)
		);
	}

	updateRoleList() {
		this.userSrv.userRoles(this.userId).subscribe(
			res => this.roleList = res
		);
	}

	onBackBtn() {
		window.history.back();
	}

	onSubmit() {

		this.userSrv.userPost(this.model).subscribe(
			res => { },
			err => console.log(err)
		);
	}


	onClickAddRole() {
		if (this.addRole.roleId) {
			this.userSrv.userRoleAdd(this.userId, this.addRole.roleId).subscribe(
				res => {
					this.addRole.roleId = undefined;
					this.updateRoleList();
				},
				err => console.log(err)
			);
		}
	}

	onClickDelRole(r: UserRoleViewModel) {
		this.userSrv.userRoleDel(r).subscribe(
			res => {
				this.updateRoleList();
			},
			err => console.log(err)
		);
	}
}