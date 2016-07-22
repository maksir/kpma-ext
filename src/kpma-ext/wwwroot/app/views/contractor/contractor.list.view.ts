import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {ContractorService, ContractorModel} from '../../services/contractor.service';


@Component({
	moduleId: module.id,
	selector: 'contractor-list',
	templateUrl: 'contractor.list.html',
	directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
	providers: [ContractorService]
})
export class ContractorList implements OnInit {

	private list: ContractorModel[] = [];

	constructor(private contrSrv: ContractorService) { }

	ngOnInit() {
		this.refreshList();
	}

	refreshList() {
		this.contrSrv.getContrList().subscribe(
			result => this.list = result,
			err => console.log(err)
		);
	}

}