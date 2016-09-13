import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {ContractorService, ContractorModel} from '../../services/contractor.service';

import {MainAppComponent} from '../../main.component';

import {ShadowBox} from '../../components/shadowbox.component';

@Component({
	moduleId: module.id,
	selector: 'contractor-list',
	templateUrl: 'contractor.list.html',
	directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, ShadowBox],
	providers: [ContractorService]
})
export class ContractorList implements OnInit {

	private list: ContractorModel[] = [];

	private freeze = false;

	constructor(private contrSrv: ContractorService, private mainCmp: MainAppComponent) { }

	ngOnInit() {
		this.refreshList();
	}

	refreshList() {

		this.freeze = true;

		this.contrSrv.getContrList().subscribe(
			result => {
				this.list = result;
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