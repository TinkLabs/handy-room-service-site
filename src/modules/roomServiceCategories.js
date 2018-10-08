import Immutable from 'immutable';
import RoomServiceCategory from 'records/RoomServiceCategory';

export const INIT_ROOM_SERVICE_CATEGORY = 'INIT_ROOM_SERVICE_CATEGORY';
export const RESET = 'RESET';

const initialState = Immutable.List();

export default (state = initialState, action) => {
	switch (action.type) {
		case RESET:
			return initialState;
		case INIT_ROOM_SERVICE_CATEGORY: {
			let map = Immutable.Map();
			action.payload.forEach((category) => {
				map = map.set(parseInt(category.id, 10), new RoomServiceCategory(category));
			});
			return map;
		}
		default:
			return state;
	}
};

export const initRoomServiceCategories = room_service_categories => (dispatch) => {
	dispatch({
		type: INIT_ROOM_SERVICE_CATEGORY,
		payload: room_service_categories,
	});
};
