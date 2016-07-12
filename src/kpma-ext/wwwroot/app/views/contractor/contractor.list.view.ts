import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {ContractorService, ContractorModel} from '../../services/contractor.service';


@Component({
	moduleId: module.id,
	selector: 'contractor-list',
	templateUrl: 'contractor.list.html',
	directives: [CORE_DIRECTIVES],
	providers: [ContractorService]
})
export class ContractorList implements OnInit {

	private list: ContractorModel[] = [];

	constructor(private contrSrv: ContractorService) { }

	ngOnInit() {

		this.contrSrv.getList().subscribe(
			result => this.list = result,
			err => console.log(err)
		);
	}
}