import axios from 'axios';
import getConfig from 'getConfig';
import getConfigExample from './exampleResponse/getConfig';
import getOrderHistoryExample from './exampleResponse/getOrderHistory';

const axiosInstance = axios.create();

const barcode = new URLSearchParams(window.location.search).get('_barcode');
if (barcode) {
	axiosInstance.interceptors.request.use(
		(config) => {
			if (getConfig().env === 'production' && config.method === 'post') return config;
			return {
				...config,
				baseURL: 'https://ldev.handy.travel',
				url: `${config.url}?_barcode=${barcode}`,
			};
		},
		error => Promise.reject(error),
	);
}

if (getConfig().env === 'ldev') {
	axiosInstance.interceptors.response.use(
		response => response,
		(error) => {
			if (error.config.url.includes('/config')) {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve({
							data: getConfigExample,
							status: 200,
							statusText: 'OK',
							headers: {},
							config: error.config,
						});
					}, 800);
				});
			}
			if (error.config.url.includes('/order_history')) {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve({
							data: getOrderHistoryExample,
							status: 200,
							statusText: 'OK',
							headers: {},
							config: error.config,
						});
					}, 800);
				});
			}
			if (error.config.method === 'post') {
				// return new Promise((resolve, reject) => {
				// 	setTimeout(() => {
				// 		const err = new Error('mock error');
				// 		err.code = 400;
				// 		reject(err);
				// 	}, 800);
				// });
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve({
							status: 200,
							statusText: 'OK',
							headers: {},
							config: error.config,
						});
					}, 800);
				});
			}
			return Promise.resolve(error);
		},
	);
}
export default axiosInstance;
