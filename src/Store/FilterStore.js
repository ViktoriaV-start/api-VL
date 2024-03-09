import { makeAutoObservable } from 'mobx';

export class FilterStore {
	input = '';
	select = '';

	constructor() {
		makeAutoObservable(this);
	}

	putValues(selectValue, inputValue) {
		this.input = inputValue;
		this.select = selectValue;
	}

}
