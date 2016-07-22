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
var doccard_service_1 = require('../../services/doccard.service');
var tabs_control_1 = require('../../controls/tabs.control');
var datetimepicker_1 = require('../../controls/datetimepicker');
var dropdown_control_1 = require('../../controls/dropdown/dropdown.control');
var attachment_list_view_1 = require('../attachment/attachment.list.view');
var DocCardEdit = (function () {
    function DocCardEdit(dcSrv, route, router) {
        this.dcSrv = dcSrv;
        this.route = route;
        this.router = router;
        this.model = new doccard_service_1.DocCardDataModel();
        this.id = +this.route.snapshot.params["id"];
        this.mode = this.route.snapshot.params["mode"];
        if (this.mode) {
            this.mode = this.mode.toLowerCase();
        }
        this.editForm = new forms_1.FormGroup({
            id: new forms_1.FormControl(),
            docNumber: new forms_1.FormControl(),
            docDate: new forms_1.FormControl(),
            barcode: new forms_1.FormControl(),
            documentTypeId: new forms_1.FormControl('', forms_1.Validators.required),
            documentStatusId: new forms_1.FormControl(),
            contractorFromId: new forms_1.FormControl('', forms_1.Validators.required),
            contractorToId: new forms_1.FormControl('', forms_1.Validators.required),
            departmentFromId: new forms_1.FormControl('', forms_1.Validators.required),
            departmentToId: new forms_1.FormControl('', forms_1.Validators.required),
            content1: new forms_1.FormControl(),
            content2: new forms_1.FormControl(),
            content3: new forms_1.FormControl(),
            content4: new forms_1.FormControl(),
            content5: new forms_1.FormControl()
        });
    }
    DocCardEdit.prototype.ngOnInit = function () {
        this.onRefresh();
    };
    DocCardEdit.prototype.onRefresh = function () {
        var _this = this;
        if (this.id) {
            this.dcSrv.getModel(this.id).subscribe(function (res) { return _this.model = res; }, function (err) { return console.log(err); });
        }
        else {
            this.model.docDate = new Date();
        }
    };
    DocCardEdit.prototype.onSubmit = function () {
        var _this = this;
        if (this.editForm.valid) {
            this.dcSrv.saveModel(this.model).subscribe(function (res) {
                if (!_this.model.id) {
                    _this.router.navigateByUrl('/doccard/edit/' + res.id);
                }
            }, function (err) { return console.log(err); });
        }
    };
    DocCardEdit.prototype.onCancel = function () {
        window.history.back();
        return false;
    };
    DocCardEdit = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'doccard-edit',
            templateUrl: 'doccard.edit.html',
            directives: [common_1.CORE_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, dropdown_control_1.DropDown, dropdown_control_1.DropDownVA, attachment_list_view_1.AttachmentList, tabs_control_1.Tabs, tabs_control_1.Tab, datetimepicker_1.DateTimePicker],
            providers: [doccard_service_1.DocCardService]
        }), 
        __metadata('design:paramtypes', [doccard_service_1.DocCardService, router_1.ActivatedRoute, router_1.Router])
    ], DocCardEdit);
    return DocCardEdit;
}());
exports.DocCardEdit = DocCardEdit;
//# sourceMappingURL=doccard.edit.view.js.map