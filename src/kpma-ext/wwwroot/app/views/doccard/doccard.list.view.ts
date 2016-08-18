import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {DocCardService, DocCardViewModel} from '../../services/doccard.service';

import {ShadowBox} from '../../components/shadowbox.component';


@Component({
	moduleId: module.id,
	selector: 'doccard-list',
	templateUrl: 'doccard.list.html',
	directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, ShadowBox],
	providers: [DocCardService]

})
export class DocCardList implements OnInit {

	private list: DocCardViewModel[] = [];
	private freeze = false;

	constructor(private dcSrv: DocCardService) { }

	ngOnInit() {
		this.refreshList();
	}

	refreshList() {
		this.freeze = true;
		this.dcSrv.getList().subscribe(
			res => this.list = res,
			err => console.log(err),
			() => { this.freeze = false; }
		);
	}
}