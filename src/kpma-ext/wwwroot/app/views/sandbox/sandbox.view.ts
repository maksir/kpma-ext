import {Component} from '@angular/core';

import {AttachmentService, AttachmentDataModel} from '../../services/attachment.service';

import {Tab, Tabs} from '../../controls/tabs.control';
import {ShadowBox} from '../../controls/shadowbox.control';

import {DropDown} from '../../controls/dropdown/dropdown.control';

@Component({
	moduleId: module.id,
	selector: 'sandbox',
	templateUrl: 'sandbox.html',
	styles: ['.panel-body { position: relative; }'],
	directives: [Tab, Tabs, ShadowBox, DropDown],
	providers: [AttachmentService]
})
export class SandBox {

	c;

	model: AttachmentDataModel = new AttachmentDataModel();

	constructor(private attSrv: AttachmentService) { }

	onSend(params) {

		if (!params.files) {
			return;
		}

		this.model.file = params.files[0];

		this.attSrv.upload(this.model).then(res => this.c = 0).catch(err => console.log(err));

		return false;
	}

}