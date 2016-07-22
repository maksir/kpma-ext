import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ChatService {

	constructor(private http: Http) {
	}

	getList(metaObjectId: number, objectId: number): Observable<ChatViewModel[]> {
		return this.http.get('/api/chat/list/' + metaObjectId + '/' + objectId).map(res => res.json());
	}

	getModel(id: number): Observable<ChatDateModel> {

		return this.http.get('/api/chat/' + id).map(res => res.json());

	}

	saveModel(model: ChatDateModel): Observable<ChatDateModel> {

		if (!model) {
			return Observable.of(model);
		}

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/chat', body, { headers: headers }).map(
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

		return this.http.delete('/api/chat/' + id).map(res => res.ok);
	}
	
}

export class ChatDateModel {
	public id: number;
	public metaObjectId: number;
	public objectId: number;
	public authorId: number;
	public departmentId: number;
	public messageText: string;
	public createdBy: string;
	public createdDate: Date;
	public lastUpdatedBy: string;
	public lastUpdatedDate: Date;
}

export class ChatViewModel extends ChatDateModel {
	public readed: boolean;
	public isOut: boolean;
	public departmentName: string;
}
