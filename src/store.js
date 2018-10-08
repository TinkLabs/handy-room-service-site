import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import moment from 'moment';
import Immutable from 'immutable';
import ShoppingCart from 'records/ShoppingCart';
import createHistory from 'history/createBrowserHistory';
import rootReducer from 'modules';

export const history = createHistory();

let initialState = Immutable.Map();
const enhancers = [];
const middleware = [
	thunk,
	routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
	const { devToolsExtension } = window;
	if (typeof devToolsExtension === 'function') {
		enhancers.push(devToolsExtension());
	}
}

const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers,
);
if (localStorage.getItem('order')) {
	const serializedState = localStorage.getItem('order');
	const json = JSON.parse(serializedState);
	initialState = Immutable.Map({
		order: Immutable.Map({
			...json,
			delivery_time: json.delivery_time && moment(json.delivery_time),
			shoppingCart: new ShoppingCart(json.shoppingCart),
		}),
	});
}
const store = createStore(
	rootReducer,
	initialState,
	composedEnhancers,
);
window.store = store;
store.subscribe(() => {
	const serializedState = JSON.stringify(store.getState().get('order').toJSON());
	localStorage.setItem('order', serializedState);
});
export default store;
