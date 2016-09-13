/// <reference path="../../typings/bootstrap/bootstrap.d.ts" />
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Observable, Subject} from 'rxjs/Rx';

import {SelectService} from './services/select.service';
import {UserService, UserViewModel} from './services/user.service';
import {MetaObjectService} from './services/metaobject.service';
import {AttachmentService} from './services/attachment.service';


import {Menu} from './components/menu/menu.component';


@Component({
	moduleId: module.id,
    selector: 'main-app',
    templateUrl: 'main.html',
	directives: [ROUTER_DIRECTIVES, Menu],
	providers: [SelectService, AttachmentService]
})

export class MainAppComponent {

	currentUser = new UserViewModel();

	private _ok = new Subject<boolean>();

	constructor(private userSrv: UserService) {

		userSrv.currentUser.subscribe(
			res => this.currentUser = res,
			err => console.log(err),
			() => console.log('done')
		);
	}


	showError(errorMessage:any) {

		if (!errorMessage) {
			return;
		}

		if (typeof(errorMessage) == 'string') {
			$('#errorText').html(<string>errorMessage);
			$('#errorModal').modal('show');
		}
		else {

			if (errorMessage._body) {
				let err = <error>JSON.parse(errorMessage._body);
				if (err.show) {
					$('#errorText').html(err.text);
					$('#errorModal').modal('show');
				}
			}
			
		}

	}

	showMessage(messageClass: string, messageHeader: string, messageBode:string) {


		$('#messageModal-label').html(messageHeader);
		$('#messageText').html(messageBode);
		$('#messageContent').addClass(messageClass);

		$('#messageModal').modal('show');
		
	}


	private onQuestCancelClick() {

		if (!this._ok.isUnsubscribed) {
			this._ok.next(false);
			this._ok.complete();
		}
	}

	private onQuestOkClick() {

		if (!this._ok.isUnsubscribed) {
			this._ok.next(true);
			this._ok.complete();
		}
	}

	showQuestion(questText:string): Observable<boolean> {

		this._ok = new Subject<boolean>();

		$('#questText').html(questText);
		$('#questModal').modal('show');
		$('#questModal').on('hide.bs.modal', this.onQuestCancelClick.bind(this));

		return this._ok.asObservable();
		
	}

}

export class error {
	show: boolean;
	text: string;
}