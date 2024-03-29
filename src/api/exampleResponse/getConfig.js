export default {
	room_service_config: {
		id: 3,
		hotel_id: 2,
		hotel_config_id: 2,
		hotel_room_number: '111',
		direct_order_number: '+85292077634',
		service_charge_flat: 5,
		service_charge_percentage: 10.00,
		tax_charge: 5.00,
		service_tax_charge_calculation: true,
		payment_method_options: 'card,cash,hotelbill',
		theme_color: '#000f23',
		currency_code: 'EUR',
		currency_symbol: '€',
		currency_decimal_places: 0,
		type: 'dining',
		delivery_time_slot_start: '11:00am',
		delivery_time_slot_end: '23:59pm',
		time_slot_minimum: 45, // minute
		banner_image_url: '',
		location_options: {
			YourRoom: {
				en_US: 'Your Room',
				zh_TW: '你的房間',
				ja_JP: 'あなたの部屋',
			},
			Poolside: {
				en_US: 'Pool Side',
				zh_TW: '池畔',
				ja_JP: 'プールサイド',
			},
			Gym: {
				en_US: 'Gym Room',
				zh_TW: '健身房',
				ja_JP: 'ジム',
			},
		},
		service_charge: 0,
		gratuity: [1.25, 10, 12.5],
		timezone: 'Asia/Hong_Kong',
		service_charge_type: 'flat',
		locale: 'ja_JP',
		last_modified: 1531745681,
		contents: {
			en_US: {
				remarks: '24 hours available\r\n(Please note that the room service items will be ready in 30 - 45 minutes)',
			},
			ja_JP: {
				remarks: '24時間利用可能\r\n（ルームサービスのアイテムは30-45分で準備が整うことに注意してください）',
				IN_ROOM_DINING: 'CUSTOMED IN_ROOM_DINING',
				SERVICE_CHARGE: 'CUSTOMED SERVICE_CHARGE',
				MENU: 'Customed MENU',
				CALL_TO_ORDER: 'CUSTOMED Call to order',
				ORDER_COUNT: 'CUSTOMED order count', // ??
				EMPTY_CATEGORY: 'CUSTOMED EMPTY_CATEGORY',
				ORDER_CONFIRMATION: 'CUSTOMED ORDER_CONFIRMATION',
				EMPTY_ORDER_TITLE: 'CUSTOMED You have not added anything',
				EMPTY_ORDER_DETAIL: 'CUSTOMED EMPTY_ORDER_DETAIL',
				ORDER_PLACED_TITLE: 'CUSTOMED placed title',
				ORDER_PLACED_DETAIL: 'CUSTOMED placed details',
				ORDER_FAILED_TITLE: 'CUSTOMED failed',
				ORDER_FAILED_DETAIL: 'CUSTOMED placed fail details',
				DELIVERY_TIME: 'CUSTOMED Delivery time',
				TODAY: 'CUSTOMED today',
				TOMORROW: 'CUSTOMED Tomorrow',
				ASAP: 'CUSTOMED ASAP',
				REMOVE: 'CUSTOMED Remove',
				TOTAL: 'CUSTOMED Total',
				CONFIRM: 'CUSTOMED Confirm',
				ADDITIONAL_INFORMATION: 'CUSTOMED ADDITIONAL_INFORMATION',
				SPECIAL_REQUESTS: 'CUSTOMED SPECIAL_REQUESTS',
				SPECIAL_REQUESTS_PLACEHOLDER: 'CUSTOMED SPECIAL_REQUESTS_PLACEHOLDER',
				HOTEL_GUEST_NAME: 'CUSTOMED Name',
				HOTEL_GUEST_NAME_PLACEHOLDER: 'CUSTOMED HOTEL_GUEST_NAME_PLACEHOLDER',
				HOTEL_GUEST_ROOM_NUMBER: 'CUSTOMED HOTEL_GUEST_ROOM_NUMBER',
				HOTEL_GUEST_ROOM_NUMBER_PLACEHOLDER: 'CUSTOMED HOTEL_GUEST_ROOM_NUMBER_PLACEHOLDER',
				CONFIRM_YOUR_ORDER_REMARKS: 'CUSTOMED CONFIRM_YOUR_ORDER_REMARKS',
				CONFIRM_YOUR_ORDER: 'CUSTOMED CONFIRM_YOUR_ORDER',
				PREFERRED_PAYMENT_METHOD: 'CUSTOMED PREFERRED_PAYMENT_METHOD',
				CASH_ON_DELIVERY: 'CUSTOMED CASH_ON_DELIVERY',
				CARD_ON_DELIVERY: 'CUSTOMED CARD_ON_DELIVERY',
			},
		},
	},
	room_service_categories: [
		{
			id: 6,
			name: 'Breakfast Menu',
			contents: {
				en_US: {
					name: 'Breakfast',
				},
				ja_JP: {
					name: '朝食',
				},
			},
			weekdays_available: [
				1,
				2,
				3,
				4,
				5,
			],
			delivery_time_slot_start: '07:00 am',
			delivery_time_slot_end: '11:00 am',
			room_service_categories: [7, 8],
		},
		{
			id: 1,
			name: 'Beverage',
			contents: {
				en_US: {
					name: 'Beverage',
				},
				ja_JP: {
					name: '飲み物',
				},
			},
			weekdays_available: [
				0,
				1,
				2,
				3,
				4,
				5,
				6,
			],
			delivery_time_slot_start: '07:00 am',
			delivery_time_slot_end: '10:20 pm',
			room_service_categories: [2, 3],
		},
		{
			id: 2,
			parent_id: 1,
			name: 'Non-Alcoholic Beverage',
			contents: {
				en_US: {
					name: 'Non-Alcoholic Beverage',
					detail: '*Available from 7:00am to 10:20pm',
				},
				ja_JP: {
					name: '非アルコール飲み物',
					detail: '*午前7時から午後10時20分まで利用可能',
				},
			},
			weekdays_available: [
				0,
				1,
				2,
				3,
				4,
				5,
				6,
			],
			delivery_time_slot_start: null,
			delivery_time_slot_end: null,
			room_service_items: [1, 2],
		},
		{
			id: 3,
			parent_id: 1,
			name: 'Natural Tea',
			contents: {
				en_US: {
					name: 'Natural Tea',
					detail: '*Available from 7:00am to 10:20pm',
				},
				ja_JP: {
					name: '天然茶',
					detail: '*午前7時から午後10時20分まで利用可能',
				},
			},
			weekdays_available: [
				0,
				1,
				2,
				3,
				4,
				5,
				6,
			],
			delivery_time_slot_start: null,
			delivery_time_slot_end: null,
			room_service_items: [3, 4],
		},
		{
			id: 7,
			parent_id: 6,
			name: 'Continental',
			contents: {
				en_US: {
					name: 'Continental',
				},
				ja_JP: {
					name: 'コンチネンタル',
				},
			},
			weekdays_available: [
				0,
				1,
				2,
				3,
				4,
				5,
				6,
			],
			delivery_time_slot_start: null,
			delivery_time_slot_end: null,
			room_service_items: [5, 6],
		},
		{
			id: 8,
			parent_id: 6,
			name: 'Breakfast Special',
			contents: {
				en_US: {
					name: 'Breakfast Special',
					detail: '*Available from 7:00am to 10:30pm',
				},
				ja_JP: {
					name: '朝食スペシャル',
					detail: '*午前7時から午後10時30分まで利用可能',
				},
			},
			weekdays_available: [
				0,
				1,
				2,
				3,
				4,
				5,
				6,
			],
			delivery_time_slot_start: null,
			delivery_time_slot_end: null,
			room_service_items: [7],
		},
	],
	room_service_items: [
		{
			id: 1,
			category_id: 2,
			name: 'Soft Drink - Coke',
			price: 6,
			image: 'https://s3-eu-central-1.amazonaws.com/centaur-wp/designweek/prod/content/uploads/2016/07/05181949/1467622925018.jpg',
			item_customization_enabled: true,
			room_service_item_questions: [
				{
					id: 1,
					item_id: 1,
					name: { en_US: 'Sugar amount', ja_JP: '砂糖の量' },
					code: 'Sugar_amount',
					number_required: 1,
					priority: 0,
					repeatable: false,
					room_service_item_answers: [
						{
							id: 1,
							question_id: 1,
							priority: 0,
							code: 'Less Sugar',
							name: { en_US: 'Less Sugar', ja_JP: '少' },
							price: 0,
						},
						{
							id: 2,
							question_id: 1,
							priority: 0,
							code: 'Normal Sugar',
							name: { en_US: 'Normal Sugar', ja_JP: '正常' },
							price: 2,
						},
						{
							id: 3,
							question_id: 1,
							priority: 0,
							code: 'More Sugar',
							name: { en_US: 'More Sugar', ja_JP: '多' },
							price: 4,
						},
					],
				},
				{
					id: 2,
					name: { en_US: 'Toppings', ja_JP: 'トッピング' },
					code: 'Toppings',
					priority: 1,
					number_required: 3,
					repeatable: true,
					room_service_item_answers: [
						{
							id: 4,
							question_id: 2,
							priority: 0,
							code: 'Lemon',
							name: { en_US: 'Lemon', ja_JP: 'レモン' },
							price: 0,
						},
						{
							id: 5,
							question_id: 2,
							priority: 1,
							code: 'Chocolate',
							name: { en_US: 'Chocolate', ja_JP: 'チョコレート' },
							price: 4,
						},
						{
							id: 6,
							question_id: 2,
							priority: 2,
							code: 'Milk',
							name: { en_US: 'Milk', ja_JP: '牛乳' },
							price: 0,
						},
						{
							id: 7,
							question_id: 2,
							priority: 3,
							code: 'Ice-cream',
							name: { en_US: 'Ice-cream', ja_JP: 'アイスクリーム' },
							price: 20,
						},
					],
				},
			],
			contents: {
				en_US: {
					name: 'Famous Coca cola',
					description: 'Whether you\'re enjoying the refreshing taste of Coca-Cola in a Glass Bottle or Mini Coke Can, it was meant to be enjoyed with friends and food!',
				},
				ja_JP: {
					name: '有名なコカコーラ',
					description: 'Glass BottleやMini Coke Canでコカコーラの爽やかな味を楽しんでいても、それは友人や食べ物と一緒に楽しむことを目的としていました！',
				},
			},
		},
		{
			id: 2,
			category_id: 2,
			name: 'Sprite',
			price: 7,
			image: 'https://thumbs.dreamstime.com/b/soft-drink-sprite-moscow-russia-april-can-coca-cola-company-ice-was-introduced-united-states-was-coke-s-63824270.jpg',
			item_customization_enabled: true,
			room_service_item_questions: [
				{
					id: 3,
					item_id: 2,
					name: { en_US: 'Fruits', ja_JP: 'アイスクリーム' },
					code: 'fruits',
					priority: 0,
					number_required: 2,
					repeatable: false,
					room_service_item_answers: [
						{
							id: 9,
							question_id: 3,
							priority: 0,
							code: 'Watermalon',
							name: { en_US: 'Watermalon', ja_JP: 'ウォーターマロン' },
							price: 9,
						},
						{
							id: 10,
							question_id: 3,
							priority: 0,
							code: 'Banana',
							name: { en_US: 'Banana', ja_JP: 'バナナ' },
							price: 0,
						},
						{
							id: 11,
							question_id: 3,
							priority: 0,
							code: 'Apple',
							name: { en_US: 'Apple', ja_JP: '林檎' },
							price: 0,
						},
					],
				},
			],
			contents: {
				en_US: {
					name: 'Sprite',
					description: 'Sprite typically refers to: Sprite (folklore), a type of legendary creature including elves, fairies and pixies.',
				},
				ja_JP: {
					name: 'スプライト',
					description: 'スプライトは、通常、以下を指します：スプライト（民間伝承）、エルフ、妖精、ピクシーを含む伝説的なクリーチャーの一種。',
				},
			},
		},
		{
			id: 3,
			category_id: 3,
			name: 'Earl Grey',
			price: 10,
			item_customization_enabled: false,
			contents: {
				en_US: {
					name: 'Earl Grey',
					description: 'Earl Grey tea is a tea blend which has been flavoured with the addition of oil of bergamot. Bergamot is a variety of orange that is often grown in Italy and France.',
				},
				ja_JP: {
					name: 'アールグレイ',
					description: 'アールグレー茶は、ベルガモットの油を加えた風味の茶ブレンドです。 ベルガモットは、イタリアとフランスでしばしば栽培される様々なオレンジです。',
				},
			},
		},
		{
			id: 4,
			category_id: 3,
			name: 'Pu\'er',
			price: 20.01,
			item_customization_enabled: false,
			contents: {
				en_US: {
					name: 'Pu\'er',
					description: 'Pu\'er or pu-erh is a variety of fermented tea produced in Yunnan province, China.',
				},
				ja_JP: {
					name: 'プーアル',
					description: 'プーアルは中国の雲南省で生産されるさまざまな発酵茶です。',
				},
			},
		},
		{
			id: 5,
			category_id: 7,
			name: 'Small bowl of fruit',
			price: 24,
			item_customization_enabled: false,
			contents: {
				en_US: {
					name: 'Small bowl of fruit',
				},
				ja_JP: {
					name: '果物の小さなボウル',
				},
			},
		},
		{
			id: 6,
			category_id: 7,
			name: 'Banana-nut muffin',
			price: 21.1,
			item_customization: false,
			contents: {
				en_US: {
					name: 'Banana-nut muffin',
				},
				ja_JP: {
					name: 'バナナナッツマフィン',
				},
			},
		},
		{
			id: 7,
			category_id: 8,
			name: 'All day breakfast',
			price: 10,
			item_customization: false,
			contents: {
				en_US: {
					name: 'All day breakfast',
					description: 'All day breakfast',
				},
				ja_JP: {
					name: '終日朝食',
					description: '終日朝食',
				},
			},
		},
	],
};
