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


	getTypeList(groupId: number): Observable<DocuTypeModel[]> {

		return this.http.get('/api/doctype/type/list?groupId=' + groupId).map(res => res.json());

	}

	getTypeModel(id: number): Observable<DocuTypeModel> {
		return this.http.get('/api/doctype/type/' + id).map(res => res.json());
	}

	saveTypeModel(model: DocuTypeModel): Observable<DocuTypeModel> {

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
}


export class DocuTypeModel {
}

export class DocGroupModel {
}
