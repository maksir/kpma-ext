import {Component, OnInit} from '@angular/core';

import {UserService, RoleViewModel} from '../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'role-list',
	templateUrl: 'rolelist.html'
})
export class RoleList implements OnInit {

	roleList: RoleViewModel[] = [];
	insertRole: RoleViewModel = new RoleViewModel();
	editRole: RoleViewModel;

	constructor(private userSrv: UserService) {}

	ngOnInit() {
		this.updateRoleList();
	}

	updateRoleList() {
		this.userSrv.roleList().subscribe(
			res => this.roleList = res,
			err => console.log(err)
		);
	}

	onUpdaleList() {
		this.editRole = undefined;
		this.updateRoleList();
	}

	onClickAdd() {
		this.userSrv.rolePost(this.insertRole).subscribe(
			res => {
				this.insertRole = new RoleViewModel();
				this.updateRoleList();
			},
			err => {
				console.log(err);
			}
		);	
	}

	onClickEdit(r: RoleViewModel) {
		this.editRole = r;
	}

	onClickSave() {
		if (this.editRole) {
			this.userSrv.rolePost(this.editRole).subscribe(
				res => {
					this.updateRoleList();
					this.editRole = undefined;
				},
				err => console.log(err)
			);
		}
	}

	onClickCancel() {
		this.editRole = undefined;
		this.updateRoleList();
	}

}