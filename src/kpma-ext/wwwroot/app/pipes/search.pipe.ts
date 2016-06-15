import {Component, Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: "search"
})
export class SearchPipe {
	transform(value, sterm: string) {
		if (!value) {
			return value;
		}

		return value.filter((item) => item.text.toLowerCase().indexOf(sterm.toLowerCase()) >= 0);
	}
} 