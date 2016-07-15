import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {UserService} from '../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'main-menu',
	templateUrl: 'menu.html',
	directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
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

	
	}

}