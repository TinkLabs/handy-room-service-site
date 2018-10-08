import Immutable from 'immutable';
import RoomServiceItemAnswer from './RoomServiceItemAnswer';

export default class RoomServiceOrderItem extends Immutable.Record({
	id: null,
	item_id: null,
	price: 0,
	count: 0,
	name: '',
	additional_price: 0,
	room_service_order_item_answers: Immutable.List(),
}) {
	constructor(obj) {
		if (!obj) {
			super();
			return;
		}

		super({
			...obj,
			id: parseInt(obj.id, 10),
			item_id: parseInt(obj.item_id, 10),
			room_service_order_item_answers: Immutable.List((obj.room_service_order_item_answers || [])
				.map(answer => new RoomServiceItemAnswer(answer))),
		});
	}
	getTotalPrice() {
		return (this.get('additional_price') + this.get('price')) * this.get('count');
	}
	toLocaleString(locale = 'en_US') {
		return this.get('room_service_order_item_answers')
			.map(answer => answer.toLocaleString(locale))
			.toArray().join(', ');
	}
}
