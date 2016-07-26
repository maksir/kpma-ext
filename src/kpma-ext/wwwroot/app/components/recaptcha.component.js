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
var ReCaptchaComponent = (function () {
    function ReCaptchaComponent(zone) {
        var _this = this;
        this.siteKey = null;
        window["verifyCallback"] = (function (response) { return zone.run(_this.recaptchaCallback.bind(_this, response)); });
        this.captchaResponse = new core_1.EventEmitter();
    }
    ReCaptchaComponent.prototype.recaptchaCallback = function (response) {
        this.captchaResponse.emit(response);
    };
    ReCaptchaComponent.prototype.ngOnInit = function () {
        var doc = document.body;
        var script = document.createElement('script');
        script.innerHTML = '';
        script.src = 'https://www.google.com/recaptcha/api.js?hl=ru';
        script.async = true;
        script.defer = true;
        doc.appendChild(script);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ReCaptchaComponent.prototype, "siteKey", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ReCaptchaComponent.prototype, "captchaResponse", void 0);
    ReCaptchaComponent = __decorate([
        core_1.Component({
            selector: 're-captcha',
            template: '<div class="g-recaptcha" [attr.data-sitekey]="siteKey" data-callback="verifyCallback"></div>'
        }), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], ReCaptchaComponent);
    return ReCaptchaComponent;
}());
exports.ReCaptchaComponent = ReCaptchaComponent;
//# sourceMappingURL=recaptcha.component.js.map