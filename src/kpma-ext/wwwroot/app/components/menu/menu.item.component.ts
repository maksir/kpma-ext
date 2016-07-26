import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

//import {UserService} from '../../services/user.service';
import {MenuService, MenuViewModel} from '../../services/menu.service';

@Component({
	moduleId: module.id,
	selector: '[menu-item]',
	templateUrl: 'menu.item.html',
	directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, MenuItem]
})
export class MenuItem {

	@Input() list: MenuViewModel[];

	constructor(private menuSrv: MenuService) {
		let t = 0;
	}

	ngOnInit() {
		let l = 0;
	}

	ngOnChanges(changes: SimpleChanges) {
		let r = 0;
	}

}