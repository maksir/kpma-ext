import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class DocCardService {

	constructor(private http: Http) {}

	getList(): Observable<DocCardViewModel[]> {
		return this.http.get('/api/doccard/list').map(res => res.json());
	}

	getModel(id: number): Observable<DocCardDataModel> {

		return this.http.get('/api/doccard/' + id).map(res => res.json());

	}

	copyModel(id: number): Observable<DocCardDataModel> {

		return this.http.get('/api/doccard/copy/' + id).map(res => res.json());

	}

	saveModel(model: DocCardDataModel): Observable<DocCardDataModel> {

		if (!model) {
			return Observable.of(model);
		}

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/doccard', body, { headers: headers }).map(
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

		return this.http.delete('/api/doccard/' + id).map(res => res.ok);
	}

	
	getGroupList(folderId:number) {
		return this.http.get('/api/doccard/group/' + folderId).map(res => res.json());
	}


	getDocList(folderId: number, groupId: number): Observable<DocCardViewModel[]> {

		return this.http.get('/api/doccard/list/' + folderId + '?groupId=' + groupId).map(res => res.json());
	}

}


export class DocCardViewModel {
	public id: number;
	public docNumber: number;
	public docDate: Date;
	public barcode: string;
	public displayName: string;
	public documentTypeId: number;
	public documentTypeName: string;
	public documentStatusId: number;
	public documentStatusName: string;
	public contractorFromId: number;
	public contractorFromName: string;
	public contractorToId: number;
	public contractorToName: string;
	public departmentFromId: number;
	public departmentFromName: string;
	public departmentToId: number;
	public departmentToName: string;
	public authorId: number;
	public authorName: string;
	public content1: string;
	public content2: string;
	public content3: string;
	public content4: string;
	public content5: string;
	public createdBy: string;
	public createdDate: Date;
	public lastUpdatedBy: string;
	public lastUpdatedDate: Date;
}

export class DocCardDataModel {
	public id: number;
	public docNumber: number;
	public docDate: Date;
	public barcode: string;
	public displayName: string;
	public documentTypeId: number;
	public documentStatusId: number;
	public contractorFromId: number;
	public contractorToId: number;
	public departmentFromId: number;
	public departmentToId: number;
	public authorId: number;
	public content1: string;
	public content2: string;
	public content3: string;
	public content4: string;
	public content5: string;
	public createdBy: string;
	public createdDate: Date;
	public lastUpdatedBy: string;
	public lastUpdatedDate: Date;
}