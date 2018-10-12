import t from 'translation';
import diningBg from './dining.jpg';
import shoppingBg from './shopping.jpg';
import housekeeping from './housekeeping.jpg';

const api = {
	production: 'https://hk.handy.travel',
	staging: 'https://staging.handy.travel',
	development: 'https://dev.handy.travel',
	uat: 'https://uat.handy.travel',
	ldev: 'https://ldev.handy.travel',
};
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
const hashArr = window.location.hash.split('/');
if (hashArr.length >= 2 && typesCofig()[hashArr[1]]) {
	// eslint-disable-next-line
	targetType = hashArr[1];
}
console.log('ENV', process.env.ENV);
console.log('TYPE', targetType);
export default () => ({
	env: process.env.ENV,
	type: targetType,
	host: `${api[process.env.ENV]}/apis/v2/${targetType}`,
	...typesCofig()[targetType],
});

