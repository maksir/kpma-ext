import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ServiceService {

	constructor(private http: Http) {
	}


	getList(): Observable<ServiceModel[]> {
		return this.http.get('/api/service/list').map(res => res.json());
	}

	getModel(id: number): Observable<ServiceModel> {

		return this.http.get('/api/service/' + id).map(res => res.json());

	}

	saveModel(model: ServiceModel): Observable<ServiceModel> {

		if (!model) {
			return Observable.of(model);
		}

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/service', body, { headers: headers }).map(
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

		return this.http.delete('/api/service/' + id).map(res => res.ok);		
	}
}


export class ServiceModel {
	public id: number;
	public name: string;
	public displayName: string;
	public createdBy: string;
	public createdDate: Date;
	public lastUpdatedBy: string;
	public lastUpdatedDate: Date;
}