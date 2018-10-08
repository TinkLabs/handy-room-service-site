import Immutable from 'immutable';
import RoomServiceItemQuestion from './RoomServiceItemQuestion';

export default class RoomServiceItem extends Immutable.Record({
	id: null,
	category_id: null,
	name: '',
	price: 0,
	image: '',
	code: '',
	item_customization_enabled: false,
	room_service_item_questions: Immutable.List(),
	contents: Immutable.Map(),
}) {
	constructor(obj) {
		if (!obj) {
			super();
			return;
		}
		super({
			...obj,
			id: parseInt(obj.id, 10),
			category_id: parseInt(obj.category_id, 10),
			room_service_item_questions: Immutable.List((obj.room_service_item_questions || [])
				.map(config => new RoomServiceItemQuestion(config))),
			contents: Immutable.fromJS(obj.contents),
		});
	}
}
