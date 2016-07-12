import {Component, Directive, Input, ComponentResolver, Injector, ViewContainerRef, ElementRef, ReflectiveInjector, Renderer, OnInit } from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import {isBlank} from '@angular/common/src/facade/lang';


@Component({
	selector: 'shadow-box',
	template: `
		<span>sdfs</span>
		<div *ngIf="show" class="shadow-box" >
			<div class="shadow-box-body">
			<i class="fa fa-2x fa-spinner fa-spin"></i>
			</div>
		</div>`,
	styles: [`
		.shadow-box {
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
		`.shadow-box-body { 
			margin: auto;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			width: 50%;
			height: 50%;
			color: white;}`],
	directives: [CORE_DIRECTIVES]

})
export class ShadowBox {

	@Input() show: boolean = false;

	constructor() {
		var t = this.show;
	}
}


@Directive({
	selector: '[shadowbox]',
	host: {
		'[style.position]': '"relative"',
	},
	inputs: ['shadowbox']
})
export class ShadowBoxDirective implements OnInit {

	private _prevCondition: boolean = null;

	private copmRef;

	constructor(private componentResolver: ComponentResolver, private injector: Injector, private ngEl: ElementRef, private vcr: ViewContainerRef) { }


	set shadowbox(newCondition: any) {
		//if (newCondition && (isBlank(this._prevCondition) || !this._prevCondition)) {
		//	this._renderer.setElementClass(this._ngEl.nativeElement, 'relative', true);
		//}
		//else {
		//	this._renderer.setElementClass(this._ngEl.nativeElement, 'relative', false);
		//}
		this._prevCondition = newCondition;
		if (this.copmRef) {
			this.copmRef.instance.show = newCondition;
		}
	}


	ngOnInit() {

		this.componentResolver.resolveComponent(ShadowBox).then(factory => {
			//const injector = ReflectiveInjector.fromResolvedProviders([], this.vcr.injector);
			//this.vcr.insert(
			this.copmRef = this.vcr.createComponent(factory);	
		});
		
	}
}