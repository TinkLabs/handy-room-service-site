import parseRequest from 'utils/parseRequest';
import postOrder from 'api/postOrder';
import mixpanel from 'utils/mixpanel';
import { calculateTax, roundTo2Decimal } from 'utils/price';

const mixpanelProperties = {
	category: 'checkout',
	subcategory: 'index',
	screen_name: 'ird_checkout_index',
};

export default function submitOrder(orderImmutable, config) {
	const order = orderImmutable;
	let gratuity_price = 0;
	const {
		serviceChargeFlat,
		serviceChargePercentage,
		taxCharge,
		serviceTaxChargeCalculation,
		locale,
		gratuity,
	} = config;
	const subTotal = order.get('shoppingCart').calculatePrice();
	const { tax, serviceCharge } = calculateTax(
		subTotal,
		serviceChargeFlat,
		serviceChargePercentage,
		taxCharge,
		serviceTaxChargeCalculation,
	);
	if (gratuity.size) {
		if (orderImmutable.get('gratuity_option') === 'custom') {
			gratuity_price = orderImmutable.get('gratuity', 0);
		} else {
			gratuity_price = (subTotal * orderImmutable.get('gratuity_option', 0)) / 100;
		}
	}
	gratuity_price = roundTo2Decimal(gratuity_price);
	return postOrder(parseRequest(order, gratuity_price, tax, serviceCharge, subTotal, locale))
		.then(() => {
			mixpanel().track('IRD Order Confirm Click', {
				...mixpanelProperties,
				item_type: 'room_service_orders',
				status: 'success',
			});
			return '/confirm';
		})
		.catch((e) => {
			if (e.code === 400) {
				mixpanel().track('IRD Order Confirm Click', {
					...mixpanelProperties,
					item_type: 'room_service_orders',
					status: 'bad-request',
				});
				return '/error-outdated';
			}
			mixpanel().track('IRD Order Confirm Click', {
				...mixpanelProperties,
				item_type: 'room_service_orders',
				status: 'server-error',
			});
			return '/error';
		});
}
