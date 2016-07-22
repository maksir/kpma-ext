import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AttachmentService {

	constructor(private http: Http) {
	}

	getList(metaObjectId: number, objectId: number): Observable<AttachmentViewModel[]> {

		return this.http.get('/api/attachment/list/' + metaObjectId + '/' + objectId).map(res => res.json());
	}

	getModel(id: number): Observable<AttachmentDataModel> {

		return this.http.get('/api/attachment/' + id).map(res => res.json());

	}

	saveModel(model: AttachmentDataModel): Observable<boolean> {

		if (!model) {
			return Observable.of(false);
		}


		return Observable.create(observer => {

			let formData: FormData = new FormData(),
				xhr: XMLHttpRequest = new XMLHttpRequest();

			formData.append("id", model.id);
			formData.append("name", model.name);
			formData.append("metaObjectId", model.metaObjectId);
			formData.append("objectId", model.objectId);
			if (model.file) {
				formData.append("file", model.file, model.file.name);
			}
			else {
				formData.append("file", null);
			}

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						observer.next(true);
						observer.complete();
					} else {
						observer.next(false);
						observer.complete();
					}
				}
			};

			xhr.open('POST', '/api/attachment', true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.withCredentials = true;
			xhr.send(formData);

		});



	}

	deleteModel(id: number): Observable<boolean> {

		if (!id) {
			return Observable.of(false);
		}

		return this.http.delete('/api/attachment').map(res => res.ok);

	}

	upload(model: AttachmentDataModel): Promise<any> {

		return new Promise((resolve, reject) => {

			let formData: FormData = new FormData(),
				xhr: XMLHttpRequest = new XMLHttpRequest();

			formData.append("name", model.name);
			formData.append("file", model.file, model.file.name);

			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve(xhr.response);
					} else {
						reject(xhr.response);
					}
				}
			};

			xhr.open('POST', '/api/attachment/upload', true);
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			xhr.withCredentials = true;
			xhr.send(formData);
			
		});
	}

}

export class AttachmentDataModel {
	id: number;
	name: string;
	metaObjectId: number;
	objectId: number;
	file: File;
}

export class AttachmentViewModel {
	id: number;
	name: string;
	fileName: string;
	metaObjectId: number;
	objectId: number;
	createdBy: string;
	createdDate: Date;
	lastUpdatedBy: string;
	lastUpdatedDate: Date;
}