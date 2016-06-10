import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

	private loggetIn = false;

	constructor(private http: Http) { }

	sign(model: UserSignModel) {

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/user/sign', body, { headers: headers });
		
	}

	login(model: UserLoginModel): Observable<boolean> {

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/user/login', body, { headers: headers })
			.map(res => {

				if (res.status >= 200 && res.status < 300) {
					this.loggetIn = true;
				}

				return this.loggetIn;
			});
	}

	logout() {
	}

	currentUser() {
	}

	getUser(id: number): UserModel {
		return undefined;
	}

	list() {
	}

	isLoggetIn() {
		return this.loggetIn;
	}
}

export class UserSignModel {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export class UserLoginModel {
	email: string;
	password: string;
	rememeberMe: boolean = false;
}

export class UserModel {
}