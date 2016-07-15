import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class MenuService {

	constructor(private http: Http) {
	}

	getList(parentId: number): Observable<MenuModel[]> {

		return this.http.get('/api/menu/list?parentId=' + parentId).map(res => res.json());
	}


	getModel(id: number): Observable<MenuModel> {

		return this.http.get('/api/menu/' + id).map(res => res.json());

	}

	saveModel(model: MenuModel): Observable<MenuModel> {

		if (!model) {
			return Observable.of(model);
		}

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/menu/save', body, { headers: headers }).map(
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

	delModel(id: number): Observable<boolean> {

		return Observable.of(false);
	}
}


export class MenuModel {
	public id: number;
	public name: string;
	public parentId: number;
	public url: string;
	public isGroup: boolean;
	public sortOrder: number;
	public icon: string;
	public onRight: boolean;
	public command: string;
	public createdBy: string;
	public createdDate: Date;
	public lastUpdatedBy: string;
	public lastUpdatedDate: Date;
	public parent: MenuModel;
	public children: MenuModel[];
}