import { routerReducer } from 'react-router-redux';
import {
	combineReducers,
} from 'redux-immutable';
import roomServiceConfig from './roomServiceConfig';
import roomServiceCategories from './roomServiceCategories';
import homepageCategories from './homepageCategories';
import roomServiceItems from './roomServiceItems';
import order from './order';


export default combineReducers({
	roomServiceConfig,
	roomServiceCategories,
	roomServiceItems,
	homepageCategories,
	order,
	routing: routerReducer,
});
