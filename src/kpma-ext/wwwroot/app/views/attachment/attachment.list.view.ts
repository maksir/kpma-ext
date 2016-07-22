﻿import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {ServiceService, ServiceModel} from '../../services/service.service';

import {AttachmentService, AttachmentDataModel, AttachmentViewModel} from '../../services/attachment.service';


@Component({
	moduleId: module.id,
	selector: 'attachment-list',
	templateUrl: 'attachment.list.html',
	directives: [CORE_DIRECTIVES],
	providers: [ServiceService]

})
export class AttachmentList implements OnInit {

	@Input() metaObjectId: number;
	@Input() objectId: number;

	//@ViewChild('file') addFile;

	private list: AttachmentViewModel[] = [];
	private addModel: AttachmentDataModel = new AttachmentDataModel();
	private editModel: AttachmentDataModel;

	constructor(private attSrv: AttachmentService) { }

	ngOnInit() {
		this.refreshList();
	}

	refreshList() {
		this.attSrv.getList(this.metaObjectId, this.objectId).subscribe(
			res => this.list = res,
			err => console.log(err)
		);
	}

	onSelectFile(addFileInput, model: AttachmentDataModel) {

		if (!model) {
			return;
		}

		if (!addFileInput.files[0]) {
			model.file = undefined;
		}
		else {
			model.file = addFileInput.files[0];
		}

	}

	onAdd() {

		//this.addModel.file = addFileInput.files[0];
		this.addModel.metaObjectId = this.metaObjectId;
		this.addModel.objectId = this.objectId;

		this.attSrv.saveModel(this.addModel).subscribe(
			res => this.refreshList(),
			err => console.log(err)
		);


	}

	onEdit(item: AttachmentViewModel) {

		this.attSrv.getModel(item.id).subscribe(
			res => this.editModel = res,
			err => console.log(err)
		);
	}


	onDelete(item: AttachmentViewModel) {

		
	}

	onCancel() {
		this.editModel = undefined;
	}

	onUpdate() {

		//if (editfileInput.files && editfileInput.files[0]) {
		//	this.editModel.file = editfileInput.files[0];
		//}
		this.editModel.metaObjectId = this.metaObjectId;
		this.editModel.objectId = this.objectId;

		this.attSrv.saveModel(this.editModel).subscribe(
			res => {
				this.editModel = undefined;
				this.refreshList();
			},
			err => console.log(err)
		);
	}
}