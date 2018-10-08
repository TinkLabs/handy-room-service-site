import Immutable from 'immutable';
import { INIT_ROOM_SERVICE_CATEGORY } from './roomServiceCategories';

export const RESET = 'RESET';

const initialState = Immutable.List();

export default (state = initialState, action) => {
	switch (action.type) {
		case RESET:
			return initialState;
		case INIT_ROOM_SERVICE_CATEGORY:
			return Immutable.List(action.payload
				.filter(category => !category.parent_id)
				.map(category => parseInt(category.id, 10)));
		default:
			return state;
	}
};
