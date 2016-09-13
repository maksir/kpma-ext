import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {DocTypeService, DocGroupModel, DocTypeModel, DocStatusModel} from '../../services/doctype.service';

import {ITreeNode, TreeView} from '../../controls/treeview';

import {MainAppComponent} from '../../main.component';
import {ShadowBox} from '../../components/shadowbox.component';


@Component({
	moduleId: module.id,
	selector: 'doctype-list',
	templateUrl: 'doctype.list.html',
	directives: [CORE_DIRECTIVES, TreeView, ShadowBox],
	providers: [DocTypeService]

})
export class DocTypeList implements OnInit {

	private groupList: DocGroupModel[] = [];
	private typeList: DocTypeModel[] = [];
	private statusList: DocStatusModel[] = [];
	
	private addGroupModel = new DocGroupModel();
	private editGroupModel: DocGroupModel;
	private _selectedGroup: DocGroupModel;
	private set selectedGroup(value: DocGroupModel) {

		this._selectedGroup = value;
		this.selectedType = undefined;
		if (value) {
			this.addTypeModel.documentGroupId = value.id;
		}
		else {
			this.addTypeModel.documentGroupId = undefined;
		}
		this.refreshTypeList();
	}
	private get selectedGroup() {
		return this._selectedGroup;
	}
	
	private addTypeModel = new DocTypeModel();
	private editTypeModel: DocTypeModel;
	private _selectedType: DocTypeModel;
	private set selectedType(value: DocTypeModel) {
		this._selectedType = value;
		if (value) {
			this.addStatusModel.documentTypeId = value.id;
		}
		else {
			this.addStatusModel.documentTypeId = undefined;
		}
		this.refreshStatusList();
	}
	private get selectedType() {
		return this._selectedType;
	}

	private addStatusModel: DocStatusModel = new DocStatusModel();
	private editStatusModel: DocStatusModel;

	private freezeGroups = false;
	private freezeTypes = false;
	private freezeStatuses = false;


	constructor(private dtSrv: DocTypeService, private mainCmp: MainAppComponent) {
	}

	ngOnInit() {
		this.refreshGroupList();
	}

	// group
	refreshGroupList() {

		this.freezeGroups = true;
		
		this.dtSrv.getGroupList().subscribe(
			res => {
				this.groupList = res;

				if (this.selectedGroup) {
					let find = this.groupList.filter(g => g.id == this.selectedGroup.id);
					if (find.length > 0) {
						this.selectedGroup = find[0];
					}
					else {
						this.selectedGroup = undefined;
					}
				}
			},
			err => {
				this.mainCmp.showError(err);
			},
			() => {
				this.freezeTypes = false;
			}
		);
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
				this._selectedGroup = res;
				this.refreshGroupList();
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
				this._selectedGroup = res;
				this.refreshGroupList();
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

		if (confirm('Удалить группу "' + g.name + '" ?')) {
			this.dtSrv.deleteGroupModel(g.id).subscribe(
				res => {
					this.selectedGroup = undefined;
					this.editGroupModel = undefined;
					this.refreshGroupList();
				},
				err => console.log(err)
			);
		}
	}


	// type
	refreshTypeList() {
		if (!this._selectedGroup) {
			this.typeList = [];
			return;
		}

		this.freezeTypes = true;
		this.dtSrv.getTypeList(this._selectedGroup.id).subscribe(
			res => {
				this.typeList = res;
				if (this.selectedType) {
					let find = this.typeList.filter(g => g.id == this.selectedType.id);
					if (find.length > 0) {
						this.selectedType = find[0];
					}
					else {
						this.selectedType = undefined;
					}

				}
			},
			err => {
				this.mainCmp.showError(err);
			},
			() => {
				this.freezeTypes = false;
			}
		);
	}

	onSelectType(t: DocTypeModel) {
		this.selectedType = t;
	}

	onAddType() {

		if (!this.addTypeModel.name || !this.addTypeModel.documentGroupId) {
			return;
		}

		this.dtSrv.saveTypeModel(this.addTypeModel).subscribe(
			res => {
				this.addTypeModel = new DocTypeModel();
				this.addTypeModel.documentGroupId = this._selectedGroup.id;
				this.refreshTypeList();
			},
			err => {
				this.mainCmp.showError(err);
			}
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
				this.refreshTypeList();
			},
			err => {
				this.mainCmp.showError(err);
			}
		);
	}

	onCancelType() {
		this.editTypeModel = undefined;
	}

	onDeleteType(t: DocTypeModel) {
		if (!t) {
			return;
		}

		if (confirm('Удалить тип "' + t.name + '" ?')) {
			this.dtSrv.deleteTypeModel(t.id).subscribe(
				res => {
					this.refreshTypeList();
				},
				err => {
					this.mainCmp.showError(err);
				}
			);
		}
	}


	// status
	refreshStatusList() {
		if (!this._selectedType) {
			this.statusList = [];
			return;
		}

		this.freezeStatuses = true;
		
		this.dtSrv.getStatusList(this._selectedType.id).subscribe(
			res => {
				this.statusList = res;
			},
			err => console.log(err),
			() => {
				this.freezeStatuses = false;
			}
		);
	}

	onAddStatus() {
		if (!this.addStatusModel.name || !this.addStatusModel.documentTypeId) {
			return;
		}

		this.dtSrv.saveStatusModel(this.addStatusModel).subscribe(
			res => {
				this.addStatusModel = new DocStatusModel();
				this.addStatusModel.documentTypeId = this._selectedType.id;
				this.refreshStatusList();
			},
			err => console.log(err)
		);
	}

	onEditStatus(s: DocStatusModel) {
		this.editStatusModel = s;
	}

	onUpdateStatus() {
		if (!this.editStatusModel) {
			return;
		}

		this.dtSrv.saveStatusModel(this.editStatusModel).subscribe(
			res => {
				this.editStatusModel = undefined;
				this.refreshStatusList();
			},
			err => console.log(err)
		);
	}

	onCancelStatus() {
		this.editStatusModel = undefined;
	}

	onDeleteStatus(s: DocStatusModel) {

		if (!s) {
			return;
		}

		if (confirm('Удалить статус "' + s.name + '" ?')) {
			this.dtSrv.deleteStatusModel(s.id).subscribe(
				res => this.refreshStatusList(),
				err => console.log(err)
			);
		}
	}


}