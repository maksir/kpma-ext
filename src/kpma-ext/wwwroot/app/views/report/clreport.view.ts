import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, DatePipe, COMMON_PIPES} from '@angular/common';

import {ReportService, ClientRequestReportViewModel} from '../../services/report.service';

import {MainAppComponent} from '../../main.component';
import {ShadowBox} from '../../components/shadowbox.component';


@Component({
	moduleId: module.id,
	selector: 'clreport',
	templateUrl: 'clreport.html',
	directives: [CORE_DIRECTIVES, ShadowBox],
	pipes: [DatePipe],
	providers: [ReportService]

})
export class ClientRequestReport implements OnInit {

	list: ClientRequestReportViewModel[] = [];
	private freezeReport = false;

	constructor(private repSrv: ReportService, private mainCmp: MainAppComponent) { }


	ngOnInit() {

		this.refreshList();
	}

	refreshList() {

		this.freezeReport = true;

		this.repSrv.getList().subscribe(
			res => {
				this.list = res;
			},
			err => {
				this.mainCmp.showError(err);
			},
			() => {
				this.freezeReport = false;
			}
		);
	}
}