import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {UserService} from '../services/user.service';

@Component({
	selector: 'main-menu',
	template: ``,
	directives: [CORE_DIRECTIVES]
})
export class Menu implements OnInit {

	private user: any;
	private currentUser;
	private menuList: any;

	constructor(private userSrv: UserService) {
	}

	ngOnInit() {
		this.user = this.userSrv.currentUser.subscribe(
			res => {
				this.currentUser = res;
				this.updateMenu();
			},
			err => console.log(err)
		);
	}

	updateMenu() {

		if (this.userSrv.isLoggetIn()) {
			this.userSrv.menuList()
		}
	}

}