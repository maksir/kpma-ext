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
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var contractor_service_1 = require('../../services/contractor.service');
var tabs_control_1 = require('../../controls/tabs.control');
var department_list_view_1 = require('./department.list.view');
var attachment_list_view_1 = require('../attachment/attachment.list.view');
var ContractorEdit = (function () {
    function ContractorEdit(contrSrv, route, router) {
        this.contrSrv = contrSrv;
        this.route = route;
        this.router = router;
        this.model = new contractor_service_1.ContractorModel();
        this.id = +this.route.snapshot.params["id"];
        this.mode = this.route.snapshot.params["mode"];
        if (this.mode) {
            this.mode = this.mode.toLowerCase();
        }
        this.editForm = new forms_1.FormGroup({
            id: new forms_1.FormControl(),
            name: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]),
            fullName: new forms_1.FormControl(),
            inn: new forms_1.FormControl(),
            kpp: new forms_1.FormControl(),
            ogrn: new forms_1.FormControl()
        });
    }
    ContractorEdit.prototype.ngOnInit = function () {
        this.onRefresh();
    };
    ContractorEdit.prototype.onRefresh = function () {
        var _this = this;
        if (this.id) {
            this.contrSrv.getContrModel(this.id).subscribe(function (res) { return _this.model = res; }, function (err) { return console.log(err); });
        }
        return false;
    };
    ContractorEdit.prototype.onCancel = function () {
        window.history.back();
        return false;
    };
    ContractorEdit.prototype.onSubmit = function () {
        var _this = this;
        if (this.editForm.valid) {
            this.contrSrv.saveContrModel(this.model).subscribe(function (res) {
                if (!_this.model.id) {
                    _this.router.navigateByUrl('/contractor/edit/' + res.id);
                }
            }, function (err) { return console.log(err); });
        }
    };
    ContractorEdit = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'contractor-edit',
            templateUrl: 'contractor.edit.html',
            directives: [common_1.CORE_DIRECTIVES, tabs_control_1.Tabs, tabs_control_1.Tab, forms_1.REACTIVE_FORM_DIRECTIVES, department_list_view_1.DepartmentList, attachment_list_view_1.AttachmentList],
            providers: [contractor_service_1.ContractorService]
        }), 
        __metadata('design:paramtypes', [contractor_service_1.ContractorService, router_1.ActivatedRoute, router_1.Router])
    ], ContractorEdit);
    return ContractorEdit;
}());
exports.ContractorEdit = ContractorEdit;
//# sourceMappingURL=contractor.edit.view.js.map