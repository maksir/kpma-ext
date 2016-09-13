﻿import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {DocCardService, DocCardViewModel} from '../../services/doccard.service';

import {MainAppComponent} from '../../main.component';
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

	constructor(private dcSrv: DocCardService, private mainCmp: MainAppComponent) { }

	ngOnInit() {
		this.refreshList();
	}

	refreshList() {
		this.freeze = true;
		this.dcSrv.getList().subscribe(
			res => {
				this.list = res;
			},
			err => {
				this.mainCmp.showError(err);
			},
			() => {
				this.freeze = false;
			}
		);
	}
}