import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

	private _loggetIn = false;

	constructor(private _http: Http) { }

	signup(model: UserSignModel) {
	}

	login(model: UserLoginModel) {
	}

	logout() {
	}

	currentUser() {
	}

	getUser(id: number): UserModel {
	}

	list() {
	}

	isLoggetIn() {
		return this._loggetIn;
	}
}

export class UserSignModel {
}

export class UserLoginModel {
}

export class UserModel {
}