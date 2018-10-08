import Immutable from 'immutable';
import RoomServiceItem from 'records/RoomServiceItem';

export const INIT_ROOM_SERVICE_ITEM = 'INIT_ROOM_SERVICE_ITEM';
export const RESET = 'RESET';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
	switch (action.type) {
		case RESET:
			return initialState;
		case INIT_ROOM_SERVICE_ITEM: {
			let map = Immutable.Map();
			action.payload.forEach((item) => {
				map = map.set(parseInt(item.id, 10), new RoomServiceItem(item));
			});
			return map;
		}
		default:
			return state;
	}
};

export const initRoomServiceItems = room_service_items => (dispatch) => {
	dispatch({
		type: INIT_ROOM_SERVICE_ITEM,
		payload: room_service_items,
	});
};
