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

	getMetaObject(id: number): Observable<MetaObjectDataModel> {

		return this.http.get('/api/metaobject/' + id).map(res => res.json());

	}
}

export class MetaObjectViewModel {
	public Id: number;
	public Name: string;
	public TypeId: number;
	public TypeName: string;
	public ParentId: number;
	public ParentName: string;
	public Comment: string;
	public Value: string;
	public DisplayName: string;
	public CreatedBy: string;
	public CreatedDate: string;
	public LastUpdatedBy: string;
	public LastUpdatedDate: string;
}

export class MetaObjectDataModel {
	public Id: number;
	public Name: string;
	public ParentId: number;
	public TypeId: number;
	public Comment: string;
	public Value: string;
	public CreatedBy: string;
	public CreatedDate: string;
	public LastUpdatedBy: string;
	public LastUpdatedDate: string;
	public DispalyName: string;
}