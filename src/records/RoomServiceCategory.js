import Immutable from 'immutable';

export default class RoomServiceCategory extends Immutable.Record({
	id: null,
	parent_id: null,
	name: '',
	contents: Immutable.Map(),
	weekdays_available: Immutable.List(),
	delivery_time_slot_start: '',
	delivery_time_slot_end: '',
	room_service_categories: Immutable.List(),
	room_service_items: Immutable.List(),
}) {
	constructor(obj) {
		if (!obj) {
			super();
			return;
		}
		super({
			...obj,
			id: parseInt(obj.id, 10),
			parent_id: parseInt(obj.parent_id, 10),
			contents: Immutable.fromJS(obj.contents),
			weekdays_available: Immutable.List((obj.weekdays_available || [])
				.filter((day, pos) => day >= 0 && day <= 6 && obj.weekdays_available.indexOf(day) === pos)
				.sort() || []),
			room_service_categories: Immutable.List((obj.room_service_categories || [])
				.map(id => parseInt(id, 10))),
			room_service_items: Immutable.List((obj.room_service_items || [])
				.map(id => parseInt(id, 10))),
		});
	}
}
