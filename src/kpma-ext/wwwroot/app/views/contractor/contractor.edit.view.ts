import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ActivatedRoute} from '@angular/router'

import {ContractorService, ContractorModel} from '../../services/contractor.service';


@Component({
	moduleId: module.id,
	selector: 'contractor-edit',
	templateUrl: 'contractor.edit.html',
	directives: [CORE_DIRECTIVES],
	providers: [ContractorService]
})
export class ContractorEdit implements OnInit {

	contractorId: number;
	model: ContractorModel = new ContractorModel();

	constructor(private contrSrv: ContractorService, private route: ActivatedRoute) { }

	ngOnInit() {

		this.contractorId = this.route.snapshot.params["id"];
		this.contrSrv.getContractor(this.contractorId).subscribe(
			res => this.model = res,
			err => console.log(err)
		);
	}
}