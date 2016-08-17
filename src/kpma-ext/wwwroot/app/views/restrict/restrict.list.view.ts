import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {RestrictService, DataRestrictViewModel, DataRestrictDataModel} from '../../services/restrict.service';
import {MetaObjectService, MetaObjectDataModel} from '../../services/metaobject.service';

import {DropDown, DropDownVA} from '../../controls/dropdown/dropdown.control';

@Component({
	moduleId: module.id,
	selector: 'restrict-list',
	templateUrl: 'restrict.list.html',
	directives: [CORE_DIRECTIVES, DropDown, DropDownVA],
	providers: [RestrictService, MetaObjectService]

})
export class RestrictList implements OnInit {

	list: DataRestrictViewModel[] = [];

	_selectedContrId: number;
	get selectedContrId(): number {
		return this._selectedContrId;
	}
	set selectedContrId(value: number) {
		if (this._selectedContrId != value) {
			this._selectedContrId = value;
			this.refreshList();
		}
	}

	_selectedDepId: number;
	get selectedDepId(): number {
		return this._selectedDepId;
	}
	set selectedDepId(value: number) {
		if (this._selectedDepId != value) {
			this._selectedDepId = value;
			this.refreshList();
		}
	}

	_selectedMoId: number;
	get selectedMoId(): number {
		return this._selectedMoId;
	}
	set selectedMoId(value: number) {
		if (this._selectedMoId != value) {
			this._selectedMoId = value;
			this.refreshList();
		}
	}


	addRestrictModel: DataRestrictViewModel = new DataRestrictViewModel();
	addMetaObjectModel: MetaObjectDataModel = new MetaObjectDataModel();

	constructor(private resSrv: RestrictService, private moSrv: MetaObjectService) {
	}

	ngOnInit() {

		this.refreshList();

	}

	refreshList() {

		this.resSrv.getList(this.selectedContrId, this.selectedDepId, this.selectedMoId).subscribe(
			res => this.list = res,
			err => console.log(err)
		);
	}


	onAddMetaObjectChanged(metaObjectId:number) {

		if (metaObjectId) {

			this.moSrv.getModel(metaObjectId).subscribe(
				res => this.addMetaObjectModel = res,
				err => console.log(err)
			);

		}
		else {
			this.addMetaObjectModel = new MetaObjectDataModel();
		}
	}

	onAdd() {

		if (!this.addRestrictModel.departmentId || !this.addRestrictModel.metaObjectId || !this.addRestrictModel.objectId) {
			return;
		}

		this.resSrv.saveModel(this.addRestrictModel).subscribe(
			res => this.refreshList(),
			err => console.log(err)
		);

	}

	onDelete(item: DataRestrictViewModel) {

		if (!item) {
			return;
		}

		this.resSrv.deleteModel(item).subscribe(
			res => this.refreshList(),
			err => console.log(err)
		);
	}

}