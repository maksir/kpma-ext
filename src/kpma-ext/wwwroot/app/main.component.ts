import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {SelectService} from './services/select.service';
import {UserService, UserViewModel} from './services/user.service';
import {MetaObjectService} from './services/metaobject.service';
import {AttachmentService} from './services/attachment.service';

import {ShadowBoxDirective} from './directives/shadowbox.directive';

import {Menu} from './components/menu.component';


@Component({
	moduleId: module.id,
    selector: 'main-app',
    template: `<main-menu></main-menu><router-outlet></router-outlet>`,
	directives: [ROUTER_DIRECTIVES, ShadowBoxDirective, Menu],
	providers: [SelectService, AttachmentService]
})

export class MainAppComponent {

	currentUser = new UserViewModel();

	freeze = false;

	constructor(private userSrv: UserService) {

		userSrv.currentUser.subscribe(
			res => this.currentUser = res,
			err => console.log(err),
			() => console.log('done')
		);
	}

	onChange() {

		this.freeze = !this.freeze;
		return false;
	}

}