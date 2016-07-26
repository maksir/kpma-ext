import {Component, OnInit} from '@angular/core';

import {DocCardService, DocCardViewModel} from '../../services/doccard.service';

import {ITreeNode, TreeView} from '../../controls/treeview';

@Component({
	moduleId: module.id,
	selector: 'dashboard',
	templateUrl: 'dashboard.html',
	directives: [TreeView],
	providers: [DocCardService]
})
export class Dashboard implements OnInit {

	private root: ITreeNode[] = [];
	private selectedNode: ITreeNode;

	constructor(private docSrv: DocCardService) {

		this.root.push({ id: 1, name: 'Входящие', children: [], isExpanded: true, bage: 0, parent: null });
		this.root.push({ id: 2, name: 'Исходящие', children: [], isExpanded: true, bage: 0, parent: null });
	}


	ngOnInit() {

		this.onRequestNodes(this.root[0]);
		this.onRequestNodes(this.root[1]);
	}

	onSelectNode($event) {
	}

	onRequestNodes(node: ITreeNode) {

		if (!node.parent) {
			if (node.id == 1) {
				this.docSrv.getGroupIn().subscribe(
					res => this.fillNodes(res, node),
					err => console.log(err)
				);
			}
			else if (node.id == 2) {
				this.docSrv.getGroupOut().subscribe(
					res => this.fillNodes(res, node),
					err => console.log(err)
				);
			}
		}
		
	}

	fillNodes(res: any[], parent: ITreeNode) {

		parent.children = [];

		res.forEach(item => {
			parent.children.push({ id: item.id, name: item.name, children: [], isExpanded: false, bage: item.bage, parent: null });
		});
	}

}