import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import {Observable, Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService implements CanActivate {

	private loggetIn = false;

	private _currentUser = new Subject<UserViewModel>();
	currentUser = this._currentUser.asObservable();

	private retSubj = new Subject<boolean>();

	constructor(private http: Http, private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

		if (this.isLoggetIn()) {
			return Observable.of(true);
		}
		else {

			return Observable.create(observer => {
				this.http.get('/api/user/current').subscribe(

					res => {
						if (res.status == 200) {
							this.loggetIn = true;
							this._currentUser.next(res.json());
							observer.next(true);
						}
						else {
							this.loggetIn = false;
							this.router.navigateByUrl('/login?returnUrl=' + state.url);
							observer.next(false);
						}
					},
					err => {
						this.loggetIn = false;
						this.router.navigateByUrl('/login?returnUrl=' + state.url);
						observer.next(false);
					},
					() => {
						observer.complete();
					}
				);
			});

			
			//return this.http.get('/api/user/current')
			//	.map(
			//		res => {
			//			if (res.status == 200) {
			//				this.loggetIn = true;
			//				this._currentUser.next(res.json());
			//				return true;
			//			}
			//			else {
			//				this.loggetIn = false;
			//				this.router.navigateByUrl('/login?returnUrl=' + state.url);
			//				return false;
			//			}
			//	});
		}
	}

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
				this.loggetIn = res.status == 200;
				if (this.loggetIn) {
					this._currentUser.next(<UserViewModel>res.json());
				}

				return this.loggetIn;
			});
	}

	logout(): boolean {

		return true;
	}

	userGet(id: number): Observable<UserViewModel> {
		return this.http.get('/api/user/' + id).map(res => res.json());
	}

	userPost(model: UserViewModel): Observable<boolean> {

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/user', body, { headers: headers })
			.map(res => {
				return res.status == 200;
			});
	}

	userList(): Observable<UserViewModel[]> {
		return this.http.get('/api/user/list').map(res => res.json());
	}

	userRoles(userId: number): Observable<UserRoleViewModel[]> {
		return this.http.get('/api/user/roles/' + userId).map(res => res.json());
	}

	userRoleAdd(userId: number, roleId: number) {

		let model = new UserRoleViewModel();
		model.roleId = roleId;
		model.userId = userId;
		model.userName = '';
		model.roleName = '';

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/user/roles', body, { headers: headers })
			.map(res => {
				return res.status == 200;
			});

	}

	userRoleDel(model: UserRoleViewModel) {

		return this.http.delete('/api/user/roles/' + model.userId + '/' + model.roleId)
			.map(res => {
				return res.status == 200;
			});
	}

	roleGet(id: number): Observable<RoleViewModel> {
		return this.http.get('/api/role/' + id).map(res => res.json());
	}

	rolePost(model: RoleViewModel): Observable<boolean> {

		let body = JSON.stringify(model);
		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/role', body, { headers: headers })
			.map(res => {
				return res.status == 200;
			});

	}

	roleList(): Observable<RoleViewModel[]> {
		return this.http.get('/api/role/list').map(res => res.json());
	}

	roleMenuList(roleId: number): Observable<RoleMenuViewModel[]> {

		return this.http.get('/api/role/menu/' + roleId).map(res => res.json());
	}

	menuItemList(roleId: number) {
		return this.http.get('/api/role/menu/items/' + roleId).map(res => res.json());
	}

	roleMenuAdd(roleId: number, menuId: number): Observable<boolean> {

		return this.http.post('/api/role/menu/' + roleId + "/" + menuId, '').map(res => res.ok);

	}

	roleMenuDelete(model: RoleMenuViewModel): Observable<boolean> {

		return this.http.delete('/api/role/menu/' + model.roleId + '/' + model.menuId).map(res => res.ok);
	}

	isLoggetIn() {
		return this.loggetIn;
	}

	// UserDepartment

	getUserDepList(userId: number) {
		return this.http.get('/api/user/dep/' + userId).map(res => res.json());
	}

	saveUserDep(userId: number, depId: number) {

		let headers = new Headers({
			'Content-Type': 'application/json'
		});

		return this.http.post('/api/user/dep/' + userId + '/' + depId, '', { headers: headers }).map(res => res.ok);
	}

	deleteUserDep(userId: number, depId: number) {

		return this.http.delete('/api/user/dep/' + userId + '/' + depId).map(res => res.ok);
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
	rememberMe: boolean = false;
}

export class UserViewModel {
	id: number;
	name: string;
	email: string;
	phoneNumber: string;
	userName: string;
	concurencyStamp: string;
}

export class RoleViewModel {

	id: number;
	name: string;
	concurencyStamp: string;
}

export class UserRoleViewModel {
	userId: number;
	userName: string;
	roleId: number;
	roleName: string;
}

export class RoleMenuViewModel {

	roleId: number;
	menuId: number;
	roleName: string;
	menuName: string;
	menuParentName: string;

}

export class UserDepDataModel {
	userId: number;
	departmentId: number;
	createdBy: string;
	createdDate: Date;
	lastUpdatedBy: string;
	lastUpdatedDate: Date;
}

export class UserDepViewModel extends UserDepDataModel {
	userName: string;
	departmentName: string;
}