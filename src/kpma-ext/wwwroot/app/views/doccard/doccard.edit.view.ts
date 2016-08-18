import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';

import {DocCardService, DocCardViewModel, DocCardDataModel} from '../../services/doccard.service';
import {DocPropService, DocFieldModel} from '../../services/docprop.service';

import {Tabs, Tab} from '../../controls/tabs.control';
import {DateTimePicker} from '../../controls/datetimepicker';
import {DropDown, DropDownItem, DropDownVA} from '../../controls/dropdown/dropdown.control';

import {AttachmentList} from '../attachment/attachment.list.view';
import {Chat} from '../../components/chat/chat.component';
import {ShadowBox} from '../../components/shadowbox.component';

@Component({
	moduleId: module.id,
	selector: 'doccard-edit',
	templateUrl: 'doccard.edit.html',
	directives: [CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, DropDown, DropDownVA, AttachmentList, Tabs, Tab, DateTimePicker, Chat, ShadowBox],
	providers: [DocCardService, DocPropService]

})
export class DocCardEdit implements OnInit {

	private id: number;
	private mode: string;
	private model: DocCardDataModel = new DocCardDataModel();
	private isViewOnly = false;

	private editForm: FormGroup;

	private propDict: { [propName: string]: DocFieldModel };

	private freezeDocCard = false;

	constructor(private dcSrv: DocCardService, private propSrv: DocPropService, private route: ActivatedRoute, private router: Router) {

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

		if (this.id && !this.mode) {
			this.onRefresh();
		}
		else {

			this.freezeDocCard = true;

			switch (this.mode) {
				case 'new':

					this.dcSrv.getModel(this.id).subscribe(
						res => this.model = res,
						err => console.log(err),
						() => {
							this.freezeDocCard = false;
						}
					);
				
					break;
				case 'copy':

					this.dcSrv.copyModel(this.id).subscribe(
						res => this.model = res,
						err => console.log(err),
						() => {
							this.freezeDocCard = false;
						}
					);

					break;
				case 'viewonly':

					this.isViewOnly = true;

					this.dcSrv.getModel(this.id).subscribe(
						res => this.model = res,
						err => console.log(err),
						() => {
							this.freezeDocCard = false;
						}
					);
					break;

			}
		}
	}

	onRefresh() {

		this.freezeDocCard = true;

		this.dcSrv.getModel(this.id).subscribe(
			res => {
				this.model = res;
				this.refreshProperties(this.model.documentTypeId);
			},
			err => console.log(err),
			() => {
				this.freezeDocCard = false;
			}
		);
	}

	refreshProperties(docType:number) {

		this.propSrv.getPropFieldList(docType).subscribe(
			res => {
				res.forEach(p => this.propDict[p.fieldName] = p);	
			},
			err => console.log(err)
		);
	}

	onChangeDocType(docType: number) {
		this.refreshProperties(docType);
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