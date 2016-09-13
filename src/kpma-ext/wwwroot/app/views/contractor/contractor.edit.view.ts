import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';

import {ContractorService, ContractorModel} from '../../services/contractor.service';

import {MainAppComponent} from '../../main.component';

import {Tabs, Tab} from '../../controls/tabs.control';

import {DepartmentList} from './department.list.view';
import {AttachmentList} from '../attachment/attachment.list.view';


@Component({
	moduleId: module.id,
	selector: 'contractor-edit',
	templateUrl: 'contractor.edit.html',
	directives: [CORE_DIRECTIVES, Tabs, Tab, REACTIVE_FORM_DIRECTIVES, DepartmentList, AttachmentList],
	providers: [ContractorService]
})
export class ContractorEdit implements OnInit {

	private id: number;
	private mode: string;
	private model: ContractorModel = new ContractorModel();

	private editForm: FormGroup;

	constructor(private contrSrv: ContractorService, private route: ActivatedRoute, private router: Router, private mainCmp: MainAppComponent) {

		this.id = +this.route.snapshot.params["id"];
		this.mode = this.route.snapshot.params["mode"];
		if (this.mode) {
			this.mode = this.mode.toLowerCase();
		}

		this.editForm = new FormGroup({
			id: new FormControl(),
			name: new FormControl('', [Validators.required, Validators.minLength(3)]),
			fullName: new FormControl(),
			inn: new FormControl(),
			kpp: new FormControl(),
			ogrn: new FormControl()
		});

	}

	ngOnInit() {
		this.onRefresh();
	}

	onRefresh() {

		if (this.id) {
			this.contrSrv.getContrModel(this.id).subscribe(
				res => this.model = res,
				err => {
					this.mainCmp.showError(err);
					console.log(err);
				}
			);
		}
		return false;

	}

	onCancel() {
		window.history.back();
		return false;
	}

	onSubmit() {
		if (this.editForm.valid) {
			this.contrSrv.saveContrModel(this.model).subscribe(
				res => {
					if (!this.model.id) {
						this.router.navigateByUrl('/contractor/edit/' + res.id);
					}
					else {
						this.mainCmp.showMessage('alert-success', 'Сообщение', 'Данные сохранены.');
					}
				},
				err => this.mainCmp.showError(err)
			);
		}
	}
}