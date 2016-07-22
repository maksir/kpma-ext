import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DocTypeService {

	constructor(private http: Http) {
	}

	getGroupList(): Observable<DocGroupModel[]> {
		return this.http.get('/api/doctype/group/list').map(res => res.json());
	}

	getGroupModel(id: number): Observable<DocGroupModel> {
		return this.http.get('/api/doctype/group/' + id).map(res => res.json());
	}

	saveGroupModel(model: DocGroupModel): Observable<DocGroupModel>{

		if (!model) {
			return Observable.of(model);
		}

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/doctype/group', body, { headers: headers }).map(
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

	deleteGroupModel(id: number): Observable<boolean> {

		if (!id) {
			return Observable.of(false);
		}

		return this.http.delete('/api/doctype/group/' + id).map(res => res.ok);
	}


	getTypeList(groupId: number): Observable<DocTypeModel[]> {

		return this.http.get('/api/doctype/type/list?groupId=' + groupId).map(res => res.json());

	}

	getTypeModel(id: number): Observable<DocTypeModel> {
		return this.http.get('/api/doctype/type/' + id).map(res => res.json());
	}

	saveTypeModel(model: DocTypeModel): Observable<DocTypeModel> {

		if (!model) {
			return Observable.of(model);
		}

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/doctype/type', body, { headers: headers }).map(
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

	deleteTypeModel(id: number): Observable<boolean> {

		if (!id) {
			return Observable.of(false);
		}

		return this.http.delete('/api/doctype/type/' + id).map(res => res.ok);
	}


	getStatusList(typeId: number): Observable<DocStatusModel[]> {
		return this.http.get('/api/doctype/status/list/' + typeId).map(res => res.json());
	}

	getStatusModel(id: number) {
		return this.http.get('/api/doctype/status/' + id).map(res => res.json());
	}

	saveStatusModel(model: DocStatusModel): Observable<DocStatusModel> {

		if (!model) {
			return Observable.of(model);
		}

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/doctype/status', body, { headers: headers }).map(
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

	deleteStatusModel(id: number): Observable<boolean> {

		if (!id) {
			return Observable.of(false);
		}

		return this.http.delete('/api/doctype/status/' + id).map(res => res.ok);
	}
}


export class DocTypeModel {
	public id: number;
	public name: string;
	public documentGroupId: number;
	public documentGroup: DocGroupModel;
	public createdBy: string;
	public createdDate: Date;
	public lastUpdatedBy: string;
	public lastUpdatedDate: Date;
}


export class DocGroupModel {
	public id: number;
	public name: string;
	public createdBy: string;
	public createdDate: Date;
	public lastUpdatedBy: string;
	public lastUpdatedDate: Date;
}


export class DocStatusModel {
	public id: number;
	public name: string;
	public displayName: string;
	public documentTypeId: number;
	public value: string;
	public orderNumber: string;
	public color: string;
	public createdBy: string;
	public createdDate: Date;
	public lastUpdatedBy: string;
	public lastUpdatedDate: Date;
}
