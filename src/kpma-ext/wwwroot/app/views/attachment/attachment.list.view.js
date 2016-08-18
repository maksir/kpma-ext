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
var service_service_1 = require('../../services/service.service');
var attachment_service_1 = require('../../services/attachment.service');
var shadowbox_component_1 = require('../../components/shadowbox.component');
var AttachmentList = (function () {
    function AttachmentList(attSrv) {
        this.attSrv = attSrv;
        //@ViewChild('file') addFile;
        this.list = [];
        this.addModel = new attachment_service_1.AttachmentDataModel();
        this.freezeAttList = false;
    }
    AttachmentList.prototype.ngOnInit = function () {
        this.refreshList();
    };
    AttachmentList.prototype.ngOnChanges = function (changes) {
        this.refreshList();
    };
    AttachmentList.prototype.refreshList = function () {
        var _this = this;
        this.freezeAttList = true;
        this.attSrv.getList(this.metaObjectId, this.objectId).subscribe(function (res) { return _this.list = res; }, function (err) { return console.log(err); }, function () {
            _this.freezeAttList = false;
        });
    };
    AttachmentList.prototype.onSelectFile = function (addFileInput, model) {
        if (!model) {
            return;
        }
        if (!addFileInput.files[0]) {
            model.file = undefined;
        }
        else {
            model.file = addFileInput.files[0];
        }
    };
    AttachmentList.prototype.onAdd = function () {
        var _this = this;
        this.freezeAttList = true;
        //this.addModel.file = addFileInput.files[0];
        this.addModel.metaObjectId = this.metaObjectId;
        this.addModel.objectId = this.objectId;
        this.attSrv.saveModel(this.addModel).subscribe(function (res) {
            _this.refreshList();
            _this.addModel.file = undefined;
            _this.addModel.name = undefined;
        }, function (err) { return console.log(err); }, function () {
            _this.freezeAttList = false;
        });
    };
    AttachmentList.prototype.onEdit = function (item) {
        var _this = this;
        this.attSrv.getModel(item.id).subscribe(function (res) { return _this.editModel = res; }, function (err) { return console.log(err); });
    };
    AttachmentList.prototype.onDelete = function (item) {
    };
    AttachmentList.prototype.onCancel = function () {
        this.editModel = undefined;
    };
    AttachmentList.prototype.onUpdate = function () {
        var _this = this;
        //if (editfileInput.files && editfileInput.files[0]) {
        //	this.editModel.file = editfileInput.files[0];
        //}
        this.editModel.metaObjectId = this.metaObjectId;
        this.editModel.objectId = this.objectId;
        this.attSrv.saveModel(this.editModel).subscribe(function (res) {
            _this.editModel = undefined;
            _this.refreshList();
        }, function (err) { return console.log(err); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AttachmentList.prototype, "metaObjectId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AttachmentList.prototype, "objectId", void 0);
    AttachmentList = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'attachment-list',
            templateUrl: 'attachment.list.html',
            directives: [common_1.CORE_DIRECTIVES, shadowbox_component_1.ShadowBox],
            providers: [service_service_1.ServiceService]
        }), 
        __metadata('design:paramtypes', [attachment_service_1.AttachmentService])
    ], AttachmentList);
    return AttachmentList;
}());
exports.AttachmentList = AttachmentList;
//# sourceMappingURL=attachment.list.view.js.map