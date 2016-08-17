import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

import {UserService} from '../../services/user.service';
import {MenuService, MenuViewModel} from '../../services/menu.service';

import {MenuItem} from './menu.item.component';

@Component({
	moduleId: module.id,
	selector: 'main-menu',
	templateUrl: 'menu.html',
	directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, MenuItem],
	providers: [MenuService]
})
export class Menu implements OnInit {

	private user: any;
	private currentUser;
	menuList: MenuViewModel[] = [];

	constructor(private userSrv: UserService, private menuSrv: MenuService, private router: Router) {
	}

	ngOnInit() {
		this.user = this.userSrv.currentUser.subscribe(
			res => {
				this.currentUser = res;
				this.refreshMenu();
			},
			err => console.log(err)
		);
	}

	refreshMenu() {

		this.menuSrv.getUserMenu().subscribe(
			res => this.menuList = res,
			err => console.log(err)
		);
	
	}

	logout() {

		this.userSrv.logout().subscribe(
			res => {
				this.router.navigateByUrl('/login');
			},
			err => console.log(err)
		);
		
	}


}