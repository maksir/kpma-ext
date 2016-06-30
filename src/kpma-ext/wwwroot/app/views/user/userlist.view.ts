import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {UserService, UserViewModel} from '../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'user-list',
	templateUrl: 'userlist.html',
	directives: [ROUTER_DIRECTIVES]
})
export class UserList implements OnInit {

	userList : UserViewModel[] = [];

	constructor(private userSrv: UserService) { }


	ngOnInit() {

		this.userSrv.userList().subscribe(
			res => this.userList = res,
			err => console.log(err)
		);
	}

}