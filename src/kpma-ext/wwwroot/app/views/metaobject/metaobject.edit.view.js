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
var metaobject_service_1 = require('../../services/metaobject.service');
var dropdown_control_1 = require('../../controls/dropdown/dropdown.control');
var MetaObjectEdit = (function () {
    function MetaObjectEdit(moServ, route, router) {
        this.moServ = moServ;
        this.route = route;
        this.router = router;
        // редактируемая модель
        this.model = new metaobject_service_1.MetaObjectDataModel();
        this.isViewOnly = false;
        this.id = +this.route.snapshot.params["id"];
        this.mode = this.route.snapshot.params["mode"];
        if (this.mode) {
            this.mode = this.mode.toLowerCase();
        }
        this.parentId = +this.route.snapshot.params["parentId"];
        this.editForm = new forms_1.FormGroup({
            id: new forms_1.FormControl(),
            name: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]),
            parentId: new forms_1.FormControl(),
            typeId: new forms_1.FormControl(),
            comment: new forms_1.FormControl(),
            value: new forms_1.FormControl(),
            tableName: new forms_1.FormControl(),
            schemaName: new forms_1.FormControl()
        });
    }
    MetaObjectEdit.prototype.ngOnInit = function () {
        var _this = this;
        if (this.id && !this.mode) {
            this.moServ.getMetaObject(this.id).subscribe(function (res) {
                _this.model = res;
            }, function (err) { return console.log(err); });
        }
        else {
            switch (this.mode) {
                case 'new':
                    this.model = new metaobject_service_1.MetaObjectDataModel();
                    if (this.parentId) {
                        this.model.parentId = this.parentId;
                    }
                    break;
                case 'copy':
                    this.moServ.getMetaObject(this.id).subscribe(function (res) {
                        _this.model = res;
                        _this.model.comment = '';
                        _this.model.value = '';
                        _this.model.name = _this.model.name + ' КОПИЯ';
                        _this.model.id = 0;
                    }, function (err) { return console.log(err); });
                    break;
                case 'viewonly':
                    this.isViewOnly = true;
                    this.moServ.getMetaObject(this.id).subscribe(function (res) { return _this.model = res; }, function (err) { return console.log(err); });
                    break;
            }
        }
    };
    MetaObjectEdit.prototype.onRefresh = function () {
        var _this = this;
        this.moServ.getMetaObject(this.id).subscribe(function (res) { return _this.model = res; }, function (err) { return console.log(err); });
        return false;
    };
    MetaObjectEdit.prototype.onSubmit = function () {
        var _this = this;
        if (this.editForm.valid) {
            this.moServ.saveMetaObject(this.model).subscribe(function (res) {
                if (!_this.model.id) {
                    _this.router.navigateByUrl('/metaobject/edit/' + res.id);
                }
            }, function (err) { return console.log(err); });
        }
    };
    MetaObjectEdit.prototype.onCancel = function () {
        window.history.back();
        return false;
    };
    MetaObjectEdit = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'metaobject-edit',
            templateUrl: 'metaobject.edit.html',
            directives: [common_1.CORE_DIRECTIVES, forms_1.REACTIVE_FORM_DIRECTIVES, dropdown_control_1.DropDown, dropdown_control_1.DropDownVA],
            providers: [metaobject_service_1.MetaObjectService]
        }), 
        __metadata('design:paramtypes', [metaobject_service_1.MetaObjectService, router_1.ActivatedRoute, router_1.Router])
    ], MetaObjectEdit);
    return MetaObjectEdit;
}());
exports.MetaObjectEdit = MetaObjectEdit;
//# sourceMappingURL=metaobject.edit.view.js.map