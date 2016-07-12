import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ContractorService {

	constructor(private http:Http) {
	}

	getList(): Observable<ContractorModel[]> {
		return this.http.get('/api/contractor/list').map(res => res.json());
	}


	getContractor(id: number): Observable<ContractorModel> {

		return this.http.get('/api/contractor/' + id).map(res => res.json());
		
	}
}


export class ContractorModel {
	public Id: number;
	public Name: string;
	public FullName: string;
	public DisplayName: string;
	public CreatedBy: string;
	public CreatedDate: Date;
	public LastUpdatedBy: string;
	public LastUpdatedDate: Date;
}