import Immutable from 'immutable';
import I18nString from './I18nString';
import RoomServiceItemAnswer from './RoomServiceItemAnswer';

export default class RoomServiceItemQuestion extends Immutable.Record({
	id: null,
	name: new I18nString(),
	priority: 0,
	code: '',
	number_required: 1,
	repeatable: false,
	room_service_item_answers: Immutable.List(),
}) {
	constructor(obj) {
		if (!obj) {
			super();
			return;
		}
		super({
			...obj,
			id: parseInt(obj.id, 10),
			name: new I18nString(obj.name),
			room_service_item_answers: Immutable.List((obj.room_service_item_answers || [])
				.map(answer => new RoomServiceItemAnswer(answer))),
		});
	}
}
