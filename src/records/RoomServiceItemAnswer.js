import Immutable from 'immutable';
import I18nString from './I18nString';

export default class RoomServiceItemAnswer extends Immutable.Record({
	id: null,
	question_id: null,
	priority: 0,
	code: '',
	name: new I18nString(),
	price: 0,
	quantity: 0,
}) {
	constructor(obj) {
		if (!obj) {
			super();
			return;
		}
		super({
			...obj,
			id: parseInt(obj.id, 10),
			question_id: parseInt(obj.question_id, 10),
			name: new I18nString(obj.name),
		});
	}
	isSelected() {
		return this.get('quantity') > 0;
	}
	getPrice() {
		return this.get('price') * this.get('quantity');
	}
	toLocaleString(locale) {
		if (this.get('quantity') > 1) {
			return `${this.get('quantity')} ${this.get('name').getLocale(locale)}`;
		}
		return `${this.get('name').getLocale(locale)}`;
	}
	toApiJSON() {
		const nameJSON = this.get('name').toJSON();
		Object.keys(nameJSON).forEach((key) => {
			if (!nameJSON[key]) {
				delete nameJSON[key];
			}
		});
		console.log(nameJSON);
		return {
			id: this.get('id'),
			question_id: this.get('question_id'),
			name: nameJSON,
			price: this.get('price'),
			priority: this.get('priority'),
			code: this.get('code'),
			quantity: this.get('quantity'),
		};
	}
}
