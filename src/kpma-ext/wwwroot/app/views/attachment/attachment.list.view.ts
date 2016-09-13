import {Component, OnInit, OnChanges, SimpleChanges, Input, ViewChild} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {ServiceService, ServiceModel} from '../../services/service.service';
import {AttachmentService, AttachmentDataModel, AttachmentViewModel} from '../../services/attachment.service';

import {MainAppComponent} from '../../main.component';

import {ShadowBox} from '../../components/shadowbox.component';

@Component({
	moduleId: module.id,
	selector: 'attachment-list',
	templateUrl: 'attachment.list.html',
	directives: [CORE_DIRECTIVES, ShadowBox],
	providers: [ServiceService]

})
export class AttachmentList implements OnInit {

	@Input() metaObjectId: number;
	@Input() objectId: number;

	//@ViewChild('file') addFile;

	private list: AttachmentViewModel[] = [];
	private addModel: AttachmentDataModel = new AttachmentDataModel();
	private editModel: AttachmentDataModel;

	private freezeAttList = false;

	constructor(private attSrv: AttachmentService, private mainCmp: MainAppComponent) { }

	ngOnInit() {
		this.refreshList();
	}

	ngOnChanges(changes: SimpleChanges) {
		this.refreshList();
	}

	refreshList() {

		this.freezeAttList = true;

		this.attSrv.getList(this.metaObjectId, this.objectId).subscribe(
			res => {
				this.list = res;
			},
			err => {
				this.mainCmp.showError(err);
			},
			() => {
				this.freezeAttList = false;
			}
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

		this.freezeAttList = true;

		//this.addModel.file = addFileInput.files[0];
		this.addModel.metaObjectId = this.metaObjectId;
		this.addModel.objectId = this.objectId;

		this.attSrv.saveModel(this.addModel).subscribe(
			res => {
				this.refreshList();
				this.addModel.file = undefined;
				this.addModel.name = undefined;
			},
			err => {
				this.mainCmp.showError(err);
			},
			() => {
				this.freezeAttList = false;
			}
		);
	}

	onEdit(item: AttachmentViewModel) {

		this.attSrv.getModel(item.id).subscribe(
			res => {
				this.editModel = res;
			},
			err => {
				this.mainCmp.showError(err);
			}
		);
	}


	onDelete(item: AttachmentViewModel) {

		if (!item) {
			return;
		}

		this.mainCmp.showQuestion('Удалить файл: <strong>' + item.name + '</strong> ?').subscribe(
			answer => {
				if (answer) {
					this.attSrv.deleteModel(item.id).subscribe(
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
			err => {
				this.mainCmp.showError(err);
			}
		);
	}
}