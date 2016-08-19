import {Component, Pipe, PipeTransform, Input, Output, EventEmitter, OnChanges, SimpleChange, AfterViewInit, AfterViewChecked, ViewChild, ElementRef, Directive, Provider, forwardRef} from '@angular/core';
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

	@Input() items: Array<DropDownItem>;
	@Input() itemType: string;
	@Input() minTerm: number = 3;
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
			else if (this.items && (!this.selectedItem || this.selectedItem.id != this.value)) {
				this.selectValue(this.value);
			}
			else if (this.itemType && (!this.selectedItem || this.selectedItem.id != this.value)) {
				this.requestValue(this.value);
			}
		}

		if (changes['Items'] && this.items && this.value) {
			this.selectValue(this.value);
		}

		if (this.itemType == 'Enum' && this.term) {

			this.selSrv.getSelectList(this.itemType, this.parentId, this.term).subscribe(
				result => this.LazyItems = <Array<DropDownItem>>result,
				error => console.log(error),
				() => { }
			);
		}
		else if (this.itemType) {

			this.LazyQuery = this.termInput.valueChanges
				.filter((term) => this.termFilter(term))
				.distinctUntilChanged()
				.switchMap(term => this.selSrv.getSelectList(this.itemType, this.parentId, term))
				.subscribe(
				result => this.LazyItems = <Array<DropDownItem>>result,
				error => console.log(error),
				() => { }
				);

			if (this.value) {
				this.requestValue(this.value);
			}
		}

		if (this.items && this.itemType) {
			this.LazyQuery = null;
			throw ("Нельзя устанавливать одновременно параметр items и itemType!");
		}

		if (this.items && changes['minTerm']) {
			throw ("Параметр minTerm используется только совместно с параметром itemType!");
		}

	}

	termFilter(term) {
		if (this.minTerm == 0) {
			return true;
		}
		if (this.itemType == 'Enum') {
			return true;
		}
		return (!this.items) && (this.itemType) && (this.minTerm > 0) && term.length >= this.minTerm;
	}

	writeValue(val: any) {
		this.value = val;
		if (this.items) {
			if (this.value) {
				this.selectValue(this.value);
			}
			else {
				this.selectedItem = null;
			}
		}
		else if (this.itemType) {
			if (this.value) {
				this.requestValue(this.value);
			}
			else {
				this.selectedItem = null;
			}
		}
	}

	private selectValue(val: any) {

		let f = this.items.filter(m => m.id == val);
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
			this.selSrv.getSelectItemId(this.itemType, val).subscribe(
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

		if (this.items) {
			return false;
		}
		
		if (this.itemType && this.itemType != 'Enum' && this.minTerm > 0 && this.searchValue.length < this.minTerm) {
			return this.showDropDown;
		}

		return false;
	}

	private showHide() {
		this.showDropDown = !this.showDropDown;

		if (!this.showDropDown) {
			this.searchValue = '';
			if (this.minTerm > 0) {
				this.LazyItems = [];
			}
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

		if (this.itemType) {

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

		if (this.itemType) {

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
    NG_VALUE_ACCESSOR, { useExisting: forwardRef(() => DropDownVA), multi: true });


@Directive({
	selector: 'dropdown',
	host: { '(valueChange)': 'onChange($event)' },
	providers: [CUSTOM_VALUE_ACCESSOR]
})
export class DropDownVA implements ControlValueAccessor {

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