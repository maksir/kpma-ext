import {Component, Input} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

@Component({
	selector: '[shadow-box]',
	template: `
		<div *ngIf="show" class="shadow-box" >
			<i class="fa fa-2x fa-spinner fa-pulse"></i>
		</div>
		<ng-content></ng-content>`,
	styles: [`
		:host {
			position: relative;
		}`,
		`.shadow-box {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1040;
			background-color: #000;
			opacity: .3;
			width: 100%;
			height: 100%;
			text-align: center;
		}`,
		`i { 
			position: absolute;
			top: 45%;
			left: 50%;
			color: white;}`],
	directives: [CORE_DIRECTIVES]
})
export class ShadowBox {

	@Input() show: boolean = false;

	constructor() {
		var t = this.show;
	}
}