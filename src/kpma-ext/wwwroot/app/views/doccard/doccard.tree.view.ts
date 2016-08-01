import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {DocCardService, DocCardViewModel} from '../../services/doccard.service';

import {MainAppComponent} from '../../main.component';

import {ITreeNode, TreeView} from '../../controls/treeview';
import {Tabs, Tab} from '../../controls/tabs.control';

import {AttachmentList} from '../attachment/attachment.list.view';
import {Chat} from '../../components/chat/chat.component';


@Component({
	moduleId: module.id,
	selector: 'doccard-tree',
	templateUrl: 'doccard.tree.html',
	directives: [ROUTER_DIRECTIVES, TreeView, Tabs, Tab, AttachmentList, Chat],
	providers: [DocCardService]
})
export class DocCardTree implements OnInit {

	private root: ITreeNode[] = [];
	private selectedNode: ITreeNode;
	private docList: DocCardViewModel[] = [];
	private selectedDoc: DocCardViewModel;


	constructor(private docSrv: DocCardService, private mainCmp: MainAppComponent) {
		this.root.push({ id: 1, name: 'Входящие', children: [], isExpanded: true, bage: 0, parent: null });
		this.root.push({ id: 2, name: 'Исходящие', children: [], isExpanded: true, bage: 0, parent: null });
		//this.root.push({ id: 3, name: 'Избранные', children: [], isExpanded: true, bage: 0, parent: null });
	}

	ngOnInit() {

		this.onRequestNodes(this.root[0]);
		this.onRequestNodes(this.root[1]);
	}

	onRequestNodes(node: ITreeNode) {

		if (!node.parent) {

			this.docSrv.getGroupList(node.id).subscribe(
				res => this.fillNodes(res, node),
				err => console.log(err)
			);

		}
	}

	refreshTree() {
		this.onRequestNodes(this.root[0]);
		this.onRequestNodes(this.root[1]);
	}

	fillNodes(res: any[], parent: ITreeNode) {

		parent.children = [];

		res.forEach(item => {
			parent.children.push({ id: item.id, name: item.name, children: [], isExpanded: false, bage: item.bage, parent: parent });
		});
	}

	onSelectNode(node: ITreeNode) {
		this.selectedNode = node;
		this.refreshDocList();
	}

	onSelectDoc(item) {
		this.selectedDoc = item;
	}

	refreshDocList() {

		if (!this.selectedNode) {
			this.docList = [];
		}

		let folderId = this.selectedNode.id;
		let groupId = undefined;
		if (this.selectedNode.parent) {
			folderId = this.selectedNode.parent.id;
			groupId = this.selectedNode.id;
		}

		this.docSrv.getDocList(folderId, groupId).subscribe(
			res => {
				this.docList = res;
				if (this.selectedDoc) {
					this.selectedDoc = res.find(m => m.id == this.selectedDoc.id);
				}
			},
			err => console.log(err)
		);
	}

	getUserDepartment():number {

		if (!this.selectedDoc) {
			return undefined;
		}

		if (this.selectedDoc.contractorFromId === this.mainCmp.currentUser.contractorId) {
			return this.selectedDoc.departmentFromId;
		}

		if (this.selectedDoc.contractorToId === this.mainCmp.currentUser.contractorId) {
			return this.selectedDoc.departmentToId;
		}

		return undefined;
	}
}