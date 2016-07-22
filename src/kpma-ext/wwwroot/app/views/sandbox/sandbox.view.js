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
var attachment_service_1 = require('../../services/attachment.service');
var tabs_control_1 = require('../../controls/tabs.control');
var shadowbox_control_1 = require('../../controls/shadowbox.control');
var dropdown_control_1 = require('../../controls/dropdown/dropdown.control');
var SandBox = (function () {
    function SandBox(attSrv) {
        this.attSrv = attSrv;
        this.model = new attachment_service_1.AttachmentDataModel();
    }
    SandBox.prototype.onSend = function (params) {
        var _this = this;
        if (!params.files) {
            return;
        }
        this.model.file = params.files[0];
        this.attSrv.upload(this.model).then(function (res) { return _this.c = 0; }).catch(function (err) { return console.log(err); });
        return false;
    };
    SandBox = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'sandbox',
            templateUrl: 'sandbox.html',
            styles: ['.panel-body { position: relative; }'],
            directives: [tabs_control_1.Tab, tabs_control_1.Tabs, shadowbox_control_1.ShadowBox, dropdown_control_1.DropDown],
            providers: [attachment_service_1.AttachmentService]
        }), 
        __metadata('design:paramtypes', [attachment_service_1.AttachmentService])
    ], SandBox);
    return SandBox;
}());
exports.SandBox = SandBox;
//# sourceMappingURL=sandbox.view.js.map