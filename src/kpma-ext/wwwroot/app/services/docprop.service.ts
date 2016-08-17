import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DocPropService {

	constructor(private http: Http) {}


	getPropList(): Observable<DocPropViewModel[]> {

		return this.http.get('/api/docprop/list').map(res => res.json());
	}

	getPropModel(id: number): Observable<DocPropDataModel> {

		return this.http.get('/api/docprop/' + id).map(res => res.json());

	}

	savePropModel(model: DocPropDataModel): Observable<DocPropDataModel> {

		if (!model) {
			return Observable.of(model);
		}

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/docprop', body, { headers: headers }).map(
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

	deletePropModel(id: number): Observable<boolean> {

		if (!id) {
			return Observable.of(false);
		}

		return this.http.delete('/api/docprop/' + id).map(res => res.ok);
	}




	getFieldList(propId:number): Observable<DocFieldModel[]> {
		return this.http.get('/api/docprop/field/list/' + propId).map(res => res.json());
	}

	saveFieldModel(model: DocFieldModel[]): Observable<boolean> {

		if (!model) {
			return Observable.of(false);
		}

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/docprop/field', body, { headers: headers }).map(
			res => {
				return res.ok;
			}
		);
	}

	deleteFieldModel(id: number): Observable<boolean> {

		if (!id) {
			return Observable.of(false);
		}

		return this.http.delete('/api/docprop/field' + id).map(res => res.ok);
	}


	getPropFieldList(docTypeId: number): Observable<DocFieldModel[]> {
		return this.http.get('/api/docprop/proplist/' + docTypeId).map(res => res.json());
	}
}

export class DocPropDataModel {
	id: number;
	documentGroupId: number;
	documentTypeId: number;
	createdBy: string;
	createdDate: Date;
	lastUpdatedBy: string;
	lastUpdatedDate: Date;
}

export class DocPropViewModel extends DocPropDataModel {
	documentGroupName: string;
	documentTypeName: string;
}

export class DocFieldModel {
	docCardPropertyId: number;
	fieldName: string;
	displayName: string;
	isMandatory: boolean;
	isShown: boolean;
	createdBy: string;
	createdDate: Date;
	lastUpdatedBy: string;
	lastUpdatedDate: Date;
}