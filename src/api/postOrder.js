import getConfig from 'getConfig';
import axios from './axios';

export default order => axios.post(`/apis/v2/${getConfig().type}/order`, order)
	.then(response => response.data);

