import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {ServiceService, ServiceModel} from '../../services/service.service';


@Component({
	moduleId: module.id,
	selector: 'service-list',
	templateUrl: 'service.list.html',
	directives: [CORE_DIRECTIVES],
	providers: [ServiceService]

})
export class ServiceList implements OnInit {

	list: ServiceModel[] = [];
	editModel: ServiceModel;
	addModel: ServiceModel = new ServiceModel();

	constructor(private srvSrv: ServiceService) { }

	ngOnInit() {

		this.refreshList();
	}

	refreshList() {

		this.srvSrv.getList().subscribe(
			res => this.list = res,
			err => console.log(err)
		);
	}

	onEdit(s: ServiceModel) {
		this.editModel = s;
	}

	onDelete(s: ServiceModel) {

		if (!s) {
			return;
		}

		this.editModel = undefined;

		this.srvSrv.deleteModel(s.id).subscribe(
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
		this.srvSrv.saveModel(this.editModel).subscribe(
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

		this.srvSrv.saveModel(this.addModel).subscribe(
			res => {
				this.addModel = new ServiceModel();
				this.refreshList();
			},
			err => console.log(err)
		);
	}


}