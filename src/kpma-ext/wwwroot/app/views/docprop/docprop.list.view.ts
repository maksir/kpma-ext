import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
//import {ROUTER_DIRECTIVES} from '@angular/router';

import {DocPropService, DocFieldModel, DocPropDataModel, DocPropViewModel} from '../../services/docprop.service';

import {DropDown, DropDownVA} from '../../controls/dropdown/dropdown.control';

@Component({
	moduleId: module.id,
	selector: 'docprop-list',
	templateUrl: 'docprop.list.html',
	directives: [CORE_DIRECTIVES, DropDown, DropDownVA],
	providers: [DocPropService]
})
export class DocPropList implements OnInit {


	propList: DocPropViewModel[] = [];
	editPropModel: DocPropViewModel;
	selectedPropModel: DocPropViewModel;
	addPropModel: DocPropViewModel = new DocPropViewModel();

	fieldList: DocFieldModel[] = [];

	constructor(private propSrv: DocPropService) { }

	ngOnInit() {
		this.refreshPropList();
	}

	refreshPropList() {
		this.propSrv.getPropList().subscribe(
			res => {
				this.propList = res;
				this.refreshFieldList();

				if (this.selectedPropModel) {
					var ff = this.propList.find(f => f.id == this.selectedPropModel.id);
					if (ff) {
						this.selectedPropModel = ff;
					}
				}
			},
			err => console.log(err)
		);
	}

	onSelectProp(prop) {
		this.selectedPropModel = prop;
		this.refreshFieldList();
	}

	onDocGroupChange() {
		this.addPropModel.documentTypeId = undefined;
	}

	onAddProp() {

		if (!this.addPropModel.documentGroupId) {
			return;
		}

		this.propSrv.savePropModel(this.addPropModel).subscribe(
			res => {
				this.selectedPropModel = <DocPropViewModel>res;
				this.refreshPropList();
			},
			err => console.log(err)
		);
	}

	onEditProp(prop) {
		this.selectedPropModel = prop;
		this.editPropModel = prop;
		this.refreshFieldList();
	}

	onDeleteProp(prop) {
		if (confirm('Удалить настройку?')) {
			this.propSrv.deletePropModel(prop.id).subscribe(
				res => {
					this.selectedPropModel = undefined;
					this.refreshPropList();
				},
				err => console.log(err)
			);
		}
	}

	onCancelProp() {
		this.editPropModel = undefined;
	}

	onUpdateProp() {

		if (this.editPropModel) {

			this.propSrv.savePropModel(this.editPropModel).subscribe(
				res => {
					this.saveFieldList();
				},
				err => console.log(err)
			);
		}
	}

	saveFieldList() {
		this.propSrv.saveFieldModel(this.fieldList).subscribe(
			res => {
				this.editPropModel = undefined;
				this.refreshFieldList();
			},
			err => console.log(err)
		);
	}

	refreshFieldList() {

		if (!this.selectedPropModel) {
			this.fieldList = [];
			return;
		}

		this.propSrv.getFieldList(this.selectedPropModel.id).subscribe(
			res => {
				this.fieldList = res;
			},
			err => console.log(err)
		);
	}
}