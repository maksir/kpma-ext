import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ContractorService {

	constructor(private http:Http) {
	}

	getContrList(): Observable<ContractorModel[]> {
		return this.http.get('/api/contractor/list').map(res => res.json());
	}


	getContrModel(id: number): Observable<ContractorModel> {

		return this.http.get('/api/contractor/' + id).map(res => res.json());
		
	}

	saveContrModel(model: ContractorModel): Observable<ContractorModel> {

		if (!model) {
			return Observable.of(model);
		}

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/contractor', body, { headers: headers }).map(
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

	deleteContrModel(id: number): Observable<boolean> {

		if (!id) {
			return Observable.of(false);
		}

		return this.http.delete('/api/contractor/' + id).map(res => res.ok);
	}


	// department

	getDepList(contId: number): Observable<DepartmentModel[]> {

		return this.http.get('/api/department/list/' + contId).map(res => res.json());
	}

	getDepModel(id: number): Observable<DepartmentModel>  {
		return this.http.get('/api/department/' + id).map(res => res.json());
	}

	saveDepModel(model: DepartmentModel): Observable<DepartmentModel> {

		if (!model) {
			return Observable.of(model);
		}

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/department', body, { headers: headers }).map(
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

	deleteDepModel(id: number): Observable<boolean> {

		if (!id) {
			return Observable.of(false);
		}

		return this.http.delete('/api/department/' + id).map(res => res.ok);
	}

}


export class ContractorModel {
	public id: number;
	public name: string;
	public fullName: string;
	public displayName: string;
	public inn: string;
	public kpp: string;
	public ogrn: string;
	public createdBy: string;
	public createdDate: Date;
	public lastUpdatedBy: string;
	public lastUpdatedDate: Date;
}

export class DepartmentModel {
	public id: number;
	public name: string;
	public contractorId: number;
	public displayName: string;
	public createdBy: string;
	public createdDate: Date;
	public lastUpdatedBy: string;
	public lastUpdatedDate: Date;
}