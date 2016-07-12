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
var metaobject_service_1 = require('../../services/metaobject.service');
var MetaObjectEdit = (function () {
    function MetaObjectEdit(moServ, route) {
        this.moServ = moServ;
        this.route = route;
        this.isViewOnly = false;
    }
    MetaObjectEdit.prototype.ngOnInit = function () {
        var _this = this;
        this.id = +this.route.snapshot.params["id"];
        this.mode = this.route.snapshot.params["mode"];
        this.parentId = +this.route.snapshot.params["parentId"];
        if (this.id && !this.mode) {
            this.moServ.getMetaObject(this.id).subscribe(function (res) { return _this.model = res; }, function (err) { return console.log(err); });
        }
        else {
            switch (this.mode) {
                case 'new':
                    this.model = new metaobject_service_1.MetaObjectDataModel();
                    if (this.parentId) {
                        this.model.ParentId = this.parentId;
                    }
                    break;
                case 'copy':
                    this.moServ.getMetaObject(this.id).subscribe(function (res) {
                        _this.model = res;
                        _this.model.Comment = '';
                        _this.model.Value = '';
                        _this.model.Name = _this.model.Name + ' КОПИЯ';
                        _this.model.Id = 0;
                    }, function (err) { return console.log(err); });
                    break;
                case 'viewonly':
                    this.isViewOnly = true;
                    this.moServ.getMetaObject(this.id).subscribe(function (res) { return _this.model = res; }, function (err) { return console.log(err); });
                    break;
            }
        }
    };
    MetaObjectEdit = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'metaobject-edit',
            templateUrl: 'metaobject.edit.html',
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [metaobject_service_1.MetaObjectService, router_1.ActivatedRoute])
    ], MetaObjectEdit);
    return MetaObjectEdit;
}());
exports.MetaObjectEdit = MetaObjectEdit;
//# sourceMappingURL=metaobject.edit.view.js.map