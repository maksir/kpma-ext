import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {MetaObjectService, MetaObjectViewModel} from '../../services/metaobject.service';

import {ITreeNode, TreeView} from '../../controls/treeview';

@Component({
	moduleId: module.id,
	selector: 'metaobject-list',
	templateUrl: 'metaobject.list.html',
	directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, TreeView],
	providers: [MetaObjectService]
	
})
export class MetaObjectList implements OnInit {

	private moList: MetaObjectViewModel[] = [];
	private parentId: number = 0;

	private root: ITreeNode[] = [];
	private selectedNode: ITreeNode;

	constructor(private moSrv: MetaObjectService) {

		this.root.push({ id: null, name: '...', children: [], isExpanded: true, bage: null, parent: null});
	}

	ngOnInit() {
		this.onRequestNodes(this.root[0]);
	}


	onSelectNode(node: ITreeNode) {
		this.selectedNode = node;
		this.parentId = node.id ? node.id : 0;

		this.moSrv.getList(node.id).subscribe(
			res => this.moList = res,
			err => console.log(err)
		);
	}

	onRequestNodes(node: ITreeNode) {

		this.moSrv.getList(node.id).subscribe(
			res => this.fillChildren(node, res),
			err => console.log(err)
		);
	}

	fillChildren(node: ITreeNode, res: MetaObjectViewModel[]) {

		res.forEach(item => node.children.push({
				id: item.id,
				name: item.name,
				children: null,
				isExpanded: false,
				bage: null,
				parent: node
			}));
	}


	onTreeRefresh() {

		this.root[0].children = [];
		this.onRequestNodes(this.root[0]);

	}

	
}