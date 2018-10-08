import Immutable from 'immutable';
import ShoppingCart from 'records/ShoppingCart';
import { INIT_ROOM_SERVICE_CONFIG } from './roomServiceConfig';

export const RESET_ORDER = 'RESET_ORDER';
export const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';
export const EDIT_ORDER_ITEM = 'EDIT_ORDER_ITEM';
export const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM';
export const UPDATE_ROOM_NUMBER = 'UPDATE_ROOM_NUMBER';
export const UPDATE_GUEST_NAME = 'UPDATE_GUEST_NAME';
export const UPDATE_SPECIAL_REQUESTS = 'UPDATE_SPECIAL_REQUESTS';
export const UPDATE_DELIVERY_TIME = 'UPDATE_DELIVERY_TIME';
export const UPDATE_DELIVERY_LOCATION = 'UPDATE_DELIVERY_LOCATION';
export const UPDATE_PAYMENT_METHOD = 'UPDATE_PAYMENT_METHOD';
export const UPDATE_GRATUITY_OPTION = 'UPDATE_GRATUITY_OPTION';
export const UPDATE_GRATUITY = 'UPDATE_GRATUITY';

const initialState = Immutable.Map({
	hotel_room_number: '',
	hotel_guest_name: '',
	special_requests: '',
	delivery_time: null,
	delivery_location: null,
	shoppingCart: new ShoppingCart(),
	menu_last_modified: null,
	payment_method: null,
	gratuity_option: null,
	gratuity: 0,
});

export default (state = initialState, action) => {
	switch (action.type) {
		case RESET_ORDER:
			return initialState;
		case INIT_ROOM_SERVICE_CONFIG: {
			if (action.payload.last_modified !== state.get('menu_last_modified')) {
				return initialState.set('menu_last_modified', action.payload.last_modified);
			}
			return state;
		}
		case ADD_ORDER_ITEM: {
			return state.update('shoppingCart', orderItem => (orderItem || new ShoppingCart())
				.addItem(action.payload.roomServiceItem, action.payload.customization));
		}
		case EDIT_ORDER_ITEM: {
			return state.update('shoppingCart', orderItem => (orderItem || new ShoppingCart())
				.editItem(
					action.payload.index,
					action.payload.roomServiceItem,
					action.payload.customization,
				));
		}
		case REMOVE_ORDER_ITEM: {
			return state.update('shoppingCart', orderItem => (orderItem || new ShoppingCart())
				.removeItem(action.payload.itemId, action.payload.index));
		}
		case UPDATE_ROOM_NUMBER:
			return state.set('hotel_room_number', action.payload);
		case UPDATE_GUEST_NAME:
			return state.set('hotel_guest_name', action.payload);
		case UPDATE_SPECIAL_REQUESTS:
			return state.set('special_requests', action.payload);
		case UPDATE_DELIVERY_TIME:
			return state.set('delivery_time', action.payload);
		case UPDATE_DELIVERY_LOCATION:
			return state.set('delivery_location', action.payload);
		case UPDATE_PAYMENT_METHOD:
			return state.set('payment_method', action.payload);
		case UPDATE_GRATUITY_OPTION:
			return state.set('gratuity_option', action.payload);
		case UPDATE_GRATUITY:
			return state.set('gratuity', action.payload);
		default:
			return state;
	}
};
export const resetOrder = () => (dispatch) => {
	dispatch({ type: RESET_ORDER });
};

export const addOrderItem = orderItem => (dispatch) => {
	dispatch({
		type: ADD_ORDER_ITEM,
		payload: orderItem,
	});
};
export const editOrderItem = editItem => (dispatch) => {
	dispatch({
		type: EDIT_ORDER_ITEM,
		payload: editItem,
	});
};
export const removeOrderItem = (itemId, index = 0) => (dispatch) => {
	dispatch({
		type: REMOVE_ORDER_ITEM,
		payload: {
			itemId,
			index,
		},
	});
};
export const updateRoomNumber = room_number => (dispatch) => {
	dispatch({ type: UPDATE_ROOM_NUMBER, payload: room_number });
};

export const updateGuestName = guest_name => (dispatch) => {
	dispatch({ type: UPDATE_GUEST_NAME, payload: guest_name });
};

export const updateSpecialRequests = special_requests => (dispatch) => {
	dispatch({ type: UPDATE_SPECIAL_REQUESTS, payload: special_requests });
};

export const updateDeliveryTime = delivery_time => (dispatch) => {
	dispatch({ type: UPDATE_DELIVERY_TIME, payload: delivery_time });
};

export const updateDeliveryLocation = delivery_location => (dispatch) => {
	dispatch({ type: UPDATE_DELIVERY_LOCATION, payload: delivery_location });
};
export const updatePaymentMethod = payment_method => (dispatch) => {
	dispatch({ type: UPDATE_PAYMENT_METHOD, payload: payment_method });
};
export const updateGratuityOption = payload => (dispatch) => {
	dispatch({ type: UPDATE_GRATUITY_OPTION, payload });
};
export const updateGratuity = payload => (dispatch) => {
	dispatch({ type: UPDATE_GRATUITY, payload });
};
