import {Component} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from '@angular/common';

import {Tab, Tabs} from '../../controls/tabs.control';
import {ShadowBox} from '../../controls/shadowbox.control';

import {DropDown} from '../../controls/dropdown/dropdown.control';

@Component({
	moduleId: module.id,
	selector: 'sandbox',
	templateUrl: 'sandbox.html',
	styles: ['.panel-body { position: relative; }'],
	directives: [FORM_DIRECTIVES, Tab, Tabs, ShadowBox, DropDown]
})
export class SandBox {

}