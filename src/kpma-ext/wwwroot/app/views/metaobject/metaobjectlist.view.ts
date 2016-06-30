import {Component, OnInit} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from '@angular/common';
//import {RouteData, Router} from '@angular/router-deprecated';

import {MetaObjectService, MetaObjectViewModel} from '../../services/metaobject.service';

@Component({
})
export class MetaObjectList implements OnInit {

	moList: MetaObjectViewModel[];
	parentId: number;

	constructor(private moSrv: MetaObjectService) {}

	ngOnInit() {

		this.moSrv.getList(this.parentId).subscribe(
			res => this.moList = res,
			err => console.log(err)
		);
	}
}