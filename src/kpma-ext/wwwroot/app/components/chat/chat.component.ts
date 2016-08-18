import {Component, OnInit, Input, Output, OnChanges, SimpleChanges} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
//import {ROUTER_DIRECTIVES} from '@angular/router';

import {ChatService, ChatViewModel, ChatDateModel} from '../../services/chat.service';
import {UserService, UserViewModel} from '../../services/user.service';
import {MainAppComponent} from '../../main.component';

import {ShadowBox} from '../shadowbox.component';

@Component({
	moduleId: module.id,
	selector: 'chat',
	templateUrl: 'chat.html',
	directives: [CORE_DIRECTIVES, ShadowBox],
	providers: [ChatService]
})
export class Chat implements OnInit, OnChanges {

	@Input() metaObjectId: number;
	@Input() objectId: number;
	@Input() departmentId: number;
	//@Input() userId: number;


	private list: ChatViewModel[] = [];
	private user: UserViewModel = new UserViewModel();
	private addModel: ChatDateModel = new ChatDateModel();
	private freezeChat = false;

	constructor(private chatSrv: ChatService, private mainComp: MainAppComponent) {

		this.user = mainComp.currentUser;
	}

	ngOnInit() {
		
	}

	ngOnChanges(changes: SimpleChanges) {

		this.refreshList();

		if (changes['departmentId']) {
			this.addModel.departmentId = this.departmentId;
		}
		if (changes['metaObjectId']) {
			this.addModel.metaObjectId = this.metaObjectId;
		}
		if (changes['objectId']) {
			this.addModel.objectId = this.objectId;
		}
	}

	refreshList() {

		if (!this.metaObjectId || !this.objectId) {
			this.list = [];
			return;
		}

		this.freezeChat = true;

		this.chatSrv.getList(this.metaObjectId, this.objectId, this.departmentId).subscribe(
			res => this.list = res,
			err => console.log(err),
			() => {
				this.freezeChat = false;
			}
		);
	}

	allRead() {
		if (!this.list.length) {
			return;
		}
		this.freezeChat = true;

		this.chatSrv.markAsReaded(this.metaObjectId, this.objectId, this.departmentId).subscribe(
			res => this.refreshList(),
			err => console.log(err),
			() => {
				this.freezeChat = false;
			}
		);
	}

	canAdd() {
		return this.metaObjectId && this.departmentId && this.objectId;
	}

	onAdd() {

		if (!this.canAdd() || !this.addModel.messageText) {
			return;
		}

		this.chatSrv.saveModel(this.addModel).subscribe(
			res => {
				this.refreshList();
				this.addModel.messageText = '';
			}
		);
	}
}