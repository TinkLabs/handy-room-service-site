import t from 'translation';
import diningBg from './dining.jpg';
import shoppingBg from './shopping.jpg';
import housekeeping from './housekeeping.jpg';

const typesCofig = () => ({
	dining: {
		heroImage: diningBg,
		heroTitle: t('Order and enjoy your favorite food', {}, 'WELCOME_MESSAGE'),
		icon: 'icon-handy-icon-portal-dining',
		title: t('In-room Dining', {}, 'IN_ROOM_DINING'),
	},
	housekeeping: {
		heroImage: housekeeping,
		heroTitle: t('Order housekeeping services', {}, 'WELCOME_MESSAGE'),
		icon: 'icon-handy-icon-housekeeping',
		title: t('Housekeeping', {}, 'IN_ROOM_DINING'),
	},
	shopping: {
		heroImage: shoppingBg,
		heroTitle: t('Enjoy shopping in your hotel room', {}, 'WELCOME_MESSAGE'),
		icon: 'icon-handy-icon-portal-shopping',
		title: t('In-room Shopping', {}, 'IN_ROOM_DINING'),
	},
});
const types = Object.keys(typesCofig());
let targetType = types[0];
if (window.type && types.includes(window.type)) {
	targetType = window.type;
}

export default () => {
	if (window.env === 'production') {
		return {
			env: window.env,
			type: targetType,
			...typesCofig()[targetType],
		};
	}
	return {
		env: window.env,
		type: targetType,
		testIMEI: '', // 357525080899920
		...typesCofig()[targetType],
	};
};

