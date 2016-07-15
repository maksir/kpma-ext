import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {DocTypeService, DocGroupModel, DocuTypeModel} from '../../services/doctype.service';

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
	private typeList: DocuTypeModel[] = [];

	private selectGroupModel: DocGroupModel;
	private addGroupModel = new DocGroupModel();
	private editGroupModel: DocGroupModel;


	// модель добавления нового элемента
	private addTypeModel = new DocuTypeModel();
	// редактируемая модель
	private editTypeModel: DocuTypeModel;


	constructor(private dtSrv: DocTypeService) {
	}

	ngOnInit() {
		
	}

	updateGroupList() {

		this.dtSrv.getGroupList().subscribe(
			res => this.groupList = res,
			err => console.log(err)
		);
	}

	updateTypeList() {
	}

}