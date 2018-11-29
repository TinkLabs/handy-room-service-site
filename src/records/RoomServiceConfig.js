import Immutable from 'immutable';
import Android from 'utils/Android';
import I18nString from './I18nString';

export default class RoomServiceConfig extends Immutable.Record({
	loaded: false,
	hotel_id: null,
	hotel_config_id: null,
	hotel_room_number: '',
	direct_order_number: '',
	service_charge_flat: 0,
	service_charge_percentage: 0,
	tax_charge: 0,
	service_tax_charge_calculation: false,
	payment_method_options: Immutable.List(),
	theme_color: '',
	currency_code: 'HKD',
	currency_symbol: '$',
	type: 'dining',
	gratuity: Immutable.List(),
	delivery_time_slot_start: '12:00am',
	delivery_time_slot_end: '11:59pm',
	time_slot_minimum: 15,
	banner_image_url: '',
	location_options: new Map(),
	service_charge: 0,
	service_charge_type: null,
	last_modified: null,
	timezone: 'Asia/Hong_Kong',
	locale: 'en_US',
	service_charge_translation: '',
	contents: Immutable.Map(),
}) {
	constructor(obj) {
		if (!obj) {
			super();
			return;
		}
		// const contents = convertTypeTranslation(obj.type, obj.contents);
		let locationMap = Immutable.Map();
		Object.keys((obj.location_options || {})).forEach((key) => {
			locationMap = locationMap.set(key, new I18nString(obj.location_options[key]));
		});
		super({
			...obj,
			loaded: true,
			gratuity: Immutable.List((obj.gratuity || [])).sort().map(g => parseFloat(g)),
			payment_method_options: obj.payment_method_options ?
				Immutable.List(obj.payment_method_options.split(',')) : Immutable.List(),
			hotel_id: parseInt(obj.hotel_id, 10),
			hotel_config_id: parseInt(obj.hotel_config_id, 10),
			contents: Immutable.fromJS(obj.contents),
			location_options: locationMap,
		});
	}
}
