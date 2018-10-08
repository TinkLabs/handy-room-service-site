import { List } from 'extendable-immutable';
import RoomServiceItemAnswer from 'records/RoomServiceItemAnswer';

export default class RoomServiceItemAnswerList extends List {
	constructor(obj) {
		if (!obj) {
			super();
			return;
		}
		super(obj.map(answer => (
			answer instanceof RoomServiceItemAnswer ? answer : new RoomServiceItemAnswer(answer)
		)));
	}
	filterByQuestionId(id) {
		console.log(this);
		return this.filter(ans => ans.get('question_id') === id);
	}
	findByAnswerId(id) {
		return this.find(answer => answer.get('id') === id) || new RoomServiceItemAnswer();
	}
	addOne(answer = new RoomServiceItemAnswer()) {
		const index = this.findIndex(i => i.id === answer.id);
		if (index >= 0) {
			return this.updateIn([index, 'quantity'], quantity => quantity + 1);
		}
		return this.push(new RoomServiceItemAnswer({
			...answer.toJSON(),
			quantity: 1,
		}));
	}
	removeOne(answer = new RoomServiceItemAnswer()) {
		const index = this.findIndex(i => i.id === answer.id);
		if (index >= 0) {
			return this
				.updateIn([index, 'quantity'], quantity => quantity - 1)
				.filter(ans => ans.get('quantity') > 0);
		}
		return this;
	}
	selectOneOnly(answer = new RoomServiceItemAnswer()) {
		const question_id = answer.get('question_id');
		return this
			.filter(ans => ans.get('question_id') !== question_id)
			.push(new RoomServiceItemAnswer({
				...answer.toJSON(),
				quantity: 1,
			}));
	}
	getAdditionalPrice() {
		let count = 0;
		this.forEach((answer) => {
			count += answer.getPrice();
		});
		return count;
	}
	toLocaleString(locale) {
		const strList = [];
		this.sortBy(answer => answer.get('priority'))
			.forEach((answer) => {
				strList.push(answer.toLocaleString(locale));
			});
		return strList.join(', ');
	}
	toApiJSON() {
		const arr = [];
		this.forEach((answer) => {
			arr.push(answer.toApiJSON());
		});
		return arr;
	}
}
