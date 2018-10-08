import RoomServiceConfig from 'records/RoomServiceConfig';

export const INIT_ROOM_SERVICE_CONFIG = 'INIT_ROOM_SERVICE_CONFIG';
export const RESET = 'RESET';

const initialState = new RoomServiceConfig();

export default (state = initialState, action) => {
	switch (action.type) {
		case RESET:
			return initialState;
		case INIT_ROOM_SERVICE_CONFIG:
			return new RoomServiceConfig(action.payload);
		default:
			return state;
	}
};

export const initRoomServiceConfig = room_service_config => (dispatch) => {
	dispatch({
		type: INIT_ROOM_SERVICE_CONFIG,
		payload: room_service_config,
	});
};
