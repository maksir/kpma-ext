//import {
//	ViewContainerRef,
//	ComponentRef,
//	ComponentFactory,
//	ResolvedReflectiveProvider,
//	DynamicComponentLoader,
//	Attribute, // eslint-disable-line no-unused-vars
//	Directive
//} from '@angular/core';
//import { Router, RouteData, RouterOutlet, ComponentInstruction } from '@angular/router-deprecated';
////import {Router, RouterOutletMap} from '@angular/router';
////import {RouterOutlet} from '@angular/router/src/directives/router_outlet';
//import {UserService} from '../services/user.service';
//@Directive({
//	selector: 'router-outlet'
//})
//export class AuthRouterOutletDirective extends RouterOutlet {
//	publicRoutes = ['', 'login', 'signup', 'about'];
//	constructor(
//		outletMap: RouterOutlet,
//		containerRef: ViewContainerRef,
//		@Attribute('name') name,
//		private userSrv: UserService,
//		private parentRouter: Router
//	) {
//		super(outletMap, containerRef, name);
//	}
//	// angular2 RC1
//	load(factory: ComponentFactory<any>, providers: ResolvedReflectiveProvider[],
//		outletMap: RouterOutletMap): ComponentRef<any> {
//		this.outletMap = outletMap;
//		return super.load(factory, providers, outletMap);
//		//let inj = ReflectiveInjector.fromResolvedProviders(providers, this._location.parentInjector);
//		//this._loaded = this._location.createComponent(factory, this._location.length, inj, []);
//		//return this._loaded;
//	}
//	// angular2 beta 17
//	//activate(instruction: ComponentInstruction) {
//	//	if (this._canActivate(instruction.urlPath)) {
//	//		return super.activate(instruction);
//	//	}
//	//	let instr = this.parentRouter.generate(['Login']);
//	//	instr.component.routeData.data['returnUrl'] = instruction.urlPath;
//	//	this.parentRouter.navigateByInstruction(instr, false);
//	//}
//	_canActivate(url) {
//		return this.publicRoutes.indexOf(url) !== -1 || this.userSrv.isLoggetIn();
//	}
//} 
//# sourceMappingURL=authoutlet.directive.js.map