import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {MenuService, MenuViewModel} from '../../services/menu.service';

import {ITreeNode, TreeView} from '../../controls/treeview';

@Component({
	moduleId: module.id,
	selector: 'menu-list',
	templateUrl: 'menu.list.html',
	directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, TreeView],
	providers: [MenuService]

})
export class MenuList implements OnInit {

	// элементы дерева и выбранная ветка
	private root: ITreeNode[] = [];
	private selectedNode: ITreeNode;

	// элементы списка, подчиненные выбранной ветке
	private menuList: MenuViewModel[] = [];

	// модель добавления нового элемента
	private addModel = new MenuViewModel();
	// редактируемая модель
	private editModel: MenuViewModel;

	constructor(private menuSrv: MenuService) {

		this.root.push({ id: null, name: '...', children: [], isExpanded: true, bage: null, parent: null });
		this.selectedNode = this.root[0];
	}

	ngOnInit() {
		this.onRequestNodes(this.root[0]);
		this.updateList();
	}

	onTreeRefresh() {
		this.onRequestNodes(this.selectedNode);
	}

	onSelectNode(node: ITreeNode) {
		this.selectedNode = node;
		this.addModel.parentId = node.id;
		this.updateList();
	}

	onRequestNodes(node: ITreeNode) {
		if (!node) {
			return;
		}
		this.menuSrv.getList(node.id).subscribe(
			res => this.fillChildren(node, res),
			err => console.log(err)
		);
	}

	fillChildren(node: ITreeNode, res: MenuViewModel[]) {

		node.children = [];

		res.forEach(item => node.children.push({
			id: item.id,
			name: item.name,
			children: null,
			isExpanded: false,
			bage: null,
			parent: node
		}));
	}

	updateList() {
		if (this.selectedNode) {
			this.menuSrv.getList(this.selectedNode.id).subscribe(
				res => this.menuList = res,
				err => console.log(err)
			);
		}
		else {
			this.menuList = [];
		}
	}

	onAdd() {

		this.menuSrv.saveModel(this.addModel).subscribe(
			res => {
				this.addModel = new MenuViewModel();
				this.addModel.parentId = this.selectedNode.id;
				this.onRequestNodes(this.selectedNode);
				this.updateList();
			}
		);
	}

	onEdit(item: MenuViewModel) {
		this.editModel = item;
	}

	onCancel() {
		this.editModel = undefined;
	}

	onDelete(item: MenuViewModel) {

	}

	onSave() {
		if (!this.editModel) {
			return;
		}

		this.menuSrv.saveModel(this.editModel).subscribe(
			res => {
				this.onRequestNodes(this.selectedNode);
				this.updateList();
				this.editModel = undefined;
			},
			err => console.log(err)
		);
	}
}