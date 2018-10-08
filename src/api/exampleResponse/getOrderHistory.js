export default {
	room_service_orders: [
		{
			id: 1,
			hotel_room_number: '2',
			hotel_guest_name: '2',
			special_requests: '',
			payment_method: 'cash',
			total_charge: 70.00,
			total_price: 80.00,
			delivery_datetime: 1531989322,
			created: 1531989322,
			status: 'confirmed',
			currency_symbol: '$',
			currency_code: 'USD',
			room_service_order_items: [
				{
					item_id: 1,
					price: 7.5,
					count: 1,
					name: 'Fallback name',
					additional_price: 10,
					room_service_order_item_answers: [],
				},
				{
					item_id: 2,
					price: 7.5,
					count: 1,
					additional_price: 10,
					name: 'Fallback name',
					room_service_order_item_answers: [
						{
							id: 1,
							name: {
								en_US: 'Choice 2 ',
								zh_TW: 'Choice 1',
							},
							price: 100,
							quantity: 1,
						},
						{
							id: 2,
							name: {
								en_US: 'Choice 1',
							},
							price: 10,
							quantity: 1,
						},
						{
							id: 3,
							name: {
								en_US: 'Choice 3',
							},
							price: 30,
							quantity: 2,
						},
						{
							id: 4,
							name: {
								en_US: 'Choice A ',
								zh_TW: 'Choice 1',
							},
							price: 100,
							quantity: 1,
						},
						{
							id: 5,
							name: {
								en_US: 'Choice 1',
							},
							price: 10,
							quantity: 5,
						},
					],
				},
			],
		},
		{
			id: 2,
			hotel_room_number: '2',
			hotel_guest_name: '2',
			special_requests: '',
			payment_method: 'card',
			total_charge: 120.50, // service charge only
			total_price: 241.00, // Total price, service charge included
			delivery_datetime: null,
			created: 1531989322,
			status: 'confirmed',
			currency_symbol: '$',
			currency_code: 'USD',
			room_service_order_items: [
				{
					item_id: 1,
					price: 7.5,
					count: 2,
					name: 'Fallback name',
					additional_price: 10,
					room_service_order_item_answers: [],
				},
			],
		},
		{
			id: 23,
			hotel_room_number: '2',
			hotel_guest_name: '2',
			special_requests: '',
			payment_method: 'card',
			total_charge: 120.50, // service charge only
			total_price: 241.00, // Total price, service charge included
			delivery_datetime: 1530095747,
			created: 1530995747,
			status: 'confirmed',
			currency_symbol: '$',
			currency_code: 'USD',
			room_service_order_items: [
				{
					item_id: 1,
					price: 7.5,
					count: 2,
					name: 'Fallback name',
					additional_price: 10,
					room_service_order_item_answers: [],
				},
			],
		},
	],
};

