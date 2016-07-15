import {Component, Input, ContentChildren, QueryList, AfterContentInit} from '@angular/core';

@Component({
	selector: 'tab',
	template: `
    <div *ngIf="active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {
	@Input('title') title: string;
	@Input() active = false;
	@Input() disabled: boolean = false;
} 


@Component({
	selector: 'tabs',
	template: `
	<ul class="nav nav-tabs">
      <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a class="cursor-pointer">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
	`,
	styles: [`
		li {
			cursor: pointer;
		}`],
	directives: [Tab]

})
export class Tabs {

	@ContentChildren(Tab) tabs: QueryList<Tab>;

	ngAfterContentInit() {
		// get all active tabs
		let activeTabs = this.tabs.filter((tab) => tab.active);

		// if there is no active tab set, activate the first
		if (activeTabs.length === 0) {
			this.selectTab(this.tabs.first);
		}
	}

	selectTab(tab: Tab) {

		if (tab.disabled) {
			return;
		}

		// deactivate all tabs
		this.tabs.toArray().forEach(tab => tab.active = false);

		// activate the tab the user has clicked on.
		tab.active = true;
	}
}
