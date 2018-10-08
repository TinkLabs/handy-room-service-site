import getConfig from 'getConfig';
import axios from './axios';

export default () => axios.get(`/apis/v2/${getConfig().type}/config`)
	.then(response => ({
		room_service_config: response.data.room_service_config || {},
		room_service_categories: response.data.room_service_categories || [],
		room_service_items: response.data.room_service_items || [],
	}));

