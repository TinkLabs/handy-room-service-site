import Immutable from 'immutable';
import moment from 'moment';
import RoomServiceOrderItem from './RoomServiceOrderItem';


export default class RoomServiceOrder extends Immutable.Record({
	id: null,
	hotel_room_number: '',
	hotel_guest_name: '',
	special_requests: '',
	payment_method: '',
	total_charge: 0, // service_charge
	total_price: 0, // total_charge
	gratuity: 0, // gratuity
	delivery_datetime: null,
	delivery_location: '',
	created: null, // moment()
	status: '',
	currency_symbol: '$',
	currency_code: 'USD',
	room_service_order_items: Immutable.List(),
}) {
	constructor(obj) {
		if (!obj) {
			super();
			return;
		}
		super({
			...obj,
			id: parseInt(obj.id, 10),
			created: obj.created ? moment.unix(obj.created) : null,
			delivery_datetime: obj.delivery_datetime ? moment.unix(obj.delivery_datetime) : null,
			room_service_order_items: Immutable.List((obj.room_service_order_items || [])
				.map(item => new RoomServiceOrderItem(item))),
		});
	}
}
