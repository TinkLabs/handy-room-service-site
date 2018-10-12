import axios from './axios';

export default () => axios.get('/order_history')
	.then(response => ({
		room_service_orders: response.data.room_service_orders || [],
	}))
	.catch((error) => {
		console.error(error.response);
	});

