import axios from './axios';

export default order => axios.post('order', order)
	.then(response => response.data);

