import {Component, Input, Output, EventEmitter} from '@angular/core';
import 'rxjs/Rx';


export interface ITreeNode {
	id: number;
	name: string;
	children: Array<ITreeNode>;
	isExpanded: boolean;
	bage: number;
	parent: ITreeNode;
}

@Component({
	selector: "tree-view",
	template: `
		<ul class="treenodes {{isRoot? 'noderoot' : '' }}">
			<li *ngFor="let node of Nodes" class="treenode">
				<i *ngIf="CanExpand" class="nodebutton fa fa-{{node.isExpanded ? 'minus' : 'plus'}}-square-o"
				   (click)="onExpand(node)">
				</i>
				<div class="nodeinfo">
					<i *ngIf="!CanExpand" class="nodeicon fa fa-file-o"></i>
					<i *ngIf="CanExpand" class="nodeicon fa fa-tags"></i>

					<span class="nodetext {{node == SelectedNode ? 'bg-info text-bold' : ''}} {{isRoot? 'noderoot' : '' }}"
						  (click)="onSelectNode(node)">
						{{node.name}}
					</span>
					<span *ngIf="node.bage > 0" class="nodebage badge">{{node.bage}}</span>

					<tree-view [Nodes]="node.children"
							   [SelectedNode]="SelectedNode"
							   (onSelectedChanged)="onSelectNode($event)"
							   (onRequestNodes)="onRequest($event)"
							   *ngIf="node.isExpanded">
					</tree-view>
				</div>
			</li>
		</ul>
	`,
	styles: ['.treenodes {display:table; list-style-type: none; padding-left: 16px;}',
		'.treenodes.noderoot {padding-left: 0;}',
		'.treenode {display: table-row; list-style-type: none;}',
		'.nodebutton {display:table-cell; cursor: pointer;}',
		'.nodeinfo {display:table-cell; padding-left: 5px; list-style-type: none;}',
		'.nodeicon {}',
		'.nodetext {color: #31708f; padding-left: 3px; padding-right: 3px; cursor: pointer;}',
		'.nodetext.noderoot {font-size: 16px; font-weight: bold;}'
	],
	directives: [TreeViewComponent]
})
export class TreeViewComponent {

	@Input() Nodes: Array<ITreeNode>;
	@Input() SelectedNode: ITreeNode;
	@Input() CanExpand: boolean;
	@Input() isRoot: boolean;

    @Output() onSelectedChanged: EventEmitter<ITreeNode> = new EventEmitter<ITreeNode>();
    @Output() onRequestNodes: EventEmitter<ITreeNode> = new EventEmitter<ITreeNode>();

	constructor() { }

	onSelectNode(node: ITreeNode) {
		this.onSelectedChanged.emit(node);
	}

	onExpand(node: ITreeNode) {

		node.isExpanded = !node.isExpanded;

		if (node.isExpanded && node.children.length == 0) {
			this.onRequestNodes.emit(node);
		}
	}
}