import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';

import {DocCardService, DocCardViewModel, DocCardDataModel} from '../../services/doccard.service';

import {Tabs, Tab} from '../../controls/tabs.control';
import {DateTimePicker} from '../../controls/datetimepicker';
import {DropDown, DropDownItem, DropDownVA} from '../../controls/dropdown/dropdown.control';

import {AttachmentList} from '../attachment/attachment.list.view';
import {Chat} from '../../components/chat/chat.component';

@Component({
	moduleId: module.id,
	selector: 'doccard-edit',
	templateUrl: 'doccard.edit.html',
	directives: [CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, DropDown, DropDownVA, AttachmentList, Tabs, Tab, DateTimePicker, Chat],
	providers: [DocCardService]

})
export class DocCardEdit implements OnInit {

	private id: number;
	private mode: string;
	private model: DocCardDataModel = new DocCardDataModel();

	private editForm: FormGroup;

	constructor(private dcSrv: DocCardService, private route: ActivatedRoute, private router: Router) {

		this.id = +this.route.snapshot.params["id"];
		this.mode = this.route.snapshot.params["mode"];
		if (this.mode) {
			this.mode = this.mode.toLowerCase();
		}

		this.editForm = new FormGroup({
			id: new FormControl(),
			docNumber: new FormControl(),
			docDate: new FormControl(),
			barcode: new FormControl(),
			documentTypeId: new FormControl('', Validators.required),
			documentStatusId: new FormControl(),
			contractorFromId: new FormControl('', Validators.required),
			contractorToId: new FormControl('', Validators.required),
			departmentFromId: new FormControl('', Validators.required),
			departmentToId: new FormControl('', Validators.required),
			content1: new FormControl(),
			content2: new FormControl(),
			content3: new FormControl(),
			content4: new FormControl(),
			content5: new FormControl()
		});
		
	}

	ngOnInit() {

		this.onRefresh();
	}

	onRefresh() {

		if (this.id) {

			this.dcSrv.getModel(this.id).subscribe(
				res => this.model = res,
				err => console.log(err)
			);
		}
		else {
			this.model.docDate = new Date();
		}
	}

	onSubmit() {

		if (this.editForm.valid) {
			this.dcSrv.saveModel(this.model).subscribe(
				res => {
					if (!this.model.id) {
						this.router.navigateByUrl('/doccard/edit/' + res.id);
					}
				},
				err => console.log(err)
			);
		}
	}

	onCancel() {

		window.history.back();
		return false;
	}
}