import {Component, OnInit, Input} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {ContractorService, DepartmentModel} from '../../services/contractor.service';

import {MainAppComponent} from '../../main.component';
import {ShadowBox} from '../../components/shadowbox.component';

@Component({
	moduleId: module.id,
	selector: 'department-list',
	templateUrl: 'department.list.html',
	directives: [CORE_DIRECTIVES, ShadowBox],
	providers: [ContractorService]

})
export class DepartmentList implements OnInit {

	@Input('contractorId') contId: number;

	list: DepartmentModel[] = [];
	editModel: DepartmentModel;
	addModel: DepartmentModel = new DepartmentModel();

	private freeze = false;

	constructor(private contrSrv: ContractorService, private mainCmp: MainAppComponent) { }

	ngOnInit() {

		this.refreshList();
	}

	refreshList() {

		if (!this.contId) {
			this.list = [];
		}
		else {
			this.freeze = true;

			this.contrSrv.getDepList(this.contId).subscribe(
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

	onEdit(s: DepartmentModel) {
		this.editModel = s;
	}

	onDelete(s: DepartmentModel) {

		if (!s) {
			return;
		}

		this.editModel = undefined;


		this.mainCmp.showQuestion('Удалить службу: <strong>' + s.name + '</strong> ?').subscribe(
			answer => {
				if (answer) {
					this.contrSrv.deleteDepModel(s.id).subscribe(
						res => {
							this.refreshList();
						},
						err => {
							this.mainCmp.showError(err);
						}
					);					
				}
				else {
					return;
				}
			}
		);


		
	}

	onCancel() {
		this.editModel = undefined;
	}

	onUpdate() {

		if (!this.editModel) {
			return;
		}

		this.freeze = true;

		this.contrSrv.saveDepModel(this.editModel).subscribe(
			res => {
				this.editModel = undefined;
				this.refreshList();
			},
			err => {
				this.mainCmp.showError(err);
			},
			() => {
				this.freeze = false;
			}
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
			err => {
				this.mainCmp.showError(err);
			},
			() => {
				this.freeze = false;
			}
		);
	}


}