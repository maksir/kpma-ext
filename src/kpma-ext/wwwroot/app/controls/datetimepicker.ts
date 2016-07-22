/// <reference path="../../../typings/moment/moment.d.ts" />
/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/bootstrap.v3.datetimepicker/bootstrap.v3.datetimepicker.d.ts" />

import {Component, Directive, Input, Output, Provider, forwardRef, AfterViewInit, ViewChild, SimpleChange, ElementRef, OnChanges, OnDestroy, EventEmitter} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
//import 'rxjs/Rx';

const CUSTOM_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, { useExisting: forwardRef(() => DateTimePicker), multi: true });


@Component({
	selector: 'date-time',
	template: `
		<div #group class='input-group date'>
			<input #input [disabled]="disabled" (focus)="onTouched()" type='text' class="form-control" />
			<span class="input-group-addon">
				<span class="fa fa-calendar"></span>
			</span>
		</div>`,
	providers: [CUSTOM_VALUE_ACCESSOR]
})
export class DateTimePicker implements AfterViewInit, OnDestroy, ControlValueAccessor {

	@ViewChild('group') group: ElementRef;
	@ViewChild('input') input: ElementRef;
	@Input() value: Date;
	@Input() options: any;
	@Input() disabled: boolean = false;
	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	private _group: JQuery;
	private _input: JQuery;
	private doEvent: boolean = true;
	private i9d: boolean = false;
	private dpShow: boolean = false;

	ngAfterViewInit() {

		if (!this.i9d) {
			this._input = $(this.input.nativeElement);
			this._group = $(this.group.nativeElement);
			this._group.datetimepicker(this.options);

			if (this.value) {
				this._group.data('DateTimePicker').date(this.value);
			}
			this._group.on('dp.change', this.onValueChange.bind(this));
			this._group.on('dp.show', this.onShownCalendar.bind(this));
			this._group.on('dp.hide', this.onHideCalendar.bind(this));
			this.i9d = true;
		}
	}

	ngOnDestroy() {
		if (this._group.data('DateTimePicker')) {
			this._group.data('DateTimePicker').destroy();
		}
	}

	ngOnChanges(changes: { [key: string]: SimpleChange; }) {

		if (changes['value']) {
			var _newVal: string = changes['value'].currentValue;

			if (this.i9d && !this.dpShow) {

				this.doEvent = false;
				this._group.data('DateTimePicker').date(_newVal);
				this.doEvent = true;
				//let _ctrlVal = this._group.data('DateTimePicker').getDate();
				//let date = this.MomentToDate(_ctrlVal);
				//if (_newVal != _ctrlVal.toISOString()) {
				//}
			}
		}

		if (changes['disabled']) {
			if (!this.disabled && this.i9d) {
				this._group.data('DateTimePicker').enable();
			}
		}
	}

	onShownCalendar($event) {
		this.dpShow = true;
	}

	onHideCalendar($event) {
		this.dpShow = false;
	}

	onValueChange($event) {

		if (!this.i9d) {
			return;
		}

		if (this.doEvent) {
			let moment = this._group.data('DateTimePicker').date();
			if (moment) {
				var ret = moment.format('DD.MM.YYYY HH:mm:ss');
				this.valueChange.emit(ret);
				this.onChange(ret);
			}
			else {
				this.valueChange.emit(undefined);
				this.onChange(undefined);
			}
		}
	}

	private MomentToDate(m: moment.Moment): Date {
		return new Date(m.year(), m.month(), m.date(), m.hours(), m.minutes(), m.seconds());
	}

	// функционал ngModel
	onChange = (_) => { };
	onTouched = () => { };

	registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
	registerOnTouched(fn: () => void): void { this.onTouched = fn; }

	writeValue(val: any) {
		this.value = val;
	}
}


//@Directive({
//	selector: 'date-time',
//	host: { '(valueChange)': 'onChange($event)' },
//	providers: [CUSTOM_VALUE_ACCESSOR]
//})
//export class DateTimeVA implements ControlValueAccessor {

//	onChange = (_) => { };
//	onTouched = () => { };

//	constructor(private host: DateTimePicker) {

//	}

//	writeValue(value: any): void {
//		this.host.value = value;
//	}

//	registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
//	registerOnTouched(fn: () => void): void { this.onTouched = fn; }
//}