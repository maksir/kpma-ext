import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class RestrictService {

	constructor(private http: Http) {
	}

	getList(contrId: number, depId: number, moId: number): Observable<DataRestrictViewModel[]> {

		return this.http.get('/api/restrict/list?contrId=' + contrId +'&depId=' + depId + '&moId=' + moId).map(res => res.json());
	}

	saveModel(model: DataRestrictDataModel) {

		if (!model) {
			return Observable.of(model);
		}

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/restrict', body, { headers: headers }).map(
			res => {
				if (res.ok) {
					return res.json();
				}
				else {
					return false;
				}
			}
		);

	}

	deleteModel(model: DataRestrictViewModel): Observable<boolean> {


		if (!model) {
			return Observable.of(false);
		}

		return this.http.delete('/api/restrict/' + model.departmentId + '/' + model.metaObjectId + '/' + model.objectId).map(res => res.ok);
	}

}


export class DataRestrictDataModel {
	departmentId: number;
	metaObjectId: number;
	objectId: number;
	createdBy: string;
	createdDate: Date;
	lastUpdatedBy: string;
	lastUpdatedDate: Date;
}

export class DataRestrictViewModel extends DataRestrictDataModel {

	departmentName: string;
	metaObjectName: string;
	objectName: string;

	contractorId: number;
	contractorName: string;
}