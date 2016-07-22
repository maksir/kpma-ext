import {Component, OnInit, Input} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {ContractorService, DepartmentModel} from '../../services/contractor.service';


@Component({
	moduleId: module.id,
	selector: 'department-list',
	templateUrl: 'department.list.html',
	directives: [CORE_DIRECTIVES],
	providers: [ContractorService]

})
export class DepartmentList implements OnInit {

	@Input('contractorId') contId: number;

	list: DepartmentModel[] = [];
	editModel: DepartmentModel;
	addModel: DepartmentModel = new DepartmentModel();

	constructor(private contrSrv: ContractorService) { }

	ngOnInit() {

		this.refreshList();
	}

	refreshList() {

		if (!this.contId) {
			this.list = [];
		}
		else {
			this.contrSrv.getDepList(this.contId).subscribe(
				res => this.list = res,
				err => console.log(err)
			);
		}
	}

	onEdit(s: DepartmentModel) {
		this.editModel = s;
	}

	onDelete(s: DepartmentModel) {

		if (!s) {
			return;
		}

		this.editModel = undefined;

		this.contrSrv.deleteDepModel(s.id).subscribe(
			res => this.refreshList(),
			err => console.log(err)
		);
	}

	onCancel() {
		this.editModel = undefined;
	}

	onUpdate() {

		if (!this.editModel) {
			return;
		}
		this.contrSrv.saveDepModel(this.editModel).subscribe(
			res => {
				this.editModel = undefined;
				this.refreshList();
			},
			err => console.log(err)
		);

	}


	onAdd() {
		if (!this.addModel.name) {
			return;
		}
		this.addModel.contractorId = this.contId;

		this.contrSrv.saveDepModel(this.addModel).subscribe(
			res => {
				this.addModel = new DepartmentModel();
				this.addModel.contractorId = this.contId;
				this.refreshList();
			},
			err => console.log(err)
		);
	}


}