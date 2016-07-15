import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router'
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators} from '@angular/forms';

import {MetaObjectService, MetaObjectDataModel} from '../../services/metaobject.service';

import {DropDown, DropDownItem, DropDownVA} from '../../controls/dropdown/dropdown.control';

@Component({
	moduleId: module.id,
	selector: 'metaobject-edit',
	templateUrl: 'metaobject.edit.html',
	directives: [CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, DropDown, DropDownVA],
	providers: [MetaObjectService]
})
export class MetaObjectEdit implements OnInit {

	// редактируемая модель
	model: MetaObjectDataModel = new MetaObjectDataModel();

	// параметры из урл
	id: number;
	mode: string;
	parentId: number;
	isViewOnly = false;

	editForm: FormGroup;

	constructor(private moServ: MetaObjectService, private route: ActivatedRoute, private router: Router) {

		this.id = +this.route.snapshot.params["id"];
		this.mode = this.route.snapshot.params["mode"];
		if (this.mode) {
			this.mode = this.mode.toLowerCase();
		}
		this.parentId = +this.route.snapshot.params["parentId"];

		this.editForm = new FormGroup({
			id: new FormControl(),
			name: new FormControl('', [Validators.required, Validators.minLength(3)]),
			parentId: new FormControl(),
			typeId: new FormControl(),
			comment: new FormControl(),
			value: new FormControl(),
			tableName: new FormControl(),
			schemaName: new FormControl()

		});
		
	}

	ngOnInit() {


		if (this.id && !this.mode) {

			this.moServ.getMetaObject(this.id).subscribe(
				res => {
					this.model = res;
				},
				err => console.log(err)
			);

		}
		else {

			switch (this.mode) {
				case 'new':
					this.model = new MetaObjectDataModel();
					if (this.parentId) {
						this.model.parentId = this.parentId;
					}
					break;
				case 'copy':
					this.moServ.getMetaObject(this.id).subscribe(
						res => {
							this.model = res;
							this.model.comment = '';
							this.model.value = '';
							this.model.name = this.model.name + ' КОПИЯ';
							this.model.id = 0;
						},
						err => console.log(err)
					);
					
					break;
				case 'viewonly':
					this.isViewOnly = true;
					this.moServ.getMetaObject(this.id).subscribe(
						res => this.model = res,
						err => console.log(err)
					);
					break;

			}

		}

	}

	onRefresh() {
		this.moServ.getMetaObject(this.id).subscribe(
			res => this.model = res,
			err => console.log(err)
		);
		return false;
	}

	onSubmit() {

		if (this.editForm.valid) {
			this.moServ.saveMetaObject(this.model).subscribe(
				res => {
					if (!this.model.id) {
						this.router.navigateByUrl('/metaobject/edit/' + res.id);
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