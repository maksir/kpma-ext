import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
//import {RouteData, Router} from '@angular/router-deprecated';

import {MetaObjectService, MetaObjectViewModel} from '../../services/metaobject.service';

@Component({
	moduleId: module.id,
	selector: 'metaobject-list',
	templateUrl: 'metaobject.list.html',
	directives: [CORE_DIRECTIVES],
	providers: [MetaObjectService]
	
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