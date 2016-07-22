import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {UserService, UserViewModel, UserRoleViewModel, UserDepViewModel, UserDepDataModel} from '../../services/user.service';

import {DropDown, DropDownVA} from '../../controls/dropdown/dropdown.control';
import {Tab, Tabs} from '../../controls/tabs.control';

@Component({
	moduleId: module.id,
	selector: 'user-edit',
	templateUrl: 'user.edit.html',
	directives: [DropDown, DropDownVA, Tab, Tabs]
})
export class UserEdit implements OnInit {

	model: UserViewModel = new UserViewModel();
	userId: number;
	roleList: UserRoleViewModel[];
	addRole: UserRoleViewModel = new UserRoleViewModel();
	depList: UserDepViewModel[] = [];
	addDep: UserDepDataModel = new UserDepDataModel();

	constructor(private userSrv: UserService, private router: Router, private route: ActivatedRoute) {

		this.userId = +this.route.snapshot.params['id'];
	}

	ngOnInit() {

		this.userSrv.userGet(this.userId).subscribe(
			res => {
				this.model = res;
				this.refreshRoleList();
				this.refreshDepList();
			},
			err => console.log(err)
		);
	}

	refreshRoleList() {
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
					this.refreshRoleList();
				},
				err => console.log(err)
			);
		}
	}

	onClickDelRole(r: UserRoleViewModel) {
		this.userSrv.userRoleDel(r).subscribe(
			res => {
				this.refreshRoleList();
			},
			err => console.log(err)
		);
	}


	// departments

	refreshDepList() {
		this.userSrv.getUserDepList(this.userId).subscribe(
			res => this.depList = res,
			err => console.log(err)
		);
	}

	onAddDep() {

		if (!this.addDep.departmentId) {
			return;
		}

		this.userSrv.saveUserDep(this.userId, this.addDep.departmentId).subscribe(
			res => {
				this.addDep.departmentId = undefined;
				this.refreshDepList();
			},
			err => console.log(err)
		);
	}

	onDeleteDep(model: UserDepViewModel) {

		this.userSrv.deleteUserDep(model.userId, model.departmentId).subscribe(
			res => {
				this.refreshDepList();
			},
			err => console.log(err)
		);
	}
}