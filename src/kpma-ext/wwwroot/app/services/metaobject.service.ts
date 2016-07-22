import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class MetaObjectService {

	constructor(private http: Http) { }


	getList(parentId: number): Observable<MetaObjectViewModel[]> {

		return this.http.get('/api/metaobject/list?parentId=' + parentId).map(res => res.json());
	}

	getModel(id: number): Observable<MetaObjectDataModel> {

		return this.http.get('/api/metaobject/' + id).map(res => res.json());

	}

	saveModel(model: MetaObjectDataModel): Observable<MetaObjectDataModel> {

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/metaobject/save', body, { headers: headers }).map(
			res => {
				if (res.status == 200) {
					return res.json();
				}
				else {
					return false;
				}
			}
		);
	}

	deleteModel(id: number): Observable<boolean> {
		if (!id) {
			return Observable.of(false);
		}

		return this.http.delete('/api/metaobject/' + id).map(res => res.ok);		
	}
}

export class MetaObjectViewModel {
	public id: number;
	public name: string;
	public typeId: number;
	public typeName: string;
	public parentId: number;
	public parentName: string;
	public comment: string;
	public value: string;
	public displayName: string;
	public tableName: string;
	public schemaName: string;
	public createdBy: string;
	public createdDate: string;
	public lastUpdatedBy: string;
	public lastUpdatedDate: string;
}

export class MetaObjectDataModel {
	public id: number;
	public name: string;
	public parentId: number;
	public typeId: number;
	public comment: string;
	public value: string;
	public createdBy: string;
	public createdDate: string;
	public lastUpdatedBy: string;
	public lastUpdatedDate: string;
	public dispalyName: string;
	public tableName: string;
	public schemaName: string;
}