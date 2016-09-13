import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ReportService {

	constructor(private http: Http) {
	}

	getList(): Observable<ClientRequestReportViewModel[]> {
		return this.http.get('/api/report/clientrequest').map(res => res.json());
	}

}

export class ClientRequestReportViewModel {
	public clientRequestId: number;
	public barcode: string;
	public clientDate: Date;
	public clientNumber: string;
	public personCl: string;
	public clientId: number;
	public supplierId: number;
	public contrOutId: number;
	public contrInId: number;
	public clientIntId: number;
	public supplierIntId: number;
	public contrOutIntId: number;
	public contrInIntId: number;
	public cargoName: string;
	public perc: number;
	public statusBeginTO: string;
	public personBeginTO: string;
	public cargoReadyDate: Date;
	public dStFactTrs: Date;
	public tTNNumber: string;
	public dEndFactTrs: Date;
	public dateInFact: Date;
	public ctrExec: string;
	public procName: string;
	public statusTO: string;
	public personTO: string;
	public dateCustoms: Date;
	public dateOutFact: Date;
	public statusEndTO: string;
	public personEndTO: string;
	public dStFactTre: Date;
	public dEndFactTre: Date;
	public dTNumber: string;
	public statusSert: string;
	public personSert: string;
	public dSert: Date;
	public statusStor: string;
	public personStor: string;
	public dStor: Date;
	public clientName: string;
	public supplierName: string;
	public contrOutName: string;
	public contrInName: string;
}