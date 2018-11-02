

export default (order, gratuity, tax, serviceCharge, subTotal, locale = 'en_US') => {
	const orderReducerImmutable = order;
	console.log(orderReducerImmutable.toJSON());
	const result = {
		locale,
		hotel_room_number: orderReducerImmutable.get('hotel_room_number'),
		hotel_guest_name: orderReducerImmutable.get('hotel_guest_name'),
		special_requests: orderReducerImmutable.get('special_requests'),
		delivery_datetime: orderReducerImmutable.get('delivery_time') && orderReducerImmutable.get('delivery_time').unix(),
		delivery_location: orderReducerImmutable.get('delivery_location') || '',
		payment_method: orderReducerImmutable.get('payment_method') || '',
		room_service_items: [],
		total_charge: serviceCharge,
		tax,
		sub_total: subTotal,
		gratuity,
		total_price: Math.round((subTotal + tax + serviceCharge + gratuity) * 100) / 100,
	};

	orderReducerImmutable.get('shoppingCart').valueSeq().forEach((cartItem) => {
		const nextOrderItem = {
			item_id: cartItem.getIn(['roomServiceItem', 'id']),
			count: cartItem.get('count'),
			name: cartItem.getIn(['roomServiceItem', 'name']),
			price: cartItem.getIn(['roomServiceItem', 'price']),
		};

		if (cartItem.getIn(['roomServiceItem', 'item_customization_enabled'])) {
			cartItem.get('customization').valueSeq().forEach((answerList) => {
				result.room_service_items.push({
					...nextOrderItem,
					count: 1,
					additional_price: answerList.getAdditionalPrice(),
					room_service_item_answers: answerList.toApiJSON(),
				});
			});
		} else {
			result.room_service_items.push(nextOrderItem);
		}
	});

	return result;
};
