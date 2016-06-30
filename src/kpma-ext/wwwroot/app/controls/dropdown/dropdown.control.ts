﻿import {Component, Pipe, PipeTransform, Input, Output, EventEmitter, OnChanges, SimpleChange, AfterViewInit, AfterViewChecked, ViewChild, ElementRef, Directive, Provider, forwardRef} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {SelectService} from '../../services/select.service';
import {SearchPipe} from '../../pipes/search.pipe';

export class DropDownItem {
	constructor(public id: any, public text: string) {
	}
}



@Component({
	selector: 'dropdown',
	moduleId: module.id,
	templateUrl: 'dropdown.html',
	styleUrls: ['dropdown.css'],
	pipes: [SearchPipe],
	directives: [CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
	host: {
		"(document: click)": "trackEvent($event)",
		"(document: keydown)": "onKeyDown($event)"
	}
})
export class DropDown implements OnChanges, AfterViewInit, AfterViewChecked {

	selectedItem: DropDownItem;
	placeholder = 'Значение не выбрано...';
	showDropDown = false;
	searchValue = '';
	termInput = new FormControl();
	doEmit = false;
	hoverItem: DropDownItem;

	LazyItems: Array<DropDownItem>;
	LazyQuery: any;

	@ViewChild('input') input: ElementRef;

	@Input() Items: Array<DropDownItem>;
	@Input() ItemType: string;
	@Input() MinTerm: number = 3;
	@Input() disabled: boolean = false;
	@Input() allowClear: boolean = false;
	@Input() parentId: any;
	@Input() term: string;
	@Input() value: any;
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

	constructor(private element: ElementRef, private selSrv: SelectService) {
	}

	ngAfterContentInit() {
	}
	ngAfterViewInit() {
	}
	ngAfterViewChecked() {
		if (this.showDropDown && this.input) {
			this.input.nativeElement.focus(true);
		}
	}
    ngOnChanges(changes: { [key: string]: SimpleChange; }): any {

		if (changes['value']) {
			if (this.doEmit) {
				this.doEmit = false;
			}
			else if (this.Items && (!this.selectedItem || this.selectedItem.id != this.value)) {
				this.selectValue(this.value);
			}
			else if (this.ItemType && (!this.selectedItem || this.selectedItem.id != this.value)) {
				this.requestValue(this.value);
			}
		}

		if (changes['Items'] && this.Items && this.value) {
			this.selectValue(this.value);
		}

		if (this.ItemType == 'Enum' && this.term) {

			this.selSrv.getSelectList(this.ItemType, this.parentId, this.term).subscribe(
				result => this.LazyItems = <Array<DropDownItem>>result,
				error => console.log(error),
				() => { }
			);
		}
		else if (this.ItemType) {

			this.LazyQuery = this.termInput.valueChanges
				.filter((term) => this.termFilter(term))
				.distinctUntilChanged()
				.switchMap(term => this.selSrv.getSelectList(this.ItemType, this.parentId, term))
				.subscribe(
				result => this.LazyItems = <Array<DropDownItem>>result,
				error => console.log(error),
				() => { }
				);

			if (this.value) {
				this.requestValue(this.value);
			}
		}

		if (this.Items && this.ItemType) {
			this.LazyQuery = null;
			throw ("Нельзя устанавливать одновременно параметр Item и ItemType!");
		}

		if (this.Items && changes['MinTerm']) {
			throw ("Параметр MinTerm используется только совместно с параметром ItemType!");
		}

	}

	termFilter(term) {
		if (this.MinTerm == 0) {
			return true;
		}
		if (this.ItemType == 'Enum') {
			return true;
		}
		return (!this.Items) && (this.ItemType) && (this.MinTerm) && term.length >= this.MinTerm;
	}

	writeValue(val: any) {
		this.value = val;
		if (this.Items) {
			if (this.value) {
				this.selectValue(this.value);
			}
			else {
				this.selectedItem = null;
			}
		}
		else if (this.ItemType) {
			if (this.value) {
				this.requestValue(this.value);
			}
			else {
				this.selectedItem = null;
			}
		}
	}

	private selectValue(val: any) {

		let f = this.Items.filter(m => m.id == val);
		if (f[0]) {
			this.selectedItem = f[0];
			this.value = val;
		}
		else {
			this.selectedItem = null;
		}
	}

	private requestValue(val: any) {
		if (val) {
			this.selSrv.getSelectItemId(this.ItemType, val).subscribe(
				result => {
					if (result) {
						this.value = val;
						this.selectedItem = result[0];
					}
				},
				error => console.log(error)
			);
		}
	}

	private getItemText(item: DropDownItem) {

		if (!this.searchValue) {
			return item.text;
		}

		if (this.searchValue.length > 0) {

			let ilower = item.text.toLowerCase();
			let slower = this.searchValue.toLowerCase();
			let result = '';
			let start = 0;
			let end = 0;
			let count = this.searchValue.length;

			while (true) {

				end = ilower.indexOf(slower, start);

				if (end < 0) {

					result += item.text.substring(start);
					break;
				}
				else {
					result += (item.text.substring(start, end) + '<u class="bg-info">' + item.text.substring(end, end + count) + '</u>');

					start = end + count;
				}
			}


			return result; //item.text.replace(this.searchValue, "<span class='bg-info'>" + this.searchValue + "</span>");
		}
	}

	private showHelpText() {

		if (this.Items) {
			return false;
		}

		if (this.ItemType && this.ItemType != 'Enum' && this.searchValue.length < this.MinTerm) {
			return this.showDropDown;
		}

		return false;
	}

	private showHide() {
		this.showDropDown = !this.showDropDown;
		if (!this.showDropDown) {
			this.searchValue = '';
			this.LazyItems = [];
		}
	}

	private hideForm() {
		this.searchValue = '';
		this.showDropDown = false;
		this.hoverItem = undefined;
	}

	private onSelectItem(i: DropDownItem) {
		this.selectedItem = i;
		this.hideForm();
		this.doEmit = true;
		this.valueChange.emit(i.id);
	}

	private onHoverItem(i: DropDownItem) {
		this.hoverItem = i;
	}

	private clearSelect() {
		this.selectedItem = null;
		this.hideForm();
		this.doEmit = true;
		this.valueChange.emit(null);
	}

	private onKeyDown(event: KeyboardEvent) {

		if (this.showDropDown){
		
			switch (event.keyCode) {
				case 13:
					this.hoverSelect();
					break;
				case 27:
					this.hideForm();
					break;
				case 38:
					this.hoverUp();
					break;
				case 40:
					this.hoverDown();
					break;
			}
		}
	}

	private hoverUp() {

		if (this.ItemType) {

			if (!this.hoverItem) {
				return;
			}

			let i = this.LazyItems.indexOf(this.hoverItem);
			if (i > 0) {
				this.hoverItem = this.LazyItems[i - 1];
			}
		}
	}

	private hoverDown() {

		if (this.ItemType) {

			if (!this.hoverItem) {
				this.hoverItem = this.LazyItems[0];
			}
			else {
				let i = this.LazyItems.indexOf(this.hoverItem);
				if (i < this.LazyItems.length - 1) {
					this.hoverItem = this.LazyItems[i + 1];
				}
			}
		}
	}

	private hoverSelect() {
		if (this.hoverItem && this.showDropDown) {
			this.onSelectItem(this.hoverItem);
		}
	}

	private trackEvent($event) {

		if (this.showDropDown && !this.eventTriggeredInsideHost($event)) {
			this.hideForm();
		}

	}

	private eventTriggeredInsideHost(event) {

		var current = event.target;
		var host = this.element.nativeElement;

		do {
			if (current === host) {
				return true;
			}

			if (current && current.className && current.className.indexOf('buttondown') >= 0) {
				return true;
			}

			current = current.parentNode;
		} while (current);
		return (false);
	}
}

const CUSTOM_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, { useExisting: forwardRef(() => DropdownValueAccessor), multi: true });


@Directive({
	selector: 'dropdown',
	host: { '(valueChange)': 'onChange($event)' },
	providers: [CUSTOM_VALUE_ACCESSOR]
})
export class DropdownValueAccessor implements ControlValueAccessor {

	onChange = (_) => { };
	onTouched = () => { };

	constructor(private host: DropDown) {

	}

	writeValue(value: any): void {
		this.host.writeValue(value);
	}

	registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
	registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}