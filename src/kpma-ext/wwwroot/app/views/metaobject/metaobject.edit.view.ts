import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ActivatedRoute} from '@angular/router'


import {MetaObjectService, MetaObjectDataModel} from '../../services/metaobject.service';


@Component({
	moduleId: module.id,
	selector: 'metaobject-edit',
	templateUrl: 'metaobject.edit.html',
	directives: [CORE_DIRECTIVES]
})
export class MetaObjectEdit implements OnInit {

	// редактируемая модель
	model: MetaObjectDataModel;

	// параметры из урл
	id: number;
	mode: string;
	parentId: number;
	isViewOnly = false;

	constructor(private moServ: MetaObjectService, private route: ActivatedRoute) {
		
	}

	ngOnInit() {

		this.id = +this.route.snapshot.params["id"];
		this.mode = this.route.snapshot.params["mode"];
		this.parentId = +this.route.snapshot.params["parentId"];

		if (this.id && !this.mode) {

			this.moServ.getMetaObject(this.id).subscribe(
				res => this.model = res,
				err => console.log(err)
			);

		}
		else {

			switch (this.mode) {
				case 'new':
					this.model = new MetaObjectDataModel();
					if (this.parentId) {
						this.model.ParentId = this.parentId;
					}
					break;
				case 'copy':
					this.moServ.getMetaObject(this.id).subscribe(
						res => {
							this.model = res;
							this.model.Comment = '';
							this.model.Value = '';
							this.model.Name = this.model.Name + ' КОПИЯ';
							this.model.Id = 0;
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

}