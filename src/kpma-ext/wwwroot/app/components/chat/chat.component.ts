import {Component, OnInit, Input, Output, OnChanges, SimpleChanges} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
//import {ROUTER_DIRECTIVES} from '@angular/router';

import {ChatService, ChatViewModel, ChatDateModel} from '../../services/chat.service';
import {UserService, UserViewModel} from '../../services/user.service';
import {MainAppComponent} from '../../main.component';

@Component({
	moduleId: module.id,
	selector: 'chat',
	templateUrl: 'chat.html',
	directives: [CORE_DIRECTIVES],
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
		}

		this.chatSrv.getList(this.metaObjectId, this.objectId).subscribe(
			res => this.list = res,
			err => console.log(err)
		);


	}

	onAdd() {

		if (!this.addModel.messageText || !this.addModel.metaObjectId || !this.addModel.objectId) {
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