import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SelectService {

	constructor(private http: Http) { }

	getSelectList(typeName: string, parentId: number, term: string) {
		return this.http.get(encodeURI('/api/select/' + typeName + '?parentId=' + parentId + '&term=' + term))
			.map(res => res.json());
	}

	getSelectItemId(typeName: string, itemId: number) {
		return this.http.get('/api/select/' + typeName + '/' + itemId)
			.map(res => res.json());
	}

	getSelectItemCode(typeName: string, itemCode: number) {
		return this.http.get('/api/select?type=' + typeName + '&code=' + itemCode)
			.map(res => res.json());
	}

}