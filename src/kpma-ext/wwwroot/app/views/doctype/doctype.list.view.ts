import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {DocTypeService, DocGroupModel, DocTypeModel} from '../../services/doctype.service';

import {ITreeNode, TreeView} from '../../controls/treeview';

@Component({
	moduleId: module.id,
	selector: 'doctype-list',
	templateUrl: 'doctype.list.html',
	directives: [CORE_DIRECTIVES, TreeView],
	providers: [DocTypeService]

})
export class DocTypeList implements OnInit {

	private groupList: DocGroupModel[] = [];
	private typeList: DocTypeModel[] = [];

	private selectGroupModel: DocGroupModel;
	private addGroupModel = new DocGroupModel();
	private editGroupModel: DocGroupModel;

	private set selectedGroup(value: DocGroupModel) {

		this.selectGroupModel = value;
		if (value) {
			this.addTypeModel.documentGroupId = value.id;
		}
		else {
			this.addTypeModel.documentGroupId = undefined;
		}
		this.updateTypeList();
	}


	// модель добавления нового элемента
	private addTypeModel = new DocTypeModel();
	// редактируемая модель
	private editTypeModel: DocTypeModel;


	constructor(private dtSrv: DocTypeService) {
	}

	ngOnInit() {
		this.updateGroupList();
	}

	updateGroupList() {

		this.dtSrv.getGroupList().subscribe(
			res => {
				this.groupList = res;

				if (this.selectGroupModel) {
					let ll = this.groupList.filter(g => g.id == this.selectGroupModel.id);
					if (ll.length > 0) {
						this.selectedGroup = ll[0];
					}
				}
			},
			err => console.log(err)
		);
	}

	updateTypeList() {
		if (!this.selectGroupModel) {
			this.typeList = [];
		}
		else {
			this.dtSrv.getTypeList(this.selectGroupModel.id).subscribe(
				res => this.typeList = res,
				err => console.log(err)
			);
		}
	}


	onSelectGroup(g: DocGroupModel) {
		this.selectedGroup = g;
	}

	onAddGroup() {

		if (!this.addGroupModel.name) {
			return;
		}

		this.dtSrv.saveGroupModel(this.addGroupModel).subscribe(
			res => {
				this.addGroupModel = new DocGroupModel();
				this.selectGroupModel = res;
				this.updateGroupList();
			},
			err => console.log(err)
		);
	}

	onEditGroup(g: DocGroupModel) {

		this.editGroupModel = g;
		this.selectedGroup = g;
	}

	onUpdateGroup() {
		if (!this.editGroupModel) {
			return;
		}

		this.dtSrv.saveGroupModel(this.editGroupModel).subscribe(
			res => {
				this.editGroupModel = undefined;
				this.selectGroupModel = res;
				this.updateGroupList();
			},
			err => console.log(err)
		);

	}

	onCancelGroup() {
		this.editGroupModel = undefined;
	}

	onDeleteGroup(g: DocGroupModel) {

		if (!g) {
			return;
		}

		this.dtSrv.deleteGroupModel(g.id).subscribe(
			res => {
				this.selectGroupModel = undefined;
				this.editGroupModel = undefined;
				this.updateGroupList();
				this.updateTypeList();
			},
			err => console.log(err)
		);
	}

	onAddType() {

		if (!this.addTypeModel.name || !this.addTypeModel.documentGroupId) {
			return;
		}

		this.dtSrv.saveTypeModel(this.addTypeModel).subscribe(
			res => {
				this.addTypeModel = new DocTypeModel();
				this.addTypeModel.documentGroupId = this.selectGroupModel.id;
				this.updateTypeList();
			},
			err => console.log(err)
		);
	}

	onEditType(t: DocTypeModel) {

		this.editTypeModel = t;

	}

	onUpdateType() {

		if (!this.editTypeModel) {
			return;
		}

		this.dtSrv.saveTypeModel(this.editTypeModel).subscribe(
			res => {
				this.editTypeModel = undefined;
				this.updateTypeList();
			},
			err => console.log(err)
		);
	}

	onCancelType() {
		this.editTypeModel = undefined;
	}

	onDeleteType(t: DocTypeModel) {
		if (!t) {
			return;
		}

		this.dtSrv.deleteTypeModel(t.id).subscribe(
			res => {
				this.updateTypeList();
			},
			err => console.log(err)
		);
	}
}