import {Component, OnInit} from '@angular/core';

import {UserService, RoleViewModel, RoleMenuViewModel} from '../../services/user.service';
import {MenuService, MenuViewModel} from '../../services/menu.service';

import {DropDown, DropDownItem, DropDownVA} from '../../controls/dropdown/dropdown.control';

@Component({
	moduleId: module.id,
	selector: 'role-list',
	templateUrl: 'role.list.html',
	directives: [DropDown, DropDownVA],
	providers: [MenuService]
})
export class RoleList implements OnInit {

	roleList: RoleViewModel[] = [];
	insertRole: RoleViewModel = new RoleViewModel();
	editRole: RoleViewModel;
	selectedRole: RoleViewModel;

	menuList: RoleMenuViewModel[] = [];

	menuItems: DropDownItem[] = [];
	addMenuId: number = undefined;

	constructor(private userSrv: UserService, private menuSrv: MenuService) { }

	ngOnInit() {
		this.updateRoleList();
	}

	updateRoleList() {
		this.userSrv.roleList().subscribe(
			res => this.roleList = res,
			err => console.log(err)
		);
	}

	onUpdaleRoleList() {
		this.editRole = undefined;
		this.selectedRole = undefined;
		this.updateRoleList();
		this.updateMenuList();
	}

	onAddRole() {
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

	onEditRole(r: RoleViewModel) {
		this.editRole = r;
	}

	onSaveRole() {
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

	onCancelRole() {
		this.editRole = undefined;
		this.updateRoleList();
	}

	onSelectRole(r: RoleViewModel) {
		this.selectedRole = r;
		this.addMenuId = undefined;
		this.updateMenuList();
		this.updateMenuItemsList();
	}

	updateMenuList() {

		if (!this.selectedRole) {
			this.menuList = [];
			return;
		}

		this.userSrv.roleMenuList(this.selectedRole.id).subscribe(
			res => this.menuList = res,
			err => console.error(err)
		);
	}

	updateMenuItemsList() {
		if (!this.selectedRole) {
			this.menuItems = [];
		}
		else {
			this.userSrv.menuItemList(this.selectedRole.id).subscribe(
				res => this.menuItems = res,
				err => console.log(err)
			);
		}
	}

	onAddMenu() {
		if (!this.addMenuId || !this.selectedRole) {
			return;
		}

		this.userSrv.roleMenuAdd(this.selectedRole.id, this.addMenuId).subscribe(
			res => {
				this.addMenuId = undefined;
				this.updateMenuList();
				this.updateMenuItemsList();
			},
			err => console.log(err)
		);
	}

	onDeleteMenu(menu: RoleMenuViewModel) {

		if (!menu) {
			return;
		}

		this.userSrv.roleMenuDelete(menu).subscribe(
			res => {
				this.updateMenuList();
				this.updateMenuItemsList();
			},
			err => console.log(err)
		);
	}
}