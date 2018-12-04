import mixpanel from 'mixpanel-browser';
import getConfig from 'getConfig';
import store from 'store';

window.mixpanel = mixpanel;

const getAndroidGlobalProperty = () => {
	if (typeof window.Android === 'undefined' || typeof window.Android.getGlobalProperties === 'undefined') {
		return {};
	}
	// window.Android.showToast(window.Android.getGlobalProperties());
	return JSON.parse(window.Android.getGlobalProperties());
};

export default () => {
	mixpanel.init('6c29862add298fba05d9fd796a51e441');
	// '6c29862add298fba05d9fd796a51e441'
	mixpanel.register({
		...getAndroidGlobalProperty(),
		Domain: window.location.hostname,
		section: 'ird',
		hotel_id: store.getState().getIn(['roomServiceConfig', 'hotel_id']),
		// service_counter: ,
		// handy_country: ,
		// handy_country_code: ,
		// handy_zone: ,
		// device_user_id: ,
		room_id: store.getState().getIn(['roomServiceConfig', 'hotel_room_number']),
		// imei: ,
		// latitude: ,
		// longitude: ,
		// location_accuracy: ,
		// rom_version: ,
		// application_id: ,
		// status: ,
		device_locale: store.getState().getIn(['roomServiceConfig', 'locale']),
		user_language: store.getState().getIn(['roomServiceConfig', 'user_language']),
		// previous_screen_name: ,
		// member_id: ,
		deploy_environment: getConfig().env,
		timestamp_utc: Date.now(),
		// session_id: ,
		// event_type: ,
		// inside_hotel: ,
	});
	return mixpanel;
};

