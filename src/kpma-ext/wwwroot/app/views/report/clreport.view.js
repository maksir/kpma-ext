"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var report_service_1 = require('../../services/report.service');
var main_component_1 = require('../../main.component');
var shadowbox_component_1 = require('../../components/shadowbox.component');
var ClientRequestReport = (function () {
    function ClientRequestReport(repSrv, mainCmp) {
        this.repSrv = repSrv;
        this.mainCmp = mainCmp;
        this.list = [];
        this.freezeReport = false;
    }
    ClientRequestReport.prototype.ngOnInit = function () {
        this.refreshList();
    };
    ClientRequestReport.prototype.refreshList = function () {
        var _this = this;
        this.freezeReport = true;
        this.repSrv.getList().subscribe(function (res) {
            _this.list = res;
        }, function (err) {
            _this.mainCmp.showError(err);
        }, function () {
            _this.freezeReport = false;
        });
    };
    ClientRequestReport = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'clreport',
            templateUrl: 'clreport.html',
            directives: [common_1.CORE_DIRECTIVES, shadowbox_component_1.ShadowBox],
            pipes: [common_1.DatePipe],
            providers: [report_service_1.ReportService]
        }), 
        __metadata('design:paramtypes', [report_service_1.ReportService, main_component_1.MainAppComponent])
    ], ClientRequestReport);
    return ClientRequestReport;
}());
exports.ClientRequestReport = ClientRequestReport;
//# sourceMappingURL=clreport.view.js.map